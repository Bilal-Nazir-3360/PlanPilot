import { useState } from 'react'
import { X } from 'lucide-react'
import Button from './Button'

function TaskModal({close,add}){const [title,setTitle]=useState('');return <div className="modal-back"><div className="modal"><div className="card-head"><h3>New task</h3><button className="icon-btn" onClick={close}><X size={18}/></button></div><label>Task name<input autoFocus value={title} onChange={e=>setTitle(e.target.value)} placeholder="What needs doing?"/></label><label>Project<select><option>Website refresh</option><option>Q4 Launch</option><option>Internal</option></select></label><div className="modal-actions"><Button variant="ghost" onClick={close}>Cancel</Button><Button onClick={()=>title&&add({title,project:'Website refresh',status:'Todo',priority:'Medium',due:'Today',tag:'General'})}>Create task</Button></div></div></div>}

export { TaskModal }
export default TaskModal
