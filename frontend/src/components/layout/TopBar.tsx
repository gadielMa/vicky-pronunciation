import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

interface TopBarProps {
  showHamburger: boolean
  onMenuClick: () => void
  menuOpen: boolean
}

export function TopBar({ showHamburger, onMenuClick, menuOpen }: TopBarProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const initial = user?.email?.[0]?.toUpperCase() ?? 'U'

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header style={styles.topBar}>
      <div style={styles.left}>
        {showHamburger && (
          <button
            style={styles.hamburger}
            onClick={onMenuClick}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span style={{ ...styles.bar, ...(menuOpen ? styles.bar1Open : {}) }} />
            <span style={{ ...styles.bar, ...(menuOpen ? styles.bar2Open : {}) }} />
            <span style={{ ...styles.bar, ...(menuOpen ? styles.bar3Open : {}) }} />
          </button>
        )}
      </div>

      <div style={styles.right}>
        <span style={styles.email}>{user?.email}</span>
        <div
          style={styles.avatar}
          title="Sign out"
          onClick={handleLogout}
        >
          {initial}
        </div>
      </div>
    </header>
  )
}

const styles: Record<string, React.CSSProperties> = {
  topBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 52,
    background: '#fff',
    borderBottom: '1px solid #e8e8e8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    zIndex: 97,
    boxSizing: 'border-box',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  hamburger: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 5,
    width: 32,
    height: 32,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    borderRadius: 4,
  },
  bar: {
    display: 'block',
    width: 20,
    height: 2,
    background: '#333',
    borderRadius: 2,
    transition: 'transform 0.2s ease, opacity 0.2s ease',
    transformOrigin: 'center',
  },
  bar1Open: {
    transform: 'translateY(7px) rotate(45deg)',
  },
  bar2Open: {
    opacity: 0,
  },
  bar3Open: {
    transform: 'translateY(-7px) rotate(-45deg)',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  email: {
    fontSize: 13,
    color: '#555',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    background: '#111',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    userSelect: 'none',
  },
}
