import { MoreHorizontal, Plus } from 'lucide-react'
import Button from '../../components/ui/Button'
import { teamMembers } from '../../data/workspace'
import SpotlightCard from '../../components/ui/SpotlightCard'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

function Team(){const {canInviteMembers}=useApp();return <SpotlightCard className="card"><div className="card-head"><div><h3>Your team</h3><p className="muted">7 people in Acme workspace</p></div>{canInviteMembers?<Button><Plus size={16}/> Invite</Button>:<Link className="btn ghost team-invite-locked" to="/dashboard/billing">🔒 Invite</Link>}</div>{!canInviteMembers&&<p className="plan-limit-message" role="status">Team invites are locked on this plan. <Link to="/dashboard/billing">Upgrade to Team</Link></p>}<div className="team-list">{teamMembers.map(x=><div className="team-row" key={x[0]}><div className="avatar">{x[3]}</div><div><b>{x[0]}</b><small>{x[1]}</small></div><span>{x[2]}</span><button className="icon-btn"><MoreHorizontal size={17}/></button></div>)}</div></SpotlightCard>}

export default Team
