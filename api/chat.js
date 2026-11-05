// api/chat.js — Vercel Serverless Function
// Proxies chat requests to Groq so the API key never reaches the browser.

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions'

// ── request-size guard ────────────────────────────────────────────────────────
const MAX_MESSAGES   = 10   // system + 6 history + 1 user + small headroom
const MAX_MSG_CHARS  = 8000 // rough total content cap (well under Groq's limit)

export default async function handler(req, res) {
  // ── method guard ────────────────────────────────────────────────────────────
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // ── API-key guard ───────────────────────────────────────────────────────────
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    console.error('[api/chat] GROQ_API_KEY is not set')
    return res.status(503).json({ error: 'Chat service is not configured.' })
  }

  // ── parse & validate body ───────────────────────────────────────────────────
  let messages, temperature, max_tokens
  try {
    ;({ messages, temperature, max_tokens } = req.body)
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body.' })
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages must be a non-empty array.' })
  }

  if (messages.length > MAX_MESSAGES) {
    return res.status(400).json({ error: 'Too many messages.' })
  }

  // Validate each message has role + string content
  for (const m of messages) {
    if (!m || typeof m.role !== 'string' || typeof m.content !== 'string') {
      return res.status(400).json({ error: 'Each message must have role and content strings.' })
    }
  }

  // Guard total content size
  const totalChars = messages.reduce((n, m) => n + m.content.length, 0)
  if (totalChars > MAX_MSG_CHARS) {
    return res.status(400).json({ error: 'Message content too large.' })
  }

  const model       = process.env.GROQ_MODEL || 'qwen/qwen3.8-27b'
  const temp        = typeof temperature === 'number' ? temperature : 0.2
  const maxTok      = typeof max_tokens  === 'number' ? max_tokens  : 220

  // ── call Groq ───────────────────────────────────────────────────────────────
  let groqRes
  try {
    groqRes = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages, temperature: temp, max_tokens: maxTok }),
    })
  } catch (err) {
    console.error('[api/chat] Network error calling Groq:', err)
    return res.status(502).json({ error: 'Could not reach the AI service. Please try again.' })
  }

  if (!groqRes.ok) {
    // Log server-side; never forward the raw Groq error to the client
    const body = await groqRes.text().catch(() => '')
    console.error(`[api/chat] Groq returned ${groqRes.status}:`, body)
    return res.status(502).json({ error: `AI service error (${groqRes.status}). Please try again.` })
  }

  let data
  try {
    data = await groqRes.json()
  } catch {
    return res.status(502).json({ error: 'Invalid response from AI service.' })
  }

  // ── return only the assistant reply ────────────────────────────────────────
  const reply = data.choices?.[0]?.message?.content?.trim() || ''
  return res.status(200).json({ reply })
}

