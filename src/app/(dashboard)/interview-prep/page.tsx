'use client'

import { useState } from 'react'
import Link from 'next/link'

/* ---------- Types & data ---------- */

type Course = 'data-analytics' | 'data-science'

const COURSE_TABS: { value: Course; label: string; comingSoon?: boolean }[] = [
  { value: 'data-analytics', label: 'Data Analytics' },
  { value: 'data-science', label: 'Data Science', comingSoon: true },
]

const CATEGORIES = [
  {
    slug: 'hr',
    title: 'HR Round',
    description:
      'Personal introduction, career goals, strengths, weaknesses and company fit questions',
    icon: 'record_voice_over',
    iconBg: 'bg-[#dae2fd]',
    iconColor: 'text-[#00236f]',
    questions: 25,
  },
  {
    slug: 'technical',
    title: 'Technical Round',
    description: 'SQL queries, Python problems, statistics concepts and tool-specific questions',
    icon: 'terminal',
    iconBg: 'bg-[#d8f3dc]',
    iconColor: 'text-[#004a31]',
    questions: 25,
  },
  {
    slug: 'behavioural',
    title: 'Behavioural Round',
    description:
      'Situational questions using STAR method — teamwork, conflict, leadership scenarios',
    icon: 'psychology',
    iconBg: 'bg-[#fff3e0]',
    iconColor: 'text-[#e65100]',
    questions: 25,
  },
  {
    slug: 'managerial',
    title: 'Managerial Round',
    description: 'Strategic thinking, stakeholder management and senior-level scenario questions',
    icon: 'manage_accounts',
    iconBg: 'bg-[#ede7f6]',
    iconColor: 'text-[#6200ea]',
    questions: 25,
  },
]

const TIPS = [
  {
    icon: 'lightbulb',
    title: 'Use the STAR Method',
    body: 'Structure answers as Situation, Task, Action, Result for behavioural questions.',
  },
  {
    icon: 'access_time',
    title: 'Keep Answers Concise',
    body: 'Aim for 2-3 minute answers. Practice out loud to stay within time.',
  },
  {
    icon: 'question_answer',
    title: 'Ask Good Questions',
    body: 'Prepare 2-3 thoughtful questions to ask your interviewer at the end.',
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

export default function InterviewPrepPage() {
  const [activeCourse, setActiveCourse] = useState<Course>('data-analytics')

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-[#00236f] font-bold text-[28px]">Interview Prep</h1>
        <p className="text-[#444651] text-sm mt-1">
          Prepare for every round with curated questions and sample answers
        </p>
      </div>

      {/* Course filter */}
      <div role="tablist" aria-label="Course" className="flex flex-wrap gap-2 mb-6">
        {COURSE_TABS.map((tab) => {
          const active = activeCourse === tab.value
          const disabled = !!tab.comingSoon
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={active}
              aria-disabled={disabled}
              disabled={disabled}
              onClick={() => setActiveCourse(tab.value)}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                active
                  ? 'bg-[#00236f] text-white cursor-pointer'
                  : 'bg-white border border-[#e2e7ff] text-[#444651] cursor-pointer'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {tab.label}
              {tab.comingSoon && (
                <span className="text-[10px] bg-[#e2e7ff] text-[#757682] px-2 py-0.5 rounded-full font-medium">
                  Coming Soon
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/interview-prep/${category.slug}`}
            className="block bg-white rounded-xl p-6 border border-[#e2e7ff] shadow-sm hover:shadow-md hover:border-[#0051d5]/30 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${category.iconBg}`}
              >
                <Icon name={category.icon} className={`${category.iconColor} text-[24px]`} />
              </div>
              <span className="bg-[#eaedff] text-[#0051d5] text-xs font-semibold px-2 py-0.5 rounded-full">
                {category.questions} questions
              </span>
            </div>
            <h2 className="mt-4 font-semibold text-[#00236f] text-base">{category.title}</h2>
            <p className="text-xs text-[#444651] mt-1 leading-5">{category.description}</p>
            <p className="text-xs font-semibold text-[#0051d5] mt-4">Explore →</p>
          </Link>
        ))}
      </div>

      {/* Tips */}
      <section className="mb-8">
        <h2 className="text-[#131b2e] font-semibold text-base mb-3">Interview Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TIPS.map((tip) => (
            <div
              key={tip.title}
              className="bg-[#f2f3ff] rounded-xl p-4 border border-[#e2e7ff]"
            >
              <Icon name={tip.icon} className="text-[#0051d5] text-[20px]" />
              <h3 className="text-sm font-semibold text-[#00236f] mt-2">{tip.title}</h3>
              <p className="text-xs text-[#444651] mt-1">{tip.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tutor banner */}
      <div className="mt-4 bg-[#00236f] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-white font-semibold text-base">Practice with a real interviewer</p>
          <p className="text-[#90a8ff] text-sm mt-1">
            Book a mock interview session with a verified industry expert
          </p>
        </div>
        <Link
          href="/tutors"
          className="shrink-0 text-center bg-white text-[#00236f] font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#eaedff] transition-colors"
        >
          Book Mock Interview →
        </Link>
      </div>
    </div>
  )
}
