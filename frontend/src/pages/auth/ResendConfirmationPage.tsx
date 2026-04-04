import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthCard } from '../../components/auth/AuthCard'
import { formStyles as s } from '../../components/auth/formStyles'
import { apiUrl } from '../../lib/api'

export function ResendConfirmationPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const res = await fetch(apiUrl('/api/auth/resend-confirmation'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong')
        return
      }

      setSuccess(
        `Confirmation token: ${data.confirm_token ?? ''}. Check your email (mock mode).`,
      )
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard>
      <h1 style={s.title}>Resend confirmation instructions</h1>
      <p style={s.subtitle}>
        Enter your email address and we'll resend the confirmation
        instructions for your account.
      </p>

      <form onSubmit={handleSubmit}>
        {error && <p style={s.error}>{error}</p>}
        {success && <p style={s.success}>{success}</p>}

        <div style={s.fieldGroup}>
          <label style={s.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={s.input}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = '#111')
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = '#e0e0e0')
            }
            required
          />
        </div>

        <button type="submit" style={s.primaryBtn} disabled={loading}>
          {loading ? 'Sending…' : 'Resend instructions'}
        </button>
      </form>

      <div style={s.links}>
        <Link to="/login" style={s.link}>
          Back to Sign In
        </Link>
        <Link to="/forgot-password" style={s.link}>
          Forgot your password?
        </Link>
      </div>
    </AuthCard>
  )
}
