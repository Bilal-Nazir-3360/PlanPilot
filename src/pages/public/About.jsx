import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import AboutHero from './about/AboutHero'
import Author from './about/Author'
import BuiltVsNext from './about/BuiltVsNext'
import StackCards from './about/StackCards'
import Story from './about/Story'

export default function About() {
  useDocumentTitle('About — PlanPilot', 'Learn how PlanPilot explores product design, React architecture, accessible UI, and a path toward a full-stack build.')
  return <><Navbar /><main id="main" className="about-page"><AboutHero /><Story /><StackCards /><BuiltVsNext /><Author /></main><Footer /></>
}
