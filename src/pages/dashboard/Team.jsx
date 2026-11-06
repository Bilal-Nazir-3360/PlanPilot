import { useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Modal from '../../components/ui/Modal'
import SpotlightCard from '../../components/ui/SpotlightCard'
import { useApp } from '../../context/AppContext'

function MemberForm({ member, onSave, onClose }) {
  const [form, setForm] = useState({ name: member?.name || '', email: member?.email || '', role: member?.role || '' })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const submit = async (event) => { event.preventDefault(); const next = {}; if (!form.name.trim()) next.name = 'Name is required.'; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.'; if (!form.role.trim()) next.role = 'Role is required.'; if (Object.keys(next).length) { setErrors(next); return }; setSaving(true); try { await onSave({ name: form.name.trim(), email: form.email.trim(), role: form.role.trim() }); onClose() } catch (error) { setErrors({ ...(error.errors || {}), form: error.message }) } finally { setSaving(false) } }
  return <Modal onClose={onClose} labelledBy="member-form-title"><form className="task-form team-form" onSubmit={submit}><div className="card-head"><h3 id="member-form-title">{member ? 'Edit team member' : 'Add team member'}</h3></div>{errors.form && <small className="form-error" role="alert">{errors.form}</small>}<div className="team-form-fields">{['name', 'email', 'role'].map((field) => <label key={field}>{field[0].toUpperCase() + field.slice(1)}<input type={field === 'email' ? 'email' : 'text'} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} aria-invalid={Boolean(errors[field])} />{errors[field] && <small className="form-error">{errors[field]}</small>}</label>)}</div><div className="modal-actions"><Button type="button" variant="ghost" onClick={onClose}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? 'Saving…' : member ? 'Save changes' : 'Add member'}</Button></div></form></Modal>
}

export default function Team() {
  const { teamMembers, loading, error, reloadTeam, addMember, updateMember, deleteMember, canInviteMembers, setToast } = useApp()
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const save = (member) => editing?.id ? updateMember(editing.id, member) : addMember(member)
  const confirmDelete = async () => { try { await deleteMember(deleting.id); setDeleting(null) } catch (deleteError) { setToast(deleteError.message || 'Could not delete the team member.') } }
  return <SpotlightCard className="card"><div className="card-head"><div><h3>Your team</h3><p className="muted">{teamMembers.length} {teamMembers.length === 1 ? 'person' : 'people'} in your workspace</p></div>{canInviteMembers ? <Button onClick={() => setEditing({})}><Plus size={16}/> Invite</Button> : <Link className="btn ghost team-invite-locked" to="/dashboard/billing">Invite</Link>}</div>{!canInviteMembers && <p className="plan-limit-message" role="status">Team invites are locked on this plan. <Link to="/dashboard/billing">Upgrade to Team</Link></p>}{loading ? <div className="review-empty" role="status">Loading team…</div> : error ? <div className="review-empty" role="alert"><h3>Could not load team.</h3><p>{error.message}</p><button className="btn ghost" onClick={reloadTeam}>Retry</button></div> : !teamMembers.length ? <div className="review-empty"><h3>No team members yet.</h3><p>Invite people when your plan allows it.</p></div> : <div className="team-table"><div className="team-table-head" aria-hidden="true"><span>Name</span><span>Role</span><span>Email</span><span>Actions</span></div><div className="team-list">{teamMembers.map((member) => <div className="team-row" key={member.id}><div className="avatar">{member.name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()}</div><div className="team-member-details"><b>{member.name}</b><small>{member.role}</small><small>{member.email}</small></div><span className="team-role">{member.role}</span><span className="team-email">{member.email}</span><div className="team-actions"><button className="btn ghost" onClick={() => setEditing(member)}>Edit</button><button className="btn danger" onClick={() => setDeleting(member)}>Delete</button></div></div>)}</div></div>}{editing && <MemberForm member={editing.id ? editing : null} onSave={save} onClose={() => setEditing(null)}/>} {deleting && <ConfirmDialog title="Remove this team member?" message="They will be removed from this workspace." close={() => setDeleting(null)} confirm={confirmDelete} confirmLabel="Remove member"/>}</SpotlightCard>
}
