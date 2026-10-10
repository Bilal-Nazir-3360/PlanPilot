import DashboardLayout from '../../components/layout/DashboardLayout'
import PageTitle from '../../components/ui/PageTitle'

function DashPage({title,sub,children}){return <DashboardLayout><PageTitle title={title} subtitle={sub}/>{children}</DashboardLayout>}

export default DashPage
