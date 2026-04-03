import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthCard } from '../../components/auth/AuthCard'
import { formStyles as s } from '../../components/auth/formStyles'

export function RegisterPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Registration failed')
        return
      }

      navigate('/login')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard>
      <h1 style={s.title}>Create your account</h1>
      <p style={{ ...s.subtitle, marginBottom: '24px' }}>
        Start learning English pronunciation today.
      </p>

      <form onSubmit={handleSubmit}>
        {error && <p style={s.error}>{error}</p>}

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

        <div style={s.fieldGroup}>
          <label style={s.label} htmlFor="password">
            Password
          </label>
          <div style={s.inputWrapper}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={s.inputWithToggle}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = '#111')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = '#e0e0e0')
              }
              required
            />
            <button
              type="button"
              style={s.toggleBtn}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁'}
            </button>
          </div>
        </div>

        <div style={{ ...s.fieldGroup, marginBottom: '24px' }}>
          <label style={s.label} htmlFor="confirm-password">
            Confirm password
          </label>
          <div style={s.inputWrapper}>
            <input
              id="confirm-password"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={s.inputWithToggle}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = '#111')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = '#e0e0e0')
              }
              required
            />
            <button
              type="button"
              style={s.toggleBtn}
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={
                showConfirm ? 'Hide password' : 'Show password'
              }
            >
              {showConfirm ? '🙈' : '👁'}
            </button>
          </div>
        </div>

        <button type="submit" style={s.primaryBtn} disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <div style={s.links}>
        <Link to="/login" style={s.link}>
          Already have an account? Sign in
        </Link>
      </div>
    </AuthCard>
  )
}
