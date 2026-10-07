'use client'

import Link from 'next/link'

/* ---------- Data ---------- */

const STATS = [
  {
    label: 'Questions Practiced',
    icon: 'quiz',
    iconBg: 'bg-[#eaedff]',
    iconColor: 'text-[#0051d5]',
    value: '0',
    subtext: 'Keep practicing!',
  },
  {
    label: 'Study Streak',
    icon: 'local_fire_department',
    iconBg: 'bg-[#fff3e0]',
    iconColor: 'text-[#e65100]',
    value: '0 days',
    subtext: 'Start your streak today',
  },
  {
    label: 'Modules Completed',
    icon: 'check_circle',
    iconBg: 'bg-[#d8f3dc]',
    iconColor: 'text-[#004a31]',
    value: '0/6',
    subtext: 'Data Analytics track',
  },
]

const QUICK_ACCESS = [
  {
    icon: 'menu_book',
    iconBg: 'bg-[#dae2fd]',
    iconColor: 'text-[#00236f]',
    title: 'Notes & Videos',
    subtitle: 'Study materials',
    href: '/learning',
  },
  {
    icon: 'terminal',
    iconBg: 'bg-[#d8f3dc]',
    iconColor: 'text-[#004a31]',
    title: 'Practice MCQs',
    subtitle: '500+ questions',
    href: '/practice',
  },
  {
    icon: 'quiz',
    iconBg: 'bg-[#fff3e0]',
    iconColor: 'text-[#e65100]',
    title: 'Interview Prep',
    subtitle: 'HR & Technical',
    href: '/interview-prep',
  },
  {
    icon: 'group',
    iconBg: 'bg-[#ede7f6]',
    iconColor: 'text-[#6200ea]',
    title: 'Find a Tutor',
    subtitle: 'Book a session',
    href: '/tutors',
  },
]

/* ---------- Components ---------- */

function Icon({ name, className = '' }: { name: string; className?: string }) {
  return (
    <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  )
}

/* ---------- Page ---------- */

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl space-y-8">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-[#00236f] font-bold text-[28px]">Welcome back, Alex 👋</h1>
          <p className="text-[#444651] text-sm mt-1">Continue your Data Analytics preparation</p>
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="w-9 h-9 shrink-0 rounded-lg border border-[#e2e7ff] bg-white flex items-center justify-center hover:bg-[#f2f3ff] cursor-pointer transition-colors"
        >
          <Icon name="notifications" className="text-[#444651] text-[20px]" />
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-4 border border-[#e2e7ff] shadow-sm"
          >
            <div className="flex justify-between items-start">
              <p className="text-xs text-[#444651] font-medium">{stat.label}</p>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.iconBg}`}
              >
                <Icon name={stat.icon} className={`${stat.iconColor} text-[18px]`} />
              </div>
            </div>
            <p className="text-[#00236f] font-bold text-[28px] mt-2">{stat.value}</p>
            <p className="text-xs text-[#757682] mt-0.5">{stat.subtext}</p>
          </div>
        ))}
      </div>

      {/* Continue learning */}
      <section>
        <h2 className="text-[#131b2e] font-semibold text-base mb-3">Continue Learning</h2>
        <div className="bg-white rounded-xl p-5 border border-[#e2e7ff] shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-[#dae2fd] flex items-center justify-center">
            <Icon name="storage" className="text-[#00236f] text-[26px]" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[#00236f] font-semibold text-sm">SQL — Structured Query Language</p>
            <p className="text-xs text-[#444651] mt-0.5">
              Start with the most in-demand data skill
            </p>
            <div className="mt-3 w-full h-1.5 bg-[#e2e7ff] rounded-full">
              <div className="h-full w-0 bg-[#0051d5] rounded-full" />
            </div>
            <p className="text-xs text-[#757682] mt-1">0% complete</p>
          </div>

          <Link
            href="/learning"
            className="shrink-0 bg-[#00236f] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#1e3a8a] transition-colors"
          >
            Continue →
          </Link>
        </div>
      </section>

      {/* Quick access */}
      <section>
        <h2 className="text-[#131b2e] font-semibold text-base mb-3">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {QUICK_ACCESS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="bg-white rounded-xl p-5 border border-[#e2e7ff] shadow-sm hover:shadow-md hover:border-[#0051d5]/30 transition-all cursor-pointer flex flex-col gap-3"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.iconBg}`}
              >
                <Icon name={item.icon} className={`${item.iconColor} text-[22px]`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#131b2e]">{item.title}</p>
                <p className="text-xs text-[#444651]">{item.subtitle}</p>
              </div>
              <span className="text-[#0051d5] text-xs font-medium mt-auto">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section>
        <h2 className="text-[#131b2e] font-semibold text-base mb-3">Recent Activity</h2>
        <div className="bg-white rounded-xl p-8 border border-[#e2e7ff] text-center flex flex-col items-center">
          <Icon name="history" className="text-[#c5c5d3] text-[40px]" />
          <p className="text-[#444651] text-sm font-medium mt-2">No activity yet</p>
          <p className="text-xs text-[#757682] mt-1">Start practicing to see your progress here</p>
          <Link
            href="/practice"
            className="bg-[#00236f] text-white text-xs font-semibold px-4 py-2 rounded-lg mt-4 hover:bg-[#1e3a8a] transition-colors"
          >
            Start Practicing →
          </Link>
        </div>
      </section>
    </div>
  )
}
