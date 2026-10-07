import Link from 'next/link'

/* ---------- Types & data ---------- */

type Status = 'not-started' | 'in-progress'

type Module = {
  name: string
  description: string
  href: string
  icon: string
  iconBg: string
  iconColor: string
  notes: number
  videos: number
  questions: number
  status: Status
  progress: number // 0–100
}

const MODULES: Module[] = [
  {
    name: 'SQL',
    description: 'Master SQL queries, joins, aggregations and window functions',
    href: '/learning/sql',
    icon: 'storage',
    iconBg: 'bg-[#dae2fd]',
    iconColor: 'text-[#00236f]',
    notes: 10,
    videos: 8,
    questions: 120,
    status: 'not-started',
    progress: 0,
  },
  {
    name: 'Excel',
    description: 'VLOOKUP, pivot tables, dashboards and data analysis',
    href: '/learning/excel',
    icon: 'table_chart',
    iconBg: 'bg-[#d8f3dc]',
    iconColor: 'text-[#004a31]',
    notes: 8,
    videos: 6,
    questions: 80,
    status: 'not-started',
    progress: 0,
  },
  {
    name: 'Python',
    description: 'Pandas, NumPy, data cleaning and exploratory analysis',
    href: '/learning/python',
    icon: 'code',
    iconBg: 'bg-[#fff3e0]',
    iconColor: 'text-[#e65100]',
    notes: 14,
    videos: 10,
    questions: 150,
    status: 'not-started',
    progress: 0,
  },
  {
    name: 'Power BI',
    description: 'DAX formulas, data modeling and interactive dashboards',
    href: '/learning/power-bi',
    icon: 'bar_chart',
    iconBg: 'bg-[#fce4ec]',
    iconColor: 'text-[#c2185b]',
    notes: 8,
    videos: 12,
    questions: 90,
    status: 'not-started',
    progress: 0,
  },
  {
    name: 'Statistics',
    description: 'Descriptive stats, probability, distributions and hypothesis testing',
    href: '/learning/statistics',
    icon: 'functions',
    iconBg: 'bg-[#ede7f6]',
    iconColor: 'text-[#6200ea]',
    notes: 6,
    videos: 8,
    questions: 100,
    status: 'not-started',
    progress: 0,
  },
  {
    name: 'AI for Analysts',
    description: 'ChatGPT, Copilot, prompt engineering and AI tools for data work',
    href: '/learning/ai-for-analysts',
    icon: 'psychology',
    iconBg: 'bg-[#e0f7fa]',
    iconColor: 'text-[#00838f]',
    notes: 4,
    videos: 6,
    questions: 60,
    status: 'not-started',
    progress: 0,
  },
]

const STATUS_BADGE: Record<Status, { label: string; className: string }> = {
  'not-started': { label: 'Not Started', className: 'bg-[#f2f3ff] text-[#757682]' },
  'in-progress': { label: 'In Progress', className: 'bg-[#dae2fd] text-[#0051d5]' },
}

// Static class lookup (10% steps) so widths stay Tailwind classes instead of inline styles.
const PROGRESS_WIDTHS = [
  'w-0',
  'w-[10%]',
  'w-[20%]',
  'w-[30%]',
  'w-[40%]',
  'w-[50%]',
  'w-[60%]',
  'w-[70%]',
  'w-[80%]',
  'w-[90%]',
  'w-full',
]

const PILLS = [
  { label: 'Notes', tab: 'notes' },
  { label: 'Videos', tab: 'videos' },
  { label: 'Practice', tab: 'practice' },
]

/* ---------- Components ---------- */

function Icon({ name, className = '' }: { name: string; className?: string }) {
  return (
    <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  )
}

function Meta({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="flex items-center gap-1 text-xs text-[#757682]">
      <Icon name={icon} className="text-[14px]" />
      {text}
    </span>
  )
}

function ModuleCard({ module }: { module: Module }) {
  const badge = STATUS_BADGE[module.status]
  const progress = Math.min(100, Math.max(0, Math.round(module.progress)))
  const widthClass = PROGRESS_WIDTHS[Math.round(progress / 10)]

  return (
    <div className="bg-white rounded-xl border border-[#e2e7ff] shadow-sm hover:shadow-md hover:border-[#0051d5]/30 transition-all overflow-hidden flex flex-col">
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${module.iconBg}`}
            >
              <Icon name={module.icon} className={module.iconColor} />
            </div>
            <h2 className="text-[#00236f] font-semibold text-base">{module.name}</h2>
          </div>
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${badge.className}`}
          >
            {badge.label}
          </span>
        </div>

        <p className="mt-2 text-xs text-[#444651]">{module.description}</p>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          <Meta icon="description" text={`${module.notes} notes`} />
          <Meta icon="play_circle" text={`${module.videos} videos`} />
          <Meta icon="quiz" text={`${module.questions} questions`} />
        </div>
      </div>

      <div className="px-5 pb-2 mt-auto">
        <p className="text-[10px] text-[#757682] mb-1">{progress}% complete</p>
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${module.name} progress`}
          className="w-full h-1.5 bg-[#e2e7ff] rounded-full"
        >
          <div className={`h-full bg-[#0051d5] rounded-full ${widthClass}`} />
        </div>
      </div>

      <div className="px-5 py-3 border-t border-[#e2e7ff] bg-[#faf8ff] flex items-center justify-between">
        <Link
          href={module.href}
          className="text-xs font-semibold text-[#0051d5] hover:text-[#00236f] cursor-pointer transition-colors"
        >
          {module.status === 'not-started' ? 'Start Learning →' : 'Continue →'}
        </Link>
        <div className="flex gap-2">
          {PILLS.map((pill) => (
            <Link
              key={pill.tab}
              href={`${module.href}?tab=${pill.tab}`}
              className="text-[10px] px-2 py-0.5 rounded-full bg-[#eaedff] text-[#00236f] cursor-pointer hover:bg-[#dae2fd] transition-colors"
            >
              {pill.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- Page ---------- */

export default function LearningPage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-[#00236f] font-bold text-[28px]">My Learning</h1>
        <p className="text-[#444651] text-sm mt-1">Data Analytics Track</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MODULES.map((module) => (
          <ModuleCard key={module.href} module={module} />
        ))}
      </div>

      <div className="mt-8 bg-[#00236f] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-white font-semibold text-base">Need help with any module?</p>
          <p className="text-[#90a8ff] text-sm mt-1">
            Book a 30-minute session with a verified expert tutor
          </p>
        </div>
        <Link
          href="/tutors"
          className="shrink-0 text-center bg-white text-[#00236f] font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#eaedff] transition-colors"
        >
          Find a Tutor →
        </Link>
      </div>
    </div>
  )
}
