import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=auth_failed`)
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/login?error=auth_failed`)
  }

  // The admin email is reserved for the admin login and cannot use the public flow.
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim().toLowerCase()
  if (adminEmail && data.user.email?.toLowerCase() === adminEmail) {
    await supabase.auth.signOut()
    return NextResponse.redirect(`${origin}/login?error=admin_reserved`)
  }

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('id')
    .eq('id', data.user.id)
    .maybeSingle()

  if (profileError) {
    return NextResponse.redirect(`${origin}/login?error=profile_failed`)
  }

  return NextResponse.redirect(`${origin}${profile ? '/dashboard' : '/onboarding'}`)
}
