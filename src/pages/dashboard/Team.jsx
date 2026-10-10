import { MoreHorizontal, Plus } from 'lucide-react'
import Button from '../../components/ui/Button'
import { teamMembers } from '../../data/workspace'

function Team(){return <div className="card"><div className="card-head"><div><h3>Your team</h3><p className="muted">7 people in Acme workspace</p></div><Button><Plus size={16}/> Invite</Button></div><div className="team-list">{teamMembers.map(x=><div className="team-row" key={x[0]}><div className="avatar">{x[3]}</div><div><b>{x[0]}</b><small>{x[1]}</small></div><span>{x[2]}</span><button className="icon-btn"><MoreHorizontal size={17}/></button></div>)}</div></div>}

export default Team
