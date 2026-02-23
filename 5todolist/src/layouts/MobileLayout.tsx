import { NavLink, Outlet, useLocation } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  Archive,
  ArrowUpCircle,
  CalendarDays,
  Menu,
  UserCircle2,
} from 'lucide-react'

const navItems = [
  { to: '/home', label: 'Home', icon: Menu },
  { to: '/schedule', label: '일정', icon: CalendarDays },
  { to: '/compose', label: '등록', icon: ArrowUpCircle, isCenter: true },
  { to: '/archive', label: '보관함', icon: Archive },
  { to: '/login', label: 'MY', icon: UserCircle2 },
]

function NavItemIcon({ Icon, center }: { Icon: LucideIcon; center?: boolean }) {
  return <Icon size={center ? 26 : 19} strokeWidth={center ? 2.2 : 1.9} />
}

export function MobileLayout() {
  const { pathname } = useLocation()
  const isSplash = pathname === '/splash'

  return (
    <div className="mobile-shell">
      <main className={isSplash ? 'mobile-main splash-main' : 'mobile-main'}>
        <Outlet />
      </main>
      {isSplash ? null : (
        <nav className="mobile-nav" aria-label="하단 네비게이션">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              aria-label={`${item.label} 화면으로 이동`}
              className={({ isActive }) =>
                `mobile-nav-item${item.isCenter ? ' mobile-nav-item-center' : ''}${isActive ? ' is-active' : ''}`
              }
            >
              <span className="mobile-nav-icon">
                <NavItemIcon Icon={item.icon} center={item.isCenter} />
              </span>
              <span className="mobile-nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  )
}
