import { Trash2 } from 'lucide-react'
import Button from '../../components/ui/Button'
import { useApp } from '../../context/AppContext'
import SpotlightCard from '../../components/ui/SpotlightCard'
import { Link } from 'react-router-dom'

function Settings(){const {clearData,theme,setTheme,plan}=useApp();return <div className="settings-wrap"><SpotlightCard className="card settings-card"><h3>Appearance</h3><p className="muted">Make PlanPilot feel like home.</p><div className="setting-row"><div><b>Color mode</b><small>Choose between dark and light mode.</small></div><Button variant="ghost" onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?'Dark':'Light'} mode</Button></div></SpotlightCard><SpotlightCard className="card settings-card"><h3>Plan</h3><p className="muted">You are exploring the {plan.name} demo plan.</p><Link className="btn ghost" to="/dashboard/billing">Manage demo plan</Link></SpotlightCard><SpotlightCard className="card settings-card danger"><h3>Danger zone</h3><p className="muted">Clear local demo data and start over.</p><div className="setting-row"><div><b>Clear workspace data</b><small>This removes tasks saved in this browser.</small></div><Button variant="danger" onClick={clearData}><Trash2 size={16}/> Clear data</Button></div></SpotlightCard></div>}

export default Settings
