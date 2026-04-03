import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthCard } from '../../components/auth/AuthCard'
import { formStyles as s } from '../../components/auth/formStyles'
import { useAuth } from '../../context/AuthContext'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Login failed')
        return
      }

      login(data.token, { email: data.user?.email ?? email })

      if (rememberMe) {
        localStorage.setItem('remember_email', email)
      }

      navigate('/dashboard')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard>
      <h1 style={s.title}>Sign in to your account</h1>
      <p style={s.signupRow}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#111', fontWeight: 500 }}>
          Sign up here
        </Link>
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
              autoComplete="current-password"
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

        <div style={s.checkboxRow}>
          <input
            id="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember" style={s.checkboxLabel}>
            Remember me
          </label>
        </div>

        <button type="submit" style={s.primaryBtn} disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <div style={s.divider}>
        <div style={s.dividerLine} />
        <span>OR</span>
        <div style={s.dividerLine} />
      </div>

      <button type="button" style={s.outlineBtn}>
        Continue with Google
      </button>

      <div style={s.links}>
        <Link to="/forgot-password" style={s.link}>
          Forgot your password?
        </Link>
        <Link to="/resend-confirmation" style={s.link}>
          Didn't receive confirmation instructions?
        </Link>
      </div>
    </AuthCard>
  )
}
