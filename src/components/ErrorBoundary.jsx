import { Component } from 'react'

// بيمسك أي خطأ في تحميل ملف GLB ويعرض بديل بدل ما الصفحة تقع
export default class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn('[3D] model failed to load:', error?.message || error)
    this.props.onError?.(error)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
