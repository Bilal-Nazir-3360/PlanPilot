import SpotlightCard from './SpotlightCard'

function Stat({label,value,trend,icon:Icon,sample=false}){return <SpotlightCard className="card stat"><div className="stat-icon"><Icon size={18}/></div><p className="muted">{label}</p><strong>{value}</strong>{sample && <span className="sample-badge stat-sample-badge">Sample data</span>}{trend && <small className="trend">{trend}</small>}</SpotlightCard>}

export { Stat }
export default Stat
