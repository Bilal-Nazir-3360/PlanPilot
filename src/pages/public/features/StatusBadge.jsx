export default function StatusBadge({ status }) {
  return <span className={`feature-status feature-status-${status.toLowerCase().replace(' ', '-')}`}>{status}</span>
}
