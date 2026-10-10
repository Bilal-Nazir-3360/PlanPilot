import ConfirmDialog from './ConfirmDialog'

export default function DeleteConfirm({ task, close, confirm }) {
  return <ConfirmDialog title="Delete task?" message={`Delete “${task.title}”? This action cannot be undone.`} close={close} confirm={confirm} confirmLabel="Delete task"/>
}
