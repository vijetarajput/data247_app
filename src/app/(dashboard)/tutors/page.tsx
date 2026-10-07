'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

/* ---------- Types & data ---------- */

type Tutor = {
  slug: string
  name: string
  initials: string
  avatarClass: string
  headline: string
  specializations: string[]
  rate: number
  rating: number
  reviews: number
}

const TUTORS: Tutor[] = [
  {
    slug: 'priya-sharma',
    name: 'Priya Sharma',
    initials: 'PS',
    avatarClass: 'bg-[#dae2fd] text-[#00236f]',
    headline: 'Senior Data Analyst • 6 years experience',
    specializations: ['SQL', 'Power BI', 'Excel', 'Interview Prep'],
    rate: 399,
    rating: 4.9,
    reviews: 12,
  },
  {
    slug: 'rohan-mehta',
    name: 'Rohan Mehta',
    initials: 'RM',
    avatarClass: 'bg-[#d8f3dc] text-[#004a31]',
    headline: 'Data Scientist • ML Engineer • 5 years',
    specializations: ['Python', 'Machine Learning', 'Statistics'],
    rate: 349,
    rating: 4.8,
    reviews: 8,
  },
  {
    slug: 'ananya-iyer',
    name: 'Ananya Iyer',
    initials: 'AI',
    avatarClass: 'bg-[#fff3e0] text-[#e65100]',
    headline: 'Business Analyst • BI Specialist • 7 years',
    specializations: ['Power BI', 'SQL', 'Excel', 'DAX'],
    rate: 449,
    rating: 5.0,
    reviews: 15,
  },
  {
    slug: 'vikram-patel',
    name: 'Vikram Patel',
    initials: 'VP',
    avatarClass: 'bg-[#ede7f6] text-[#6200ea]',
    headline: 'Data Analytics Lead • Ex-TCS • 9 years',
    specializations: ['SQL', 'Python', 'Statistics', 'Career Guidance'],
    rate: 499,
    rating: 4.7,
    reviews: 20,
  },
]

const FILTERS = ['All', 'SQL', 'Python', 'Power BI', 'Excel', 'Statistics']

const STEPS = [
  {
    num: '1',
    title: 'Choose a Tutor',
    body: 'Browse verified tutors and select one that matches your needs',
  },
  {
    num: '2',
    title: 'Request a Session',
    body: 'Send a booking request with your preferred date and topic',
  },
  {
    num: '3',
    title: 'Learn & Grow',
    body: 'Tutor approves, you pay, get Google Meet link and join the session',
  },
]

/* ---------- Components ---------- */

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

function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <div className="relative bg-white rounded-xl border border-[#e2e7ff] shadow-sm hover:shadow-md hover:border-[#0051d5]/30 transition-all overflow-hidden cursor-pointer flex flex-col">
      <div className="p-5 flex-1">
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${tutor.avatarClass}`}
          >
            {tutor.initials}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-[#00236f] font-semibold text-sm">{tutor.name}</h2>
            <p className="text-xs text-[#444651] mt-0.5">{tutor.headline}</p>
            <div className="flex flex-wrap items-center gap-1 mt-1">
              <span
                role="img"
                aria-label={`Rated ${tutor.rating.toFixed(1)} out of 5`}
                className="flex"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" filled className="text-[#f59e0b] text-[14px]" />
                ))}
              </span>
              <span className="text-xs font-semibold text-[#131b2e]">
                {tutor.rating.toFixed(1)}
              </span>
              <span className="text-xs text-[#757682]">({tutor.reviews} reviews)</span>
            </div>
          </div>

          <span className="bg-[#d8f3dc] text-[#004a31] text-[10px] font-semibold px-2 py-0.5 rounded-full">
            Available
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {tutor.specializations.map((spec) => (
            <span
              key={spec}
              className="bg-[#eaedff] text-[#00236f] text-[10px] px-2 py-0.5 rounded-full font-medium"
            >
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-bold text-[#00236f]">from ₹{tutor.rate} / 30 min</p>
          <p className="text-xs text-[#757682]">30 min • 60 min</p>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-[#e2e7ff] bg-[#faf8ff] flex gap-2">
        {/* Stretched link: makes the whole card open the profile. */}
        <Link
          href={`/tutors/${tutor.slug}`}
          className="flex-1 border border-[#0051d5] text-[#0051d5] text-xs font-semibold py-2 rounded-lg hover:bg-[#eaedff] transition-colors text-center after:absolute after:inset-0"
        >
          View Profile
        </Link>
        <Link
          href={`/tutors/${tutor.slug}/book`}
          className="relative z-10 flex-1 bg-[#00236f] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#1e3a8a] transition-colors text-center"
        >
          Book Session
        </Link>
      </div>
    </div>
  )
}

/* ---------- Page ---------- */

export default function TutorsPage() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return TUTORS.filter((tutor) => {
      const matchesFilter =
        activeFilter === 'All' || tutor.specializations.includes(activeFilter)
      const matchesQuery =
        !q ||
        tutor.name.toLowerCase().includes(q) ||
        tutor.headline.toLowerCase().includes(q) ||
        tutor.specializations.some((spec) => spec.toLowerCase().includes(q))
      return matchesFilter && matchesQuery
    })
  }, [query, activeFilter])

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-[#00236f] font-bold text-[36px] tracking-tight">Find a Tutor</h1>
        <p className="text-[#444651] text-sm mt-1">
          Book a personalised session with a verified Data professional
        </p>
      </div>

      {/* Search and filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#757682] text-[20px]"
          />
          <input
            type="search"
            aria-label="Search tutors"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, specialization..."
            className="w-full pl-10 pr-4 py-2.5 border border-[#e2e7ff] rounded-lg text-sm bg-white focus:outline-none focus:border-[#0051d5] focus:ring-1 focus:ring-[#0051d5] placeholder-[#757682]"
          />
        </div>

        <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter by skill">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full cursor-pointer transition-all border ${
                activeFilter === filter
                  ? 'bg-[#00236f] text-white border-[#00236f]'
                  : 'bg-white text-[#444651] border-[#e2e7ff] hover:border-[#0051d5]/40'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Tutor cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filtered.map((tutor) => (
            <TutorCard key={tutor.slug} tutor={tutor} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 border border-[#e2e7ff] text-center mb-8">
          <p className="text-[#444651] text-sm font-medium">No tutors match your search</p>
          <p className="text-xs text-[#757682] mt-1">Try a different name or skill filter</p>
        </div>
      )}

      {/* How it works */}
      <section className="mb-8 bg-[#f2f3ff] rounded-xl p-6">
        <h2 className="text-[#00236f] font-semibold text-base mb-4">How Tutor Booking Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STEPS.map((step) => (
            <div key={step.num} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#00236f] text-white text-xs font-bold flex items-center justify-center shrink-0">
                {step.num}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#131b2e]">{step.title}</h3>
                <p className="text-xs text-[#444651] mt-0.5">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Become a tutor banner */}
      <div className="bg-[#00236f] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-white font-semibold text-base">Are you a Data professional?</p>
          <p className="text-[#90a8ff] text-sm mt-1">
            Share your expertise and earn by teaching on DATA247
          </p>
        </div>
        <Link
          href="/tutors/apply"
          className="shrink-0 text-center bg-white text-[#00236f] font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#eaedff] transition-colors"
        >
          Become a Tutor →
        </Link>
      </div>
    </div>
  )
}
