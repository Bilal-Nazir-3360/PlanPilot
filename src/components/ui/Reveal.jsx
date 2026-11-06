export default function Reveal({ children, className = '', delay = 0, ...props }) {
  return <div className={className} {...props}>{children}</div>
}

export function RevealGroup({ children, className = '', stagger = 0.07, ...props }) {
  return <div className={className} {...props}>{children}</div>
}
