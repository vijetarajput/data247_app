'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

/* ---------- Data ---------- */

// TODO: Replace placeholder with the real user's name once auth is re-enabled.
const USER_NAME = 'Alex'

const NAV_ITEMS = [
  { icon: 'space_dashboard', label: 'Dashboard', href: '/dashboard' },
  { icon: 'school', label: 'Learning', href: '/learning' },
  { icon: 'terminal', label: 'Practice', href: '/practice' },
  { icon: 'quiz', label: 'Interview Prep', href: '/interview-prep' },
  { icon: 'group', label: 'Tutors', href: '/tutors' },
]

const BOTTOM_ITEMS = [
  { icon: 'help_outline', label: 'Help & Support', href: '/help' },
  { icon: 'settings', label: 'Settings', href: '/settings' },
]

/* ---------- Components ---------- */

function Icon({ name, className = '' }: { name: string; className?: string }) {
  return (
    <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  )
}

function NavLink({
  icon,
  label,
  href,
  pathname,
  onNavigate,
}: {
  icon: string
  label: string
  href: string
  pathname: string
  onNavigate?: () => void
}) {
  const active = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all text-sm font-medium ${
        active
          ? 'bg-[#eaedff] text-[#00236f]'
          : 'text-[#444651] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
      }`}
    >
      <Icon name={icon} className="text-[22px]" />
      {label}
    </Link>
  )
}

function Logo() {
  return (
    <div className="flex items-center">
      <div className="w-8 h-8 rounded-lg bg-[#00236f] flex items-center justify-center">
        <span className="text-white font-bold">D</span>
      </div>
      <span className="text-[#00236f] font-bold text-base ml-2">DATA247</span>
    </div>
  )
}

function SidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <>
      <div className="p-5 border-b border-[#e2e7ff]">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1" aria-label="Main">
        <p className="text-[10px] font-semibold text-[#757682] uppercase tracking-wider px-3 mb-2">
          Core Navigation
        </p>
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} {...item} pathname={pathname} onNavigate={onNavigate} />
        ))}
      </nav>

      <div className="p-3 border-t border-[#e2e7ff] space-y-1">
        {BOTTOM_ITEMS.map((item) => (
          <NavLink key={item.href} {...item} pathname={pathname} onNavigate={onNavigate} />
        ))}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#f2f3ff] cursor-pointer transition-all">
          <div className="w-8 h-8 rounded-full bg-[#dae2fd] flex items-center justify-center text-[#00236f] font-bold text-xs">
            {USER_NAME.charAt(0).toUpperCase() || 'U'}
          </div>
          <span className="text-sm font-medium text-[#131b2e]">{USER_NAME}</span>
          <Icon name="chevron_right" className="text-[#757682] text-[18px] ml-auto" />
        </div>
      </div>
    </>
  )
}

/* ---------- Layout ---------- */

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  // Auth protection: must be signed in and have completed onboarding.
  useEffect(() => {
    let cancelled = false

    async function checkAccess() {
      try {
        const supabase = createClient()
        const { data } = await supabase.auth.getUser()

        if (!data.user) {
          router.replace('/login')
          return
        }

        const { data: profile, error } = await supabase
          .from('users')
          .select('id')
          .eq('id', data.user.id)
          .maybeSingle()

        if (error) {
          router.replace('/login')
          return
        }

        if (!profile) {
          router.replace('/onboarding')
          return
        }

        if (!cancelled) setIsChecking(false)
      } catch {
        router.replace('/login')
      }
    }

    checkAccess()
    return () => {
      cancelled = true
    }
  }, [router])

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  if (isChecking) {
    return (
      <div className="h-screen bg-[#faf8ff] flex items-center justify-center">
        <span
          role="status"
          aria-label="Loading"
          className="animate-spin border-2 border-[#0051d5] border-t-transparent rounded-full w-6 h-6"
        />
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#faf8ff]">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 bg-white border-r border-[#e2e7ff] flex-col h-full">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <aside className="w-64 shrink-0 bg-white border-r border-[#e2e7ff] flex flex-col h-full shadow-xl">
            <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </aside>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="flex-1 bg-black/40"
          />
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden h-14 shrink-0 bg-white border-b border-[#e2e7ff] px-4 flex items-center justify-between">
          <Logo />
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-[#444651] hover:bg-[#f2f3ff] transition-colors"
          >
            <Icon name="menu" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
