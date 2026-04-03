import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

interface NavItem {
  label: string
  path?: string
  icon: string
  children?: { label: string; path: string }[]
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: '⊞' },
  {
    label: 'Products', icon: '📦',
    children: [
      { label: 'All Products', path: '/products' },
      { label: 'Courses', path: '/products/courses' },
      { label: 'Coaching', path: '/products/coaching' },
      { label: 'Community', path: '/products/community' },
      { label: 'Downloads', path: '/products/downloads' },
    ],
  },
  {
    label: 'Sales', icon: '💳',
    children: [
      { label: 'Offers', path: '/sales/offers' },
      { label: 'Coupons', path: '/sales/coupons' },
    ],
  },
  { label: 'Website', path: '/website', icon: '🌐' },
  {
    label: 'Marketing', icon: '📣',
    children: [
      { label: 'Overview', path: '/marketing' },
      { label: 'Email Campaigns', path: '/marketing/campaigns' },
      { label: 'Automations', path: '/marketing/automations' },
    ],
  },
  { label: 'Contacts', path: '/contacts', icon: '👥' },
  { label: 'Media Library', path: '/media', icon: '🎬' },
]

interface SidebarProps {
  open: boolean
  mobile: boolean
  onClose: () => void
}

export function Sidebar({ open, mobile, onClose }: SidebarProps) {
  const location = useLocation()
  const [expanded, setExpanded] = useState<string | null>(() => {
    const active = navItems.find(item =>
      item.children?.some(c => location.pathname.startsWith(c.path))
    )
    return active?.label ?? null
  })

  const toggle = (label: string) => {
    setExpanded(prev => (prev === label ? null : label))
  }

  const sidebarStyle: React.CSSProperties = {
    ...styles.sidebar,
    transform: open ? 'translateX(0)' : 'translateX(-100%)',
    boxShadow: mobile && open ? '2px 0 12px rgba(0,0,0,0.15)' : 'none',
  }

  return (
    <>
      {mobile && open && (
        <div style={styles.overlay} onClick={onClose} />
      )}
      <nav style={sidebarStyle}>
        <div style={styles.logo}>
          <span style={styles.logoMark}>VP</span>
          <span style={styles.logoName}>Vicky Pronunciation</span>
        </div>

        <ul style={styles.list}>
          {navItems.map(item => {
            const isExpanded = expanded === item.label
            const hasChildren = !!item.children
            const isChildActive = item.children?.some(c =>
              location.pathname.startsWith(c.path)
            )

            return (
              <li key={item.label}>
                {hasChildren ? (
                  <>
                    <button
                      style={{
                        ...styles.navItem,
                        ...(isChildActive ? styles.navItemActive : {}),
                      }}
                      onClick={() => toggle(item.label)}
                    >
                      <span style={styles.icon}>{item.icon}</span>
                      <span style={styles.label}>{item.label}</span>
                      <span style={{
                        ...styles.chevron,
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}>›</span>
                    </button>
                    {isExpanded && (
                      <ul style={styles.subList}>
                        {item.children!.map(child => (
                          <li key={child.path}>
                            <NavLink
                              to={child.path}
                              style={({ isActive }) => ({
                                ...styles.subItem,
                                ...(isActive ? styles.subItemActive : {}),
                              })}
                              onClick={mobile ? onClose : undefined}
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path!}
                    style={({ isActive }) => ({
                      ...styles.navItem,
                      ...(isActive ? styles.navItemActive : {}),
                    })}
                    onClick={mobile ? onClose : undefined}
                  >
                    <span style={styles.icon}>{item.icon}</span>
                    <span style={styles.label}>{item.label}</span>
                  </NavLink>
                )}
              </li>
            )
          })}
        </ul>

        <div style={styles.footer}>
          <button style={styles.feedbackBtn}>Give Feedback</button>
        </div>
      </nav>
    </>
  )
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.3)',
    zIndex: 99,
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: 200,
    background: '#fff',
    borderRight: '1px solid #e8e8e8',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 100,
    transition: 'transform 0.25s ease',
    overflowY: 'auto',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 14px',
    borderBottom: '1px solid #e8e8e8',
    flexShrink: 0,
  },
  logoMark: {
    width: 28,
    height: 28,
    background: '#111',
    color: '#fff',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 700,
    flexShrink: 0,
  },
  logoName: {
    fontSize: 12,
    fontWeight: 600,
    color: '#111',
    lineHeight: 1.3,
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: '8px 0',
    flex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    padding: '8px 14px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 13,
    color: '#333',
    textDecoration: 'none',
    textAlign: 'left',
    transition: 'background 0.15s',
    boxSizing: 'border-box',
  },
  navItemActive: {
    background: '#f0f0f0',
    fontWeight: 600,
    color: '#111',
  },
  icon: {
    fontSize: 15,
    width: 20,
    flexShrink: 0,
  },
  label: {
    flex: 1,
  },
  chevron: {
    fontSize: 16,
    color: '#aaa',
    display: 'inline-block',
    transition: 'transform 0.2s',
  },
  subList: {
    listStyle: 'none',
    margin: 0,
    padding: '2px 0 4px 42px',
  },
  subItem: {
    display: 'block',
    padding: '6px 8px',
    fontSize: 12,
    color: '#555',
    textDecoration: 'none',
    borderRadius: 4,
    transition: 'background 0.15s',
  },
  subItemActive: {
    color: '#111',
    fontWeight: 600,
    background: '#f0f0f0',
  },
  footer: {
    padding: '12px 14px',
    borderTop: '1px solid #e8e8e8',
    flexShrink: 0,
  },
  feedbackBtn: {
    background: 'none',
    border: 'none',
    fontSize: 12,
    color: '#888',
    cursor: 'pointer',
    padding: 0,
  },
}
