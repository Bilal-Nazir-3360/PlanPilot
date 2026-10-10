import { useState } from 'react'
import { MoreHorizontal, Plus, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import Button from '../../components/ui/Button'
import TaskModal from '../../components/ui/TaskModal'

function Tasks(){const {tasks,addTask,updateTask}=useApp();const [q,setQ]=useState('');const [show,setShow]=useState(false);const shown=tasks.filter(t=>(t.title+t.project+t.tag).toLowerCase().includes(q.toLowerCase()));const cols=['Todo','In progress','Done'];return <><div className="page-toolbar"><div className="search"><Search size={17}/><input placeholder="Search tasks..." value={q} onChange={e=>setQ(e.target.value)}/></div><Button onClick={()=>setShow(true)}><Plus size={17}/> New task</Button></div><div className="kanban">{cols.map(col=><div className="kanban-col" key={col}><div className="col-title"><b>{col}</b><span>{shown.filter(t=>t.status===col).length}</span></div>{shown.filter(t=>t.status===col).map(t=><motion.div layout draggable onDragEnd={()=>{}} onDragOver={e=>e.preventDefault()} onDrop={()=>updateTask(t.id,{status:col})} className="task-card" key={t.id}><div className="task-top"><span className={`priority ${t.priority.toLowerCase()}`}>{t.priority}</span><MoreHorizontal size={16}/></div><b>{t.title}</b><small>{t.project}</small><div className="task-foot"><span>{t.tag}</span><span>{t.due}</span></div></motion.div>)}<div className="drop-hint" onClick={()=>setShow(true)}><Plus size={15}/> Add task</div></div>)}</div>{show&&<TaskModal close={()=>setShow(false)} add={t=>{addTask(t);setShow(false)}}/>}</>}

export default Tasks
