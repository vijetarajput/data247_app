'use client'

import { useEffect, useState } from 'react'

/* ---------- Helpers ---------- */

function Icon({
  name,
  className = '',
  filled = false,
}: {
  name: string
  className?: string
  filled?: boolean
}) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${
        filled ? "[font-variation-settings:'FILL'_1]" : ''
      } ${className}`}
    >
      {name}
    </span>
  )
}

function useCountUp(target: number, duration = 1500) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])

  return value
}

function Logo({ textClassName = 'text-[#00236f]' }: { textClassName?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-[#00236f] w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm">
        D
      </div>
      <span className={`${textClassName} font-bold text-lg`}>DATA247</span>
    </div>
  )
}

/* ---------- Data ---------- */

const NAV_LINKS = ['Home', 'Learning', 'Practice', 'Interview Prep', 'Tutors']

const VALUE_CHIPS = [
  { icon: 'translate', label: 'English + Hinglish Notes' },
  { icon: 'play_circle', label: 'Recorded Video Lectures' },
  { icon: 'folder_zip', label: 'Downloadable Resources' },
  { icon: 'quiz', label: 'MCQ Practice Resources' },
  { icon: 'work_history', label: 'Interview Preparation' },
  { icon: 'person_check', label: '1:1 Human Tutors' },
]

type Stat =
  | { kind: 'count'; value: number; suffix: string; label: string }
  | { kind: 'static'; text: string; label: string }

const STATS: Stat[] = [
  { kind: 'count', value: 500, suffix: '+', label: 'Questions' },
  { kind: 'count', value: 6, suffix: '', label: 'Modules' },
  { kind: 'static', text: 'Free', label: 'Study Notes' },
  { kind: 'static', text: '₹0', label: 'Cost to Start' },
]

const PRICING_POINTS = [
  'Full curriculum access (SQL, Python, Power BI, Statistics)',
  'Bilingual English + Hinglish Notes',
  'Topic & module-based MCQ practice',
  'HR, Behavioural & Technical interview vaults',
]

const PRICING_ROWS = [
  { label: 'Data Analytics & Science Curriculum:', value: 'Included', included: true },
  { label: 'English & Hinglish Notes:', value: 'Included', included: true },
  { label: 'Recorded Videos & MCQ Resources:', value: 'Included', included: true },
  { label: 'Interview Preparation Vaults:', value: 'Included', included: true },
  { label: '1:1 Tutor Sessions:', value: 'Booked Separately', included: false },
]

const PILLARS = [
  {
    num: '01',
    icon: 'menu_book',
    title: 'Learn',
    body: 'Bilingual study notes (English + Hinglish), recorded lectures, and downloadable resources across all modules.',
  },
  {
    num: '02',
    icon: 'terminal',
    title: 'Practice',
    body: 'Module-specific MCQ practice banks with detailed answer explanations and progress tracking.',
  },
  {
    num: '03',
    icon: 'quiz',
    title: 'Interview Prep',
    body: 'HR, Technical, Behavioural, and Managerial interview vaults curated by industry professionals.',
  },
  {
    num: '04',
    icon: 'group',
    title: 'Tutors',
    body: 'Book verified Data Analysts and Scientists for personalised 1:1 sessions tailored to your needs.',
  },
]

const STEPS = [
  {
    num: '1',
    title: 'Enroll Free',
    body: 'Create your account and get instant access to the full DATA247 curriculum.',
  },
  {
    num: '2',
    title: 'Learn & Practice',
    body: 'Study bilingual notes, watch lectures, and practice MCQs at your own pace.',
  },
  {
    num: '3',
    title: 'Get Job-Ready',
    body: 'Complete interview prep vaults and book 1:1 sessions with verified industry tutors.',
  },
]

const FOOTER_LINKS = ['Privacy Policy', 'Terms of Service', 'Admin Login']

/* ---------- Sections ---------- */

function JoinButton({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      className={`bg-[#00236f] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1e3a8a] transition-colors whitespace-nowrap ${className}`}
    >
      Join DATA247 — <s className="text-xs opacity-70">₹999</s> ₹0
    </button>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#c5c5d3]/30 shadow-sm">
      <nav className="h-16 max-w-7xl mx-auto px-4 md:px-6 lg:px-10 flex items-center justify-between">
        <a href="#" aria-label="DATA247 home">
          <Logo />
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              className={
                i === 0
                  ? 'px-3 py-1 text-sm font-medium bg-[#dae2fd] text-[#00236f] rounded-lg'
                  : 'px-3 py-1 text-sm font-medium text-[#444651] hover:text-[#131b2e] transition-colors'
              }
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <JoinButton />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-[#444651] hover:bg-[#eaedff] transition-colors"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden border-t border-[#c5c5d3]/30 bg-[#faf8ff] px-4 md:px-6 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              className={
                i === 0
                  ? 'px-3 py-2 text-sm font-medium bg-[#dae2fd] text-[#00236f] rounded-lg'
                  : 'px-3 py-2 text-sm font-medium text-[#444651] hover:text-[#131b2e] transition-colors'
              }
            >
              {link}
            </a>
          ))}
          <a
            href="#"
            className="px-3 py-2 text-sm text-[#444651] hover:text-[#131b2e] transition-colors"
          >
            Login
          </a>
        </div>
      )}
    </header>
  )
}

function VideoPlaceholder() {
  return (
    <div className="rounded-xl overflow-hidden shadow-xl border border-[#e2e7ff] bg-[#131b2e] aspect-video w-full relative">
      <div className="bg-[#131b2e] w-full h-full" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Play video: What is DATA247?"
          className="w-16 h-16 rounded-full bg-[#00236f]/80 backdrop-blur flex items-center justify-center cursor-pointer hover:bg-[#00236f] transition-colors border-2 border-white/20"
        >
          <Icon name="play_arrow" filled className="text-white text-[36px]" />
        </button>
        <div className="text-center">
          <p className="text-white/80 text-sm font-medium">Watch — What is DATA247?</p>
          <p className="text-white/50 text-xs">2 min overview</p>
        </div>
      </div>

      <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
        <span className="w-2 h-2 rounded-full bg-red-500" />
        <span className="text-white text-xs font-medium">DATA247 Overview</span>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#faf8ff] via-[#f2f3ff]/40 to-[#faf8ff]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#e2e7ff] text-[#00236f] text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-[#0051d5] animate-pulse" />
            Practical Data Career Preparation
          </div>

          <div className="space-y-2">
            <h1 className="text-[48px] leading-[56px] tracking-tight font-bold text-[#00236f] font-[Plus_Jakarta_Sans]">
              Learn. Practice. Prepare.
              <span className="block text-[#0051d5]">Get Career-Ready.</span>
            </h1>
          </div>

          <p className="text-[#444651] text-base leading-6 max-w-2xl">
            A practical, no-fluff career-learning platform built specifically for Data Analytics
            and Data Science students, freshers, and career switchers. Master industry tools at
            your pace.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
            {VALUE_CHIPS.map((chip) => (
              <div
                key={chip.label}
                className="flex items-center gap-2 p-2 rounded-lg bg-white shadow-sm border border-[#e2e7ff]"
              >
                <Icon name={chip.icon} className="text-[#0051d5] text-[20px]" />
                <span className="text-xs font-medium text-[#131b2e]">{chip.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#00236f] text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-sm hover:bg-[#1e3a8a] transition-all"
            >
              Start Learning
              <Icon name="arrow_forward" className="text-[18px]" />
            </a>
            <a
              href="#"
              className="inline-flex items-center bg-white text-[#00236f] font-semibold text-sm px-5 py-3 rounded-lg shadow-sm border border-[#e2e7ff] hover:bg-[#f2f3ff] transition-colors"
            >
              Explore DATA247
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-[#444651] text-xs">
            <span className="flex items-center gap-1">
              <Icon name="verified" filled className="text-[#004a31] text-[16px]" />
              <span>
                <s>₹999</s> ₹0 for first 2 months
              </span>
            </span>
            <span className="text-[#c5c5d3]">•</span>
            <span className="flex items-center gap-1">
              <Icon name="check_circle" filled className="text-[#004a31] text-[16px]" />
              100% human mentorship
            </span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <VideoPlaceholder />
        </div>
      </div>
    </section>
  )
}

function StatItem({ stat }: { stat: Stat }) {
  const target = stat.kind === 'count' ? stat.value : 0
  const count = useCountUp(target)

  return (
    <div className="text-center">
      <p className="text-[#0051d5] font-bold text-2xl">
        {stat.kind === 'count' ? `${count}${stat.suffix}` : stat.text}
      </p>
      <p className="text-[#444651] text-xs mt-1">{stat.label}</p>
    </div>
  )
}

function StatsBar() {
  return (
    <div className="-mt-4 relative z-10 max-w-5xl mx-auto px-4 md:px-6 lg:px-10">
      <div className="bg-white rounded-xl shadow-md border border-[#e2e7ff] py-5 px-8">
        <div className="grid grid-cols-2 gap-y-6 sm:flex sm:items-center sm:justify-between">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="contents sm:flex sm:flex-1 sm:items-center">
              {i > 0 && <div className="hidden sm:block w-px bg-[#e2e7ff] self-stretch mx-2" />}
              <div className="sm:flex-1">
                <StatItem stat={stat} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Pricing() {
  return (
    <section className="py-16 bg-[#faf8ff]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-10">
        <div className="bg-white rounded-xl p-8 md:p-12 shadow-md border border-[#e2e7ff]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-[#0051d5] text-xs font-semibold uppercase tracking-wider">
                Clear &amp; Transparent Pricing
              </p>
              <h2 className="text-[#00236f] font-bold text-[36px] leading-[44px] tracking-tight">
                Why spend ₹30,000–₹50,000+ on a traditional course?
              </h2>
              <p className="text-[#444651] text-base">
                Most expensive bootcamps repackage standard concepts and overcharge. DATA247 gives
                you essential resources, verified bilingual notes, and authentic interview vaults
                in one affordable platform.
              </p>
              <ul className="space-y-2">
                {PRICING_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <Icon name="check_circle" filled className="text-[#004a31] text-[20px]" />
                    <span className="text-sm text-[#131b2e]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#eaedff] rounded-xl p-6 flex flex-col items-center text-center space-y-4">
                <span className="bg-[#dae2fd] text-[#00236f] text-xs font-semibold px-4 py-1 rounded-full">
                  DATA247 Core Access
                </span>

                <div>
                  <div className="flex items-baseline justify-center gap-2">
                    <s className="text-[#757682] text-xl">₹999</s>
                    <span className="text-[#00236f] font-bold text-[48px] leading-[56px]">₹0</span>
                    <span className="text-[#444651] text-sm">/ first 2 months</span>
                  </div>
                  <p className="text-xs text-[#444651] mt-1">
                    Single upfront payment • No monthly recurring fees
                  </p>
                </div>

                <div className="w-full space-y-2 text-left">
                  {PRICING_ROWS.map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between gap-2 py-2 bg-white/60 px-3 rounded text-xs"
                    >
                      <span className="text-[#131b2e]">{row.label}</span>
                      <span
                        className={`font-semibold text-right ${
                          row.included ? 'text-[#00236f]' : 'text-[#0051d5]'
                        }`}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="w-full bg-[#00236f] text-white text-sm font-semibold py-3 rounded-lg hover:bg-[#1e3a8a] transition-colors text-center"
                >
                  Join DATA247 — ₹0
                </button>
                <p className="text-xs text-[#444651]">
                  Instant access immediately after enrollment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pillars() {
  return (
    <section className="py-16 bg-[#f2f3ff]/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 space-y-8">
        <div className="space-y-2">
          <p className="text-[#0051d5] text-xs font-semibold uppercase tracking-wider">
            Structured Platform
          </p>
          <h2 className="text-[#00236f] font-bold text-[28px]">
            Everything needed to transition into Data.
          </h2>
          <p className="text-[#444651] text-sm">
            Built as an integrated progression: study the core logic, test your recall, prepare
            your interview scenarios, and consult real tutors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.num}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-[#e2e7ff] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#444651] bg-[#eaedff] px-2 py-0.5 rounded">
                    {pillar.num}
                  </span>
                  <Icon name={pillar.icon} className="text-[#0051d5] text-[28px]" />
                </div>
                <h3 className="font-semibold text-[#00236f] text-base">{pillar.title}</h3>
                <p className="text-xs text-[#444651]">{pillar.body}</p>
              </div>
              <a
                href="#"
                className="text-xs text-[#0051d5] font-medium hover:underline transition-colors"
              >
                Explore →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section className="py-16 bg-[#faf8ff]">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-10 text-center space-y-12">
        <div className="space-y-2">
          <p className="text-[#0051d5] text-xs font-semibold uppercase tracking-wider">
            Simple Process
          </p>
          <h2 className="text-[#00236f] font-bold text-[28px]">
            From zero to job-ready in 3 steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="absolute top-8 left-1/4 right-1/4 h-px bg-[#e2e7ff] hidden md:block" />
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="relative flex flex-col items-center text-center space-y-3"
            >
              <div className="w-16 h-16 rounded-full bg-[#00236f] text-white flex items-center justify-center font-bold text-xl">
                {step.num}
              </div>
              <h3 className="font-semibold text-[#00236f] text-base">{step.title}</h3>
              <p className="text-xs text-[#444651] max-w-[200px]">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#131b2e] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo textClassName="text-white" />
            <p className="text-sm text-[#90a8ff] mt-2">
              Free data career preparation for every Indian learner.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-[#444651] uppercase tracking-wider mb-3">
              Links
            </p>
            <ul className="text-sm text-[#90a8ff] space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-[#444651] uppercase tracking-wider mb-3">
              Contact
            </p>
            <p className="text-sm text-[#90a8ff]">data247official@gmail.com</p>
          </div>
        </div>

        <div className="border-t border-[#283044] mt-8 pt-6">
          <p className="text-xs text-[#444651] text-center">
            © 2026 DATA247. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ---------- Page ---------- */

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Pricing />
        <Pillars />
        <HowItWorks />
      </main>
      <Footer />
    </>
  )
}
