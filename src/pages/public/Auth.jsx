import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import ThemeToggle from '../../components/ui/ThemeToggle'
import SpotlightCard from '../../components/ui/SpotlightCard'
import { useApp } from '../../context/AppContext'

function Auth({mode}){const {setUser,setToast}=useApp();const nav=useNavigate();const [email,setEmail]=useState('demo@planpilot.app');return <div className="auth-page"><div className="auth-topbar"><Link to="/" className="brand auth-brand"><span>✦</span> PlanPilot</Link><ThemeToggle/></div><SpotlightCard tilt className="auth-card"><div className="eyebrow">{mode==='login'?'WELCOME BACK':'GET STARTED'}</div><h2>{mode==='login'?'Sign in to your workspace':'Create your workspace'}</h2><p className="muted">{mode==='login'?'Pick up where you left off.':'Your calmer, clearer workday starts here.'}</p><form onSubmit={e=>{e.preventDefault();setUser({email,name:email.split('@')[0]});setToast('Welcome to PlanPilot');nav('/dashboard')}}><label>Email<input value={email} onChange={e=>setEmail(e.target.value)} type="email"/></label><label>Password<input defaultValue="password123" type="password"/></label><Button type="submit">{mode==='login'?'Continue':'Create account'} <ArrowRight size={15}/></Button></form><p className="auth-switch">{mode==='login'?'New to PlanPilot?':'Already have an account?'} <Link to={mode==='login'?'/signup':'/login'}>{mode==='login'?'Create an account':'Log in'}</Link></p></SpotlightCard></div>}

export default Auth
