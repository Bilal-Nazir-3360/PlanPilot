import MoveTaskDemo from './demos/MoveTaskDemo'
import PriorityDemo from './demos/PriorityDemo'
import ProgressDemo from './demos/ProgressDemo'
import Reveal from '../../../components/ui/Reveal'
import SplitSection from '../../../components/ui/SplitSection'

export default function InteractiveDemos() {
  return <SplitSection className="feature-demos" eyebrow="SEE IT IN MOTION" title="Small interactions. Clearer decisions." description="These are self-contained sample interactions so you can feel the product before entering the demo workspace." labelledBy="interactive-demos-title"><div className="demo-grid"><Reveal delay={.05}><MoveTaskDemo/></Reveal><Reveal delay={.1}><PriorityDemo/></Reveal><Reveal delay={.15}><ProgressDemo/></Reveal></div></SplitSection>
}
