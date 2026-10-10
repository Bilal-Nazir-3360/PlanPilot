import { Link } from 'react-router-dom'
import SimplePage from '../../components/layout/SimplePage'

export default function NotFound() {
  return <SimplePage title="Page not found"><p>That page wandered off. <Link className="text-link" to="/">Return home</Link>.</p></SimplePage>
}
