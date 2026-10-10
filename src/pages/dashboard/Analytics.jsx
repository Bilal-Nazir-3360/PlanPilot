import { Clock3, Target, TrendingUp } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, Tooltip, XAxis, YAxis } from 'recharts'
import { analyticsVelocity } from '../../data/workspace'
import Stat from '../../components/ui/StatCard'

function Analytics(){return <><div className="stats-grid"><Stat label="Velocity" value="42 pts" trend="+14%" icon={TrendingUp}/><Stat label="On-time rate" value="91%" trend="+8%" icon={Target}/><Stat label="Avg. cycle time" value="3.2d" trend="-0.4d" icon={Clock3}/></div><div className="card chart-card"><div className="card-head"><h3>Team velocity</h3><span className="muted">Story points by sprint</span></div><ResponsiveContainer width="100%" height={280}><BarChart data={analyticsVelocity}><XAxis dataKey="n" stroke="#8b92a5"/><YAxis stroke="#8b92a5"/><Tooltip contentStyle={{background:'#171b25',border:'1px solid #303545'}}/><Bar dataKey="v" fill="#e2b659" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div></>}

export default Analytics
