'use client'

import { useLayoutEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import supabase from 'lib/supabase-client'
import { useAuth } from 'lib/auth-context'
import ErrorList from 'app/components/ErrorList'

export default function LoginForm({ asModal = false }) {
  const { isAuth } = useAuth()
  const router = useRouter()
  useLayoutEffect(() => {
    if (isAuth && router && !asModal) {
      router.push('/home') // go to home page
    }
  }, [router, isAuth, asModal])

  const login = useMutation({
    mutationFn: async event => {
      event.preventDefault()

      const email = event.target.email.value
      const password = event.target.password.value

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return data
    },
    onSuccess: data => {
      toast.success(`You're logged in as ${data.user.email}`)
    },
  })

  if (isAuth) return <p>You are logged in; pls wait while we redirect you.</p>

  return (
    <>
      <h1 className="h3 text-base-content/90">Please log in</h1>
      <form role="form" onSubmit={login.mutate} className="form">
        <fieldset
          className="flex flex-col gap-y-4"
          disabled={login.isSubmitting}
        >
          <div>
            <p>
              <label htmlFor="email">Email</label>
            </p>
            <input
              id="email"
              name="email"
              required="required"
              aria-invalid={login.error?.email ? 'true' : 'false'}
              className={`${
                login.error?.email ? 'border-error/60' : ''
              } rounded-md w-full bg-base-100 text-base-content`}
              tabIndex="1"
              type="text"
              placeholder="email@domain"
            />
          </div>
          <div>
            <p>
              <label htmlFor="password">Password</label>
            </p>
            <input
              id="password"
              name="password"
              required="required"
              aria-invalid={login.error?.password ? 'true' : 'false'}
              className={`${
                login.error?.password ? 'border-error/60' : ''
              } rounded-md w-full bg-base-100 text-base-content`}
              tabIndex="2"
              type="password"
              placeholder="* * * * * * * *"
            />
          </div>
          <div className="flex flex-row justify-between">
            <button
              tabIndex="3"
              className="btn btn-primary"
              type="submit"
              disabled={login.isSubmitting}
              aria-disabled={login.isSubmitting}
            >
              Log in
            </button>
            <Link tabIndex="4" href="/signup" className="btn btn-ghost">
              Create account
            </Link>
          </div>
          <ErrorList summary="Problem logging in" error={login.error} />
          <p>
            <Link href="/forgot-password" className="link text-sm">
              Forgot password?
            </Link>
          </p>
        </fieldset>
      </form>
    </>
  )
}
