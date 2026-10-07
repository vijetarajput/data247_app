'use client'

import { Fragment, useState } from 'react'
import Link from 'next/link'

/* ---------- Types & data ---------- */

type Difficulty = 'easy' | 'medium' | 'hard'

type Module = {
  slug: string
  name: string
  icon: string
  iconBg: string
  iconColor: string
  questions: number
  accuracy: number | null // null until the user has attempts
  attempted: number
  testsTaken: number
  cardsReviewed: number
}

const MODULES: Module[] = [
  {
    slug: 'sql',
    name: 'SQL',
    icon: 'storage',
    iconBg: 'bg-[#dae2fd]',
    iconColor: 'text-[#00236f]',
    questions: 120,
    accuracy: null,
    attempted: 0,
    testsTaken: 0,
    cardsReviewed: 0,
  },
  {
    slug: 'excel',
    name: 'Excel',
    icon: 'table_chart',
    iconBg: 'bg-[#d8f3dc]',
    iconColor: 'text-[#004a31]',
    questions: 80,
    accuracy: null,
    attempted: 0,
    testsTaken: 0,
    cardsReviewed: 0,
  },
  {
    slug: 'python',
    name: 'Python',
    icon: 'code',
    iconBg: 'bg-[#fff3e0]',
    iconColor: 'text-[#e65100]',
    questions: 150,
    accuracy: null,
    attempted: 0,
    testsTaken: 0,
    cardsReviewed: 0,
  },
  {
    slug: 'power-bi',
    name: 'Power BI',
    icon: 'bar_chart',
    iconBg: 'bg-[#fce4ec]',
    iconColor: 'text-[#c2185b]',
    questions: 90,
    accuracy: null,
    attempted: 0,
    testsTaken: 0,
    cardsReviewed: 0,
  },
  {
    slug: 'statistics',
    name: 'Statistics',
    icon: 'functions',
    iconBg: 'bg-[#ede7f6]',
    iconColor: 'text-[#6200ea]',
    questions: 100,
    accuracy: null,
    attempted: 0,
    testsTaken: 0,
    cardsReviewed: 0,
  },
  {
    slug: 'ai-for-analysts',
    name: 'AI for Analysts',
    icon: 'psychology',
    iconBg: 'bg-[#e0f7fa]',
    iconColor: 'text-[#00838f]',
    questions: 60,
    accuracy: null,
    attempted: 0,
    testsTaken: 0,
    cardsReviewed: 0,
  },
]

const DIFFICULTIES: { value: Difficulty; label: string; base: string; selected: string }[] = [
  {
    value: 'easy',
    label: 'Easy',
    base: 'bg-[#d8f3dc] text-[#004a31]',
    selected: 'bg-[#b7e4c0] text-[#004a31] font-semibold',
  },
  {
    value: 'medium',
    label: 'Medium',
    base: 'bg-[#fff3e0] text-[#e65100]',
    selected: 'bg-[#ffe0b2] text-[#e65100] font-semibold',
  },
  {
    value: 'hard',
    label: 'Hard',
    base: 'bg-[#fce4ec] text-[#c2185b]',
    selected: 'bg-[#f8bbd0] text-[#c2185b] font-semibold',
  },
]

const CARD_CLASS =
  'relative bg-white rounded-xl p-4 border border-[#e2e7ff] shadow-sm hover:shadow-md hover:border-[#0051d5]/30 transition-all cursor-pointer flex flex-col'

// Stretches the link over the whole card without nesting anchors inside the card.
const CARD_LINK_CLASS = 'text-xs font-semibold text-[#0051d5] after:absolute after:inset-0'

/* ---------- Components ---------- */

function Icon({ name, className = '' }: { name: string; className?: string }) {
  return (
    <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  )
}

function CardIcon({ name, bg, color }: { name: string; bg: string; color: string }) {
  return (
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${bg}`}>
      <Icon name={name} className={`${color} text-[18px]`} />
    </div>
  )
}

function ModuleSection({ module }: { module: Module }) {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const base = `/practice/${module.slug}`

  return (
    <section>
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${module.iconBg}`}
          >
            <Icon name={module.icon} className={module.iconColor} />
          </div>
          <h2 className="text-[#00236f] font-semibold text-base">{module.name}</h2>
          <span className="bg-[#eaedff] text-[#0051d5] text-[10px] font-semibold px-2 py-0.5 rounded-full">
            {module.questions} questions
          </span>
        </div>
        <p className="text-xs text-[#757682] whitespace-nowrap">
          {module.accuracy === null ? '--' : module.accuracy}% accuracy
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* MCQ practice */}
        <div className={CARD_CLASS}>
          <div className="flex justify-between items-start">
            <CardIcon name="quiz" bg="bg-[#eaedff]" color="text-[#0051d5]" />
            <div className="flex gap-1 relative z-10" role="group" aria-label="Difficulty">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  aria-pressed={difficulty === d.value}
                  onClick={() => setDifficulty(d.value)}
                  className={`text-[10px] px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                    difficulty === d.value ? d.selected : d.base
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
          <h3 className="text-sm font-semibold text-[#131b2e] mt-3">MCQ Practice</h3>
          <p className="text-xs text-[#444651] mt-0.5">
            Practice questions one by one with explanations
          </p>
          <div className="mt-3 flex justify-between items-center">
            <Link href={`${base}?difficulty=${difficulty}`} className={CARD_LINK_CLASS}>
              Start →
            </Link>
            <span className="text-[10px] text-[#757682]">{module.attempted} attempted</span>
          </div>
        </div>

        {/* Take a test */}
        <div className={CARD_CLASS}>
          <CardIcon name="assignment" bg="bg-[#dae2fd]" color="text-[#00236f]" />
          <h3 className="text-sm font-semibold text-[#131b2e] mt-3">Take a Test</h3>
          <p className="text-xs text-[#444651] mt-0.5">
            10 random questions — timed test with full results
          </p>
          <div className="mt-3 flex justify-between items-center">
            <Link href={`${base}/test`} className={CARD_LINK_CLASS}>
              Start Test →
            </Link>
            <span className="text-[10px] text-[#757682]">{module.testsTaken} tests taken</span>
          </div>
        </div>

        {/* Flashcards */}
        <div className={CARD_CLASS}>
          <CardIcon name="style" bg="bg-[#fff3e0]" color="text-[#e65100]" />
          <h3 className="text-sm font-semibold text-[#131b2e] mt-3">Flashcards</h3>
          <p className="text-xs text-[#444651] mt-0.5">
            Flip cards to memorise key concepts and terms
          </p>
          <div className="mt-3 flex justify-between items-center">
            <Link href={`${base}/flashcards`} className={CARD_LINK_CLASS}>
              Study →
            </Link>
            <span className="text-[10px] text-[#757682]">
              {module.cardsReviewed} cards reviewed
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Page ---------- */

export default function PracticePage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-[#00236f] font-bold text-[28px]">Practice</h1>
        <p className="text-[#444651] text-sm mt-1">
          Test your knowledge with module-specific MCQs
        </p>
      </div>

      <div className="space-y-6">
        {MODULES.map((module, i) => (
          <Fragment key={module.slug}>
            <ModuleSection module={module} />
            {i < MODULES.length - 1 && <hr className="border-[#e2e7ff] my-2" />}
          </Fragment>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-[#00236f] to-[#0051d5] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-white font-semibold text-base">Ready for a full mock test?</p>
          <p className="text-[#90a8ff] text-sm mt-1">
            Take a comprehensive test across all modules
          </p>
        </div>
        <Link
          href="/practice/full-test"
          className="shrink-0 text-center bg-white text-[#00236f] font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#eaedff] transition-colors"
        >
          Start Full Test →
        </Link>
      </div>
    </div>
  )
}
