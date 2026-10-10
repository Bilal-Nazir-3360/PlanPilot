import Button from '../../components/ui/Button'
import { calendarEvents } from '../../data/workspace'

function Calendar(){return <div className="card calendar"><div className="calendar-head"><h3>October 2025</h3><div><Button variant="ghost">Today</Button><button className="icon-btn">‹</button><button className="icon-btn">›</button></div></div><div className="calendar-grid">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(x=><b key={x}>{x}</b>)}{Array.from({length:35},(_,i)=><div className={`day ${i===11?'today':''}`} key={i}><span>{i<3?'':i-2}</span>{calendarEvents.includes(i)&&<small>Project sync</small>}{i===11&&<small className="gold-event">Launch plan</small>}</div>)}</div></div>}

export default Calendar
