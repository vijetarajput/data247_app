'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

/* ---------- Types & data ---------- */

type Step = 1 | 2 | 3

type Option = {
  value: string
  title: string
  subtitle: string
  tags: string[]
  icon: string
  iconBg: string
  iconColor: string
  badge?: string
  comingSoon?: boolean
}

type GoalOption = {
  value: string
  title: string
  icon: string
  iconColor: string
}

const COURSES: Option[] = [
  {
    value: 'data-analytics',
    title: 'Data Analytics',
    subtitle: 'Master the tools used by Data Analysts daily',
    tags: ['SQL', 'Excel', 'Power BI', 'Python', 'Statistics'],
    icon: 'bar_chart',
    iconBg: 'bg-[#dae2fd]',
    iconColor: 'text-[#00236f]',
  },
  {
    value: 'data-science',
    title: 'Data Science',
    subtitle: 'Build ML models and work with advanced data',
    tags: ['Python', 'Statistics', 'ML', 'Deep Learning', 'AI'],
    icon: 'psychology',
    iconBg: 'bg-[#d8f3dc]',
    iconColor: 'text-[#004a31]',
    comingSoon: true,
  },
  {
    value: 'both',
    title: 'Both Courses',
    subtitle: 'Complete preparation for any data role',
    tags: ['All modules included', 'Best value'],
    icon: 'layers',
    iconBg: 'bg-[#fff3e0]',
    iconColor: 'text-[#e65100]',
    badge: 'Popular',
    comingSoon: true,
  },
]

const LEVELS: Option[] = [
  {
    value: 'beginner',
    title: 'Beginner',
    subtitle: 'No prior experience in data or analytics',
    tags: ['Starting from scratch', 'Needs full curriculum'],
    icon: 'school',
    iconBg: 'bg-[#dae2fd]',
    iconColor: 'text-[#00236f]',
  },
  {
    value: 'intermediate',
    title: 'Intermediate',
    subtitle: 'Some knowledge, looking to go deeper',
    tags: ['Knows basics', 'Needs depth'],
    icon: 'trending_up',
    iconBg: 'bg-[#d8f3dc]',
    iconColor: 'text-[#004a31]',
  },
  {
    value: 'advanced',
    title: 'Advanced',
    subtitle: 'Strong foundation, need interview readiness',
    tags: ['Interview prep focus', 'Advanced topics'],
    icon: 'workspace_premium',
    iconBg: 'bg-[#fff3e0]',
    iconColor: 'text-[#e65100]',
  },
]

const GOALS: GoalOption[] = [
  { value: 'new-job', title: 'Get a new job', icon: 'work', iconColor: 'text-[#00236f]' },
  { value: 'switch-careers', title: 'Switch careers', icon: 'sync_alt', iconColor: 'text-[#004a31]' },
  {
    value: 'upskill',
    title: 'Upskill at current job',
    icon: 'trending_up',
    iconColor: 'text-[#e65100]',
  },
  { value: 'freelancing', title: 'Freelancing', icon: 'laptop', iconColor: 'text-[#6200ea]' },
]

const PROGRESS_WIDTH: Record<Step, string> = {
  1: 'w-[33%]',
  2: 'w-[66%]',
  3: 'w-full',
}

/* ---------- Small components ---------- */

function Icon({ name, className = '' }: { name: string; className?: string }) {
  return (
    <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  )
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"
    />
  )
}

function cardState(selected: boolean) {
  return selected
    ? 'border-[#0051d5] bg-[#eaedff]'
    : 'border-[#e2e7ff] bg-white hover:border-[#0051d5]/40 hover:bg-[#f2f3ff]'
}

function CheckBadge() {
  return (
    <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#0051d5] flex items-center justify-center">
      <Icon name="check" className="text-white text-[14px]" />
    </span>
  )
}

function OptionCard({
  option,
  selected,
  onSelect,
}: {
  option: Option
  selected: boolean
  onSelect: () => void
}) {
  const disabled = !!option.comingSoon
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={disabled ? undefined : onSelect}
      className={`relative w-full p-4 rounded-xl border-2 transition-all text-left ${
        disabled
          ? 'border-[#e2e7ff] bg-white opacity-50 cursor-not-allowed'
          : `cursor-pointer ${cardState(selected)}`
      }`}
    >
      {selected && <CheckBadge />}
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${option.iconBg}`}
        >
          <Icon name={option.icon} className={`${option.iconColor} text-[22px]`} />
        </div>
        <div className="pr-6">
          <div className="flex items-center">
            <p className="font-semibold text-[#131b2e] text-sm">{option.title}</p>
            {option.comingSoon ? (
              <span className="text-[10px] bg-[#e2e7ff] text-[#757682] px-2 py-0.5 rounded-full font-medium ml-2">
                Coming Soon
              </span>
            ) : (
              option.badge && (
                <span className="bg-[#0051d5] text-white text-[10px] px-2 py-0.5 rounded-full ml-2">
                  {option.badge}
                </span>
              )
            )}
          </div>
          <p className="text-xs text-[#444651] mt-0.5">{option.subtitle}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {option.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-[#eaedff] text-[#00236f] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  )
}

function StepHeader({
  step,
  title,
  subtitle,
}: {
  step: Step
  title: string
  subtitle: string
}) {
  return (
    <>
      <p className="text-xs text-[#0051d5] font-semibold uppercase tracking-wider">
        Step {step} of 3
      </p>
      <h1 className="text-[#00236f] font-bold text-[22px] leading-[28px] mt-1">{title}</h1>
      <p className="text-[#444651] text-sm mt-1 mb-6">{subtitle}</p>
    </>
  )
}

function PrimaryButton({
  children,
  disabled,
  loading,
  onClick,
}: {
  children: React.ReactNode
  disabled?: boolean
  loading?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full mt-6 bg-[#00236f] text-white font-semibold text-sm py-3 rounded-lg hover:bg-[#1e3a8a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}

function BackButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <div className="text-center mt-3">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="text-[#444651] text-sm underline cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Back
      </button>
    </div>
  )
}

/* ---------- Page ---------- */

export default function OnboardingPage() {
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedGoal, setSelectedGoal] = useState('')

  const [user, setUser] = useState<User | null>(null)
  const [isChecking, setIsChecking] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  // Route protection: must be signed in, and skip onboarding if already enrolled.
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

        const { data: profile } = await supabase
          .from('users')
          .select('is_enrolled')
          .eq('id', data.user.id)
          .maybeSingle()

        if (profile?.is_enrolled) {
          router.replace('/dashboard')
          return
        }

        if (!cancelled) {
          setUser(data.user)
          setIsChecking(false)
        }
      } catch {
        router.replace('/login')
      }
    }

    checkAccess()
    return () => {
      cancelled = true
    }
  }, [router])

  async function handleFinish() {
    if (!user || !selectedGoal || isSaving) return

    setError('')
    setIsSaving(true)
    try {
      const supabase = createClient()
      const { error: upsertError } = await supabase.from('users').upsert({
        id: user.id,
        full_name: user.user_metadata?.full_name || '',
        email: user.email,
        course: selectedCourse,
        experience_level: selectedLevel,
        goal: selectedGoal,
        is_enrolled: true,
        enrolled_at: new Date().toISOString(),
      })

      if (upsertError) {
        setError(upsertError.message)
        setIsSaving(false)
        return
      }

      router.push('/dashboard')
    } catch {
      setError('Something went wrong. Please try again.')
      setIsSaving(false)
    }
  }

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center">
        <span
          role="status"
          aria-label="Loading"
          className="animate-spin border-2 border-[#0051d5] border-t-transparent rounded-full w-6 h-6"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf8ff] flex flex-col">
      {/* Top bar */}
      <header className="h-16 border-b border-[#e2e7ff] bg-white px-4 md:px-10 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-7 h-7 rounded-lg bg-[#00236f] flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="text-[#00236f] font-bold text-base ml-2">DATA247</span>
        </div>
        <span className="text-xs text-[#757682] font-medium">Step {currentStep} of 3</span>
      </header>

      {/* Progress bar */}
      <div className="w-full h-1 bg-[#e2e7ff]">
        <div
          className={`h-full bg-[#0051d5] transition-all duration-500 ${PROGRESS_WIDTH[currentStep]}`}
        />
      </div>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-sm border border-[#e2e7ff] p-8 w-full max-w-lg">
          {currentStep === 1 && (
            <>
              <StepHeader
                step={1}
                title="Which course do you want to start with?"
                subtitle="You can always switch tracks later."
              />
              <div role="radiogroup" aria-label="Course" className="space-y-3">
                {COURSES.map((course) => (
                  <OptionCard
                    key={course.value}
                    option={course}
                    selected={selectedCourse === course.value}
                    onSelect={() => setSelectedCourse(course.value)}
                  />
                ))}
              </div>
              <PrimaryButton
                disabled={selectedCourse !== 'data-analytics'}
                onClick={() => setCurrentStep(2)}
              >
                Continue →
              </PrimaryButton>
            </>
          )}

          {currentStep === 2 && (
            <>
              <StepHeader
                step={2}
                title="What's your current experience level?"
                subtitle="We'll personalise your learning path based on this."
              />
              <div role="radiogroup" aria-label="Experience level" className="space-y-3">
                {LEVELS.map((level) => (
                  <OptionCard
                    key={level.value}
                    option={level}
                    selected={selectedLevel === level.value}
                    onSelect={() => setSelectedLevel(level.value)}
                  />
                ))}
              </div>
              <PrimaryButton disabled={!selectedLevel} onClick={() => setCurrentStep(3)}>
                Continue →
              </PrimaryButton>
              <BackButton onClick={() => setCurrentStep(1)} />
            </>
          )}

          {currentStep === 3 && (
            <>
              <StepHeader
                step={3}
                title="What's your main goal?"
                subtitle="This helps us show you the most relevant content."
              />
              <div role="radiogroup" aria-label="Goal" className="grid grid-cols-2 gap-3">
                {GOALS.map((goal) => {
                  const selected = selectedGoal === goal.value
                  return (
                    <button
                      key={goal.value}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setSelectedGoal(goal.value)}
                      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all text-center flex flex-col items-center gap-2 ${cardState(
                        selected
                      )}`}
                    >
                      {selected && <CheckBadge />}
                      <Icon name={goal.icon} className={`${goal.iconColor} text-[28px]`} />
                      <span className="text-xs text-[#444651]">{goal.title}</span>
                    </button>
                  )
                })}
              </div>
              <PrimaryButton
                disabled={!selectedGoal}
                loading={isSaving}
                onClick={handleFinish}
              >
                Get Started →
              </PrimaryButton>
              {error && (
                <p role="alert" className="text-[#ba1a1a] text-xs mt-1 text-center">
                  {error}
                </p>
              )}
              <BackButton onClick={() => setCurrentStep(2)} disabled={isSaving} />
            </>
          )}
        </div>
      </main>
    </div>
  )
}
