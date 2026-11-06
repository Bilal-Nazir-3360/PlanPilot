export default function SplitSection({ id, eyebrow, title, description, children, className = '', labelledBy }) {
  const titleId = labelledBy || (id ? `${id}-title` : undefined)
  return <section id={id} className={`split-section section-shell ${className}`} aria-labelledby={titleId}>
    <div className="split-section-intro">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      {title && <h2 id={titleId}>{title}</h2>}
      {description && <p>{description}</p>}
    </div>
    <div className="split-section-content">{children}</div>
  </section>
}
