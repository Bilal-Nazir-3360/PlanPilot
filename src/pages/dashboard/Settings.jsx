import { Trash2 } from 'lucide-react'
import Button from '../../components/ui/Button'
import { useApp } from '../../context/AppContext'

function Settings(){const {clearData,theme,setTheme}=useApp();return <div className="settings-wrap"><section className="card settings-card"><h3>Appearance</h3><p className="muted">Make PlanPilot feel like home.</p><div className="setting-row"><div><b>Color mode</b><small>Choose between dark and light mode.</small></div><Button variant="ghost" onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?'Dark':'Light'} mode</Button></div></section><section className="card settings-card danger"><h3>Danger zone</h3><p className="muted">Clear local demo data and start over.</p><div className="setting-row"><div><b>Clear workspace data</b><small>This removes tasks saved in this browser.</small></div><Button variant="danger" onClick={clearData}><Trash2 size={16}/> Clear data</Button></div></section></div>}

export default Settings
