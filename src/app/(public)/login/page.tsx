'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

/* ---------- Types & constants ---------- */

type Tab = 'signin' | 'signup'

type FieldErrors = {
  name?: string
  email?: string
  password?: string
}

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim().toLowerCase()

const URL_ERRORS: Record<string, string> = {
  admin_reserved: 'This email is reserved for admin access.',
  auth_failed: 'Sign in failed. Please try again.',
  profile_failed: 'We could not load your profile. Please try again.',
}

const FEATURES = [
  {
    icon: 'menu_book',
    title: 'Bilingual Study Notes',
    body: 'English + Hinglish notes for SQL, Python, Power BI and more',
  },
  {
    icon: 'terminal',
    title: 'Practice & Test',
    body: '500+ MCQ questions with detailed explanations',
  },
  {
    icon: 'group',
    title: '1:1 Expert Tutors',
    body: 'Book verified industry professionals for personalised sessions',
  },
]

/* ---------- Small components ---------- */

function Icon({ name, className = '' }: { name: string; className?: string }) {
  return (
    <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  )
}

function Spinner({ className = 'border-white' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`animate-spin border-2 ${className} border-t-transparent rounded-full w-4 h-4`}
    />
  )
}

function GoogleLogo() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 48 48">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}

function inputClass(hasError: boolean) {
  return `w-full border ${
    hasError
      ? 'border-[#ba1a1a]'
      : 'border-[#c5c5d3] focus:border-[#0051d5] focus:ring-1 focus:ring-[#0051d5]'
  } rounded-lg px-3 py-2.5 text-sm focus:outline-none bg-white placeholder-[#757682]`
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p role="alert" className="text-[#ba1a1a] text-xs mt-1">
      {message}
    </p>
  )
}

/* ---------- Page ---------- */

export default function LoginPage() {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<Tab>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isSignUp = activeTab === 'signup'
  const busy = isLoading || isGoogleLoading

  // Surface errors passed back from the OAuth callback (?error=...)
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('error')
    if (code) setError(URL_ERRORS[code] ?? URL_ERRORS.auth_failed)
  }, [])

  function switchTab(tab: Tab) {
    if (tab === activeTab || busy) return
    setActiveTab(tab)
    setError('')
    setNotice('')
    setFieldErrors({})
    setShowPassword(false)
  }

  function validate(): boolean {
    const errors: FieldErrors = {}
    if (isSignUp && name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.'
    }
    if (!email.includes('@')) {
      errors.email = 'Enter a valid email address.'
    }
    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.'
    }
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  function isAdminEmail(value: string) {
    return !!ADMIN_EMAIL && value.trim().toLowerCase() === ADMIN_EMAIL
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (busy) return

    setError('')
    setNotice('')
    if (!validate()) return

    if (isAdminEmail(email)) {
      setError('This email is reserved for admin access.')
      return
    }

    setIsLoading(true)
    try {
      const supabase = createClient()
      const cleanEmail = email.trim()

      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: { data: { full_name: name.trim() } },
        })
        if (signUpError) {
          setError(signUpError.message)
          return
        }
        if (!data.session) {
          // Email confirmation is enabled — no session until the user confirms.
          setNotice('Account created. Check your email to confirm it, then sign in.')
          return
        }
        router.push('/onboarding')
        return
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      })
      if (signInError || !data.user) {
        setError(signInError?.message ?? 'Unable to sign in. Please try again.')
        return
      }

      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('id')
        .eq('id', data.user.id)
        .maybeSingle()

      if (profileError) {
        setError('We could not load your profile. Please try again.')
        return
      }

      router.push(profile ? '/dashboard' : '/onboarding')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogle() {
    if (busy) return
    setError('')
    setNotice('')
    setIsGoogleLoading(true)
    try {
      const supabase = createClient()
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + '/auth/callback' },
      })
      if (oauthError) {
        setError(oauthError.message)
        setIsGoogleLoading(false)
      }
      // On success the browser is redirected to Google, so keep the loading state.
    } catch {
      setError('Something went wrong. Please try again.')
      setIsGoogleLoading(false)
    }
  }

  function clearField(field: keyof FieldErrors) {
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  return (
    <div className="flex min-h-screen">
      {/* LEFT PANEL */}
      <aside className="hidden lg:flex lg:w-5/12 bg-[#00236f] h-full min-h-screen flex-col justify-between p-10">
        <div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold">D</span>
            </div>
            <span className="text-white font-bold text-lg ml-2">DATA247</span>
          </div>

          <h2 className="mt-12 text-white font-bold text-[28px] leading-[36px] max-w-xs">
            Your Data Career Journey Starts Here
          </h2>
          <p className="mt-3 text-[#90a8ff] text-sm">
            Join thousands of learners preparing for Data Analytics and Data Science careers.
          </p>

          <ul className="mt-8 space-y-4">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="flex items-start gap-3">
                <div className="w-8 h-8 shrink-0 rounded-full bg-white/10 flex items-center justify-center">
                  <Icon name={feature.icon} className="text-white text-[18px]" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{feature.title}</p>
                  <p className="text-[#90a8ff] text-xs">{feature.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[#444651] text-xs">© 2026 DATA247</p>
      </aside>

      {/* RIGHT PANEL */}
      <main className="w-full lg:w-7/12 bg-[#faf8ff] min-h-screen flex items-center justify-center p-6 md:p-12">
        <div className="bg-white rounded-xl shadow-sm border border-[#e2e7ff] p-8 w-full max-w-md">
          <h1 className="text-[#00236f] font-bold text-[22px]">Welcome to DATA247</h1>
          <p className="text-[#444651] text-sm mt-1">
            Sign in to your account or create a new one
          </p>

          <div role="tablist" className="mt-6 flex gap-6 border-b border-[#e2e7ff]">
            {(
              [
                ['signin', 'Sign In'],
                ['signup', 'Sign Up'],
              ] as const
            ).map(([tab, label]) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => switchTab(tab)}
                className={
                  activeTab === tab
                    ? 'border-b-2 border-[#00236f] text-[#00236f] font-semibold text-sm pb-2 -mb-px'
                    : 'text-[#444651] text-sm pb-2 hover:text-[#131b2e] transition-colors'
                }
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4 mt-6">
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-[#131b2e] mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    clearField('name')
                  }}
                  aria-invalid={!!fieldErrors.name}
                  className={inputClass(!!fieldErrors.name)}
                />
                <FieldError message={fieldErrors.name} />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-[#131b2e] mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  clearField('email')
                }}
                aria-invalid={!!fieldErrors.email}
                className={inputClass(!!fieldErrors.email)}
              />
              <FieldError message={fieldErrors.email} />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor="password" className="text-xs font-medium text-[#131b2e]">
                  Password
                </label>
                {!isSignUp && (
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#0051d5] hover:underline"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    clearField('password')
                  }}
                  aria-invalid={!!fieldErrors.password}
                  className={`${inputClass(!!fieldErrors.password)} pr-10`}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((show) => !show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-[#757682] cursor-pointer hover:text-[#131b2e] transition-colors"
                >
                  <Icon
                    name={showPassword ? 'visibility_off' : 'visibility'}
                    className="text-[18px]"
                  />
                </button>
              </div>
              {isSignUp && !fieldErrors.password && (
                <p className="text-xs text-[#757682] mt-1">Minimum 8 characters</p>
              )}
              <FieldError message={fieldErrors.password} />
            </div>

            <div>
              <button
                type="submit"
                disabled={busy}
                className="w-full mt-2 bg-[#00236f] text-white font-semibold text-sm py-3 rounded-lg hover:bg-[#1e3a8a] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading && <Spinner />}
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
              {error && (
                <p role="alert" className="text-[#ba1a1a] text-xs mt-1">
                  {error}
                </p>
              )}
              {notice && (
                <p role="status" className="text-[#004a31] text-xs mt-1">
                  {notice}
                </p>
              )}
            </div>
          </form>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-[#e2e7ff]" />
            <span className="text-xs text-[#757682]">or</span>
            <div className="flex-1 h-px bg-[#e2e7ff]" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            className="w-full border border-[#c5c5d3] bg-white text-[#131b2e] text-sm font-medium py-2.5 rounded-lg hover:bg-[#f2f3ff] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? <Spinner className="border-[#00236f]" /> : <GoogleLogo />}
            Continue with Google
          </button>

          <p className="mt-4 text-center text-xs text-[#444651]">
            By continuing, you agree to our{' '}
            <Link href="/privacy" className="text-[#0051d5] hover:underline">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms" className="text-[#0051d5] hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
