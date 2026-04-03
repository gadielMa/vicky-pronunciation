import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

const SIDEBAR_WIDTH = 200
const TOPBAR_HEIGHT = 52
const MOBILE_BREAKPOINT = 768

export function AppLayout() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < MOBILE_BREAKPOINT
  )
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT
      setIsMobile(mobile)
      if (!mobile) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const sidebarOpen = isMobile ? mobileOpen : true

  return (
    <div style={styles.root}>
      <TopBar
        showHamburger={isMobile}
        onMenuClick={() => setMobileOpen(prev => !prev)}
        menuOpen={mobileOpen}
      />
      <Sidebar
        open={sidebarOpen}
        mobile={isMobile}
        onClose={() => setMobileOpen(false)}
      />
      <main
        style={{
          ...styles.main,
          marginLeft: isMobile ? 0 : SIDEBAR_WIDTH,
          paddingTop: TOPBAR_HEIGHT,
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: '100vh',
    background: '#f7f7f7',
  },
  main: {
    minHeight: '100vh',
  },
}
