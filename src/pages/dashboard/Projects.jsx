import { Plus } from 'lucide-react'
import Button from '../../components/ui/Button'
import seedProjects from '../../data/projects'
import SpotlightCard from '../../components/ui/SpotlightCard'
import Reveal from '../../components/ui/Reveal'

function Projects(){return <div className="projects-page"><div className="page-toolbar"><p className="muted">Keep the big picture in view.</p><Button><Plus size={17}/> New project</Button></div><div className="project-grid">{seedProjects.map((p,index)=><Reveal key={p.id} delay={index*.06}><SpotlightCard className="card project-detail"><div className="project-banner" style={{background:p.color}}/><div className="project-detail-body"><div className="project-icon" style={{background:p.color}}>✦</div><h3>{p.name}</h3><p className="muted">A focused space for your team’s best work.</p><div className="progress"><i style={{width:`${p.done/p.tasks*100}%`,background:p.color}}/></div><div className="project-meta"><span>{p.done}/{p.tasks} tasks</span><span>{p.people} members</span></div></div></SpotlightCard></Reveal>)}</div></div>}

export default Projects
