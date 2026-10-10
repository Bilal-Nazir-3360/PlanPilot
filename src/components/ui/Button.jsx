function Button({children,variant='primary',...p}){return <button className={`btn ${variant}`} {...p}>{children}</button>}

export { Button }
export default Button
