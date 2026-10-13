import { Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import Reveal from '../../components/ui/Reveal'
import SpotlightCard from '../../components/ui/SpotlightCard'
import { useApp } from '../../context/AppContext'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { hasAuthErrors, passwordStrength, validateLogin, validateSignup } from '../../utils/validateAuth'

function AuthBenefits({ mode }) {
  return <Reveal className="auth-benefits"><div className="eyebrow">A CALMER START</div><h2>{mode === 'login' ? 'Pick up where you left off.' : 'Make space for focused work.'}</h2><p>PlanPilot keeps tasks, projects, and progress together in one focused workspace.</p><ul><li><ShieldCheck size={18} /> Demo auth stays in this browser.</li><li><ShieldCheck size={18} /> No real accounts or emails are sent.</li><li><ShieldCheck size={18} /> Try the workspace without setup.</li></ul></Reveal>
}

function Auth({ mode }) {
  const { user, login, signup, demoLogin, setPlan, setToast } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const passwordId = useId()
  const isSignup = mode === 'signup'
  const selectedPlan = new URLSearchParams(location.search).get('plan')
  const signupPlan = selectedPlan === 'pro' || selectedPlan === 'team' ? selectedPlan : 'free'
  const redirectTo = location.state?.from ? `${location.state.from.pathname}${location.state.from.search || ''}` : '/dashboard'

  useDocumentTitle(isSignup ? 'Create account — PlanPilot' : 'Log in — PlanPilot', isSignup ? 'Create a local PlanPilot demo workspace in your browser.' : 'Log in to your local PlanPilot demo workspace.')

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [navigate, user])

  const updateValue = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setFormError('')
  }

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = isSignup ? validateSignup(values) : validateLogin(values)
    setErrors(nextErrors)
    if (hasAuthErrors(nextErrors)) {
      setFormError('Please correct the highlighted fields.')
      return
    }
    setSubmitting(true)
    try {
      if (isSignup) {
        signup(values.name, values.email, values.password)
        setPlan(signupPlan, 'monthly')
      } else {
        login(values.email, values.password)
      }
      setToast('Welcome to PlanPilot')
      navigate(redirectTo, { replace: true })
    } catch (error) {
      setErrors(error.fields || {})
      setFormError(error.message || 'Unable to continue. Please try again.')
      setSubmitting(false)
    }
  }

  const tryDemo = () => {
    setSubmitting(true)
    demoLogin()
    setToast('Demo account ready')
    navigate(redirectTo, { replace: true })
  }

  const strength = passwordStrength(values.password)
  const fieldError = (field) => errors[field] ? <span id={`${field}-error`} className="form-error">{errors[field]}</span> : null

  return <><Navbar /><main id="main" className="auth-layout"><Reveal className="auth-form-column"><SpotlightCard tilt className="auth-card"><div className="eyebrow">{isSignup ? 'GET STARTED' : 'WELCOME BACK'}</div><h1>{isSignup ? 'Create your workspace' : 'Sign in to your workspace'}</h1><p className="muted">This is demo auth stored in this browser. No real accounts or emails are sent.</p><form onSubmit={submit} noValidate aria-busy={submitting}><div className="form-status" aria-live="polite">{formError}</div>{isSignup && <label>Name<input name="name" value={values.name} onChange={(event) => updateValue('name', event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{fieldError('name')}</label>}<label>Email<input name="email" value={values.email} onChange={(event) => updateValue('email', event.target.value)} type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />{fieldError('email')}</label><label>Password<div className="password-field"><input id={passwordId} name="password" value={values.password} onChange={(event) => updateValue('password', event.target.value)} type={showPassword ? 'text' : 'password'} autoComplete={isSignup ? 'new-password' : 'current-password'} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? `password-error${isSignup ? ' password-strength' : ''}` : isSignup ? 'password-strength' : undefined} /><button type="button" className="password-toggle" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>{fieldError('password')}{isSignup && <><span id="password-strength" className="password-strength">Strength: {strength.label}</span><span className="password-meter" aria-hidden="true"><span style={{ width: `${strength.value * 25}%` }} /></span></>}</label><Button type="submit" disabled={submitting}>{submitting ? 'Working…' : isSignup ? 'Create account' : 'Log in'}</Button></form><Button type="button" variant="ghost" className="demo-button" onClick={tryDemo} disabled={submitting}>Try demo account</Button><p className="auth-switch">{isSignup ? 'Already have an account?' : 'New to PlanPilot?'} <Link to={isSignup ? '/login' : '/signup'}>{isSignup ? 'Log in' : 'Create an account'}</Link></p></SpotlightCard></Reveal><AuthBenefits mode={mode} /></main><Footer /></>
}

export default Auth
