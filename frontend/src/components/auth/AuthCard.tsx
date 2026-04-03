import type { ReactNode } from 'react'

interface AuthCardProps {
  children: ReactNode
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
  } as React.CSSProperties,

  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
    padding: '40px 40px 32px',
    width: '100%',
    maxWidth: '420px',
  } as React.CSSProperties,

  logo: {
    fontSize: '18px',
    fontWeight: 700,
    letterSpacing: '-0.5px',
    marginBottom: '32px',
    color: '#111',
  } as React.CSSProperties,
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.logo}>VP</div>
        {children}
      </div>
    </div>
  )
}
