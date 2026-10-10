function Stat({label,value,trend,icon:Icon}){return <div className="card stat"><div className="stat-icon"><Icon size={18}/></div><p className="muted">{label}</p><strong>{value}</strong><small className="trend">{trend} <span>vs last month</span></small></div>}

export { Stat }
export default Stat
