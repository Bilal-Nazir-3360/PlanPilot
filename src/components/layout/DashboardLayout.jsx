import { useState } from 'react'
import { BarChart3, CalendarDays, CheckSquare, ChevronDown, FolderKanban, LayoutDashboard, MessageCircle, Moon, Settings as SettingsIcon, Sun, Users } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Chat from '../ui/Chat'

const side = [['/dashboard', 'Overview', LayoutDashboard], ['/dashboard/tasks', 'My tasks', CheckSquare], ['/dashboard/projects', 'Projects', FolderKanban], ['/dashboard/calendar', 'Calendar', CalendarDays], ['/dashboard/team', 'Team', Users], ['/dashboard/analytics', 'Analytics', BarChart3]]

function DashboardLayout({children}){const {theme,setTheme,user,logout}=useApp();const [chat,setChat]=useState(false);const nav=useNavigate();const loc=useLocation();return <div className="app-shell"><aside><Link to="/" className="brand"><span>✦</span> PlanPilot</Link><div className="workspace-select">Acme workspace <ChevronDown size={14}/></div><div className="side-links">{side.map(([to,label,Icon])=><Link className={loc.pathname===to?'active':''} key={to} to={to}><Icon size={18}/>{label}</Link>)}</div><div className="side-bottom"><Link to="/dashboard/settings"><SettingsIcon size={18}/>Settings</Link><button className="theme-toggle" onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={17}/>:<Moon size={17}/>} {theme==='dark'?'Light mode':'Dark mode'}</button><div className="user-chip"><div className="avatar">{(user?.name||'D')[0].toUpperCase()}</div><div><b>{user?.name||'Demo user'}</b><small>{user?.email||'demo@planpilot.app'}</small></div><button onClick={()=>{logout();nav('/')}}>↗</button></div></div></aside><main className="dashboard-main"><header className="dash-header"><div><span className="muted">{new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</span>{loc.pathname!=='/dashboard'&&<h2>{children.props?.title||'Workspace'}</h2>}</div><div className="header-actions"><button className="icon-btn" onClick={()=>setChat(!chat)} aria-label="Open workspace guide"><MessageCircle size={19}/></button><button className="avatar" aria-label="Account menu">{(user?.name||'D')[0].toUpperCase()}</button></div></header>{children}</main>{chat&&<Chat onClose={()=>setChat(false)}/>}</div>}

export { DashboardLayout }
export default DashboardLayout
