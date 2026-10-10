import MoveTaskDemo from './demos/MoveTaskDemo'
import PriorityDemo from './demos/PriorityDemo'
import ProgressDemo from './demos/ProgressDemo'
import Reveal from '../../../components/ui/Reveal'

export default function InteractiveDemos() {
  return <section className="feature-demos" aria-labelledby="interactive-demos-title"><Reveal><p className="eyebrow">SEE IT IN MOTION</p><h2 id="interactive-demos-title">Small interactions. Clearer decisions.</h2><p>These are self-contained sample interactions so you can feel the product before entering the demo workspace.</p></Reveal><div className="demo-grid"><Reveal delay={.05}><MoveTaskDemo/></Reveal><Reveal delay={.1}><PriorityDemo/></Reveal><Reveal delay={.15}><ProgressDemo/></Reveal></div></section>
}
