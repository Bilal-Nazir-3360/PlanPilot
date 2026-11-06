function Button({ children, variant = 'primary', size = 'md', loading = false, disabled, ...props }) {
  return <button className={`btn ${variant} btn-${size}`} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>{loading && <span className="btn-spinner" aria-hidden="true" />}{children}</button>
}

export { Button }
export default Button
