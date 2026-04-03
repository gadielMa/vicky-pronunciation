import { useAuth } from '../context/AuthContext'

export function DashboardPage() {
  const { user } = useAuth()
  const firstName = user?.email?.split('@')[0] ?? 'there'

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Welcome back, {firstName}.</h1>
      <p style={styles.subtitle}>More features coming soon.</p>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: '40px 32px',
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: '#111',
    margin: 0,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: '#666',
  },
}
