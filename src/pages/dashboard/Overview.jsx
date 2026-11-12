import { CheckSquare, FolderKanban, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis } from 'recharts'
import { useApp } from '../../context/AppContext'
import Stat from '../../components/ui/StatCard'
import SpotlightCard from '../../components/ui/SpotlightCard'
import Reveal from '../../components/ui/Reveal'

function safePercent(value) {
  const number = Number(value)
  return Number.isFinite(number) ? Math.max(0, Math.min(100, number)) : 0
}

function getDayKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function Overview() {
  const app = useApp()
  const [range, setRange] = useState(30)
  const tasks = Array.isArray(app.tasks) ? app.tasks : []
  const projects = Array.isArray(app.projects) ? app.projects : []
  const teamMembers = Array.isArray(app.teamMembers) ? app.teamMembers : []
  const done = tasks.filter((task) => task?.status === 'Done').length
  const completionPercent = tasks.length ? Math.round((done / tasks.length) * 100) : 0
  const averageProjectProgress = projects.length
    ? Math.round(projects.reduce((sum, project) => sum + safePercent(project?.percent), 0) / projects.length)
    : 0
  const chartData = useMemo(() => {
    const today = new Date()
    const counts = new Map()
    const days = Array.from({ length: range }, (_, index) => {
      const date = new Date(today)
      date.setHours(0, 0, 0, 0)
      date.setDate(today.getDate() - (range - index - 1))
      const key = getDayKey(date)
      counts.set(key, 0)
      return { key, n: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) }
    })
    tasks.filter((task) => task?.status === 'Done').forEach((task) => {
      const updatedAt = new Date(task.updatedAt)
      const key = Number.isNaN(updatedAt.getTime()) ? null : getDayKey(updatedAt)
      if (key && counts.has(key)) counts.set(key, counts.get(key) + 1)
    })
    return days.map(({ key, n }) => ({ n, v: counts.get(key) }))
  }, [range, tasks])
  const hasProgressData = chartData.some((point) => point.v > 0)
  const hasTasks = tasks.length > 0

  return <>
    <div className="stats-grid">
      <Stat label="Tasks completed" value={`${done} / ${tasks.length}`} trend={`${completionPercent}%`} icon={CheckSquare}/>
      <Stat label="Active projects" value={String(projects.length)} trend={`${averageProjectProgress}% avg.`} icon={FolderKanban}/>
      <Stat label="Average project progress" value={`${averageProjectProgress}%`} trend={projects.length ? 'Based on projects' : 'No projects yet'} icon={TrendingUp}/>
      <Stat label="Team members" value={String(teamMembers.length)} trend={teamMembers.length ? 'Workspace members' : 'No members yet'} icon={TrendingUp}/>
    </div>
    {!hasTasks && <div className="empty-state overview-empty" role="status"><div><h3>No tasks yet</h3><p>Create a task to start tracking your progress.</p></div><Link className="btn" to="/dashboard/tasks">Go to Tasks</Link></div>}
    <div className="dash-grid">
      <Reveal><SpotlightCard as="section" className="card chart-card"><div className="card-head"><div><h3>Progress overview</h3><p className="muted">Completed tasks by day</p></div><select aria-label="Chart range" value={range} onChange={(event) => setRange(Number(event.target.value))}><option value="30">Last 30 days</option><option value="90">Last 90 days</option></select></div>{hasProgressData ? <ResponsiveContainer width="100%" height={220}><AreaChart data={chartData}><XAxis dataKey="n" hide/><YAxis hide allowDecimals={false}/><Tooltip contentStyle={{background:'var(--tooltip-bg)',border:'1px solid var(--line-strong)',color:'var(--text)'}}/><Area type="monotone" dataKey="v" stroke="var(--chart-series)" fill="var(--chart-series)" fillOpacity={.12} strokeWidth={2} dot={{ r: 3, fill: 'var(--chart-series)' }} activeDot={{ r: 5 }}/></AreaChart></ResponsiveContainer> : <div className="overview-chart-empty" role="status">Complete tasks to see your progress</div>}</SpotlightCard></Reveal>
      <Reveal delay={.08}><SpotlightCard className="card"><div className="card-head"><h3>Up next</h3><Link to="/dashboard/tasks" className="text-link">View all</Link></div>{hasTasks ? <div className="mini-list">{tasks.slice(0, 4).map((task) => { const priority = typeof task?.priority === 'string' ? task.priority : 'Medium'; return <div className="mini-task" key={task.id}><span className={`dot ${task?.status === 'Done' ? 'done' : ''}`}/><div><b>{task?.title || 'Untitled task'}</b><small>{task?.project || 'No project'} · {task?.due || 'No due date'}</small></div><span className={`priority ${priority.toLowerCase()}`}>{priority}</span></div> })}</div> : <div className="review-empty"><p>No tasks yet.</p><Link className="btn ghost" to="/dashboard/tasks">Go to Tasks</Link></div>}</SpotlightCard></Reveal>
    </div>
    <Reveal><SpotlightCard className="card project-overview"><div className="card-head"><h3>Active projects</h3><Link to="/dashboard/projects" className="text-link">Manage projects</Link></div>{projects.length ? <div className="project-cards">{projects.map((project) => { const percent = safePercent(project?.percent); return <div className="project-card" key={project.id}><div className="project-icon">✦</div><b>{project?.name || 'Untitled project'}</b><span>{project?.doneTasks || 0} of {project?.totalTasks || 0} tasks complete</span><div className="progress"><i style={{width: `${percent}%`, background: 'var(--accent)'}}/></div></div> })}</div> : <div className="review-empty"><p>No projects yet.</p><Link className="btn ghost" to="/dashboard/projects">Go to Projects</Link></div>}</SpotlightCard></Reveal>
  </>
}

export default Overview
