import LegalPage from './legal/LegalPage'
import { privacyLastUpdated } from '../../data/site'

const sections = [
  { id: 'what-stored', label: 'What is stored' },
  { id: 'what-not-collected', label: 'What is not collected' },
  { id: 'delete-data', label: 'Delete your data' },
  { id: 'future-backend', label: 'Future backend' },
]

export default function Privacy() {
  return <LegalPage title="Privacy" description="Plain-English privacy information for the PlanPilot portfolio demo." sections={sections} lastUpdated={privacyLastUpdated}>
    <section id="what-stored"><h2>What is stored</h2><p>PlanPilot stores account and workspace data through its service. Local browser storage is used only for demo preferences and locally managed form data.</p><div className="storage-key-list"><div><code>pp_user</code><span>Demo user identity used for the local login state.</span></div><div><code>pp_reviews</code><span>Reviews saved through the demo review form.</span></div><div><code>pp_theme</code><span>Your dark or light theme preference.</span></div><div><code>pp_plan</code><span>Your selected demo plan and billing-cycle state.</span></div><div><code>pp_contact_messages</code><span>Messages saved through the local contact form.</span></div></div></section>
    <section id="what-not-collected"><h2>What is not collected</h2><p>This project does not use analytics services or cookies. It does not currently send email or process payments.</p><p>Do not store financial details, private client information, or other sensitive information in this portfolio demo.</p></section>
    <section id="delete-data"><h2>How to delete your data</h2><p>In the demo workspace, open Settings and choose <strong>Clear local data</strong>. You can also clear this site’s browser data or localStorage through your browser’s developer tools. Clearing browser data may remove other local data for this site too.</p></section>
    <section id="future-backend"><h2>Service data</h2><p>Workspace data is transmitted to the PlanPilot service so it can be loaded across signed-in sessions.</p></section>
  </LegalPage>
}
