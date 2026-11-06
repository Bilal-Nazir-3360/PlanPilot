export default function StatusBadge({ status }) {
  const label = status === 'Coming soon' ? 'Soon' : status
  return <span className={`feature-status feature-status-${status.toLowerCase().replace(' ', '-')}`}>{label}</span>
}
