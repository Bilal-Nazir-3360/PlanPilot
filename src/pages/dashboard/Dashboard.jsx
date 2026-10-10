import DashboardLayout from '../../components/layout/DashboardLayout'
import PageTitle from '../../components/ui/PageTitle'
import Overview from './Overview'

function Dashboard(){return <DashboardLayout><PageTitle title="Good morning" subtitle="Here’s what’s happening across your workspace."/><Overview/></DashboardLayout>}

export default Dashboard
