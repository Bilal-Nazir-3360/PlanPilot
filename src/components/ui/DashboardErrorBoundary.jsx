import { Link } from 'react-router-dom'
import { Component } from 'react'

export default class DashboardErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Dashboard route error:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return <div className="dashboard-error card" role="alert"><h2>Something went wrong</h2><p>We could not load this dashboard view.</p><div className="dashboard-error-actions"><button className="btn" onClick={() => window.location.reload()}>Reload</button><Link className="btn ghost" to="/dashboard">Go to dashboard</Link></div></div>
  }
}
