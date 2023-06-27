'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import supabase from 'lib/supabase-client'
import { useAuthContext } from 'lib/auth-context'
import ErrorList from 'app/components/ErrorList'

export default function Login({ signup }) {
  const [errors, setErrors] = useState()
  const [isSubmitting, setIsSubmitting] = useState()
  const [sentConfirmationEmail, setSentConfirmationEmail] = useState()

  const router = useRouter()
  const { user } = useAuthContext()
  if (user) router.push('/my-decks')
  // const [isSignup, setIsSignup] = useState(signup)

  const onSubmit = event => {
    setErrors()
    setIsSubmitting(true)
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value

    if (signup) {
      supabase.auth
        .signUp({ email, password })
        .then(({ user, session, error }) => {
          setIsSubmitting(false)
          setErrors(error)
          if (user && session) {
            router.push('/app/profile/start')
          } else if (user && !session) {
            setSentConfirmationEmail(true)
          }
        })
    } else {
      supabase.auth
        .signInWithPassword({
          email,
          password,
        })
        .then(({ data, error }) => {
          setIsSubmitting(false)
          if (error) setErrors(error)
          if (data) {
            router.push('/my-decks')
          }
        })
        .catch(e => {
          setIsSubmitting(false)
          setErrors(e)
        })
    }
  }

  return (
    <div className="section-card-inner">
      {sentConfirmationEmail ? (
        <SuccessfulSubmit />
      ) : (
        <>
          <h1 className="h3 text-gray-700">
            {signup ? 'Create your account' : 'Please log in'}
          </h1>
          <form role="form" onSubmit={onSubmit} className="form">
            <fieldset className="flex flex-col gap-y-4" disabled={isSubmitting}>
              <div>
                <p>
                  <label htmlFor="email">Email</label>
                </p>
                <input
                  id="email"
                  name="email"
                  required="required"
                  aria-invalid={errors?.email ? 'true' : 'false'}
                  className={`${
                    errors?.email ? 'border-error/60' : ''
                  } rounded-md w-full`}
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
                  aria-invalid={errors?.password ? 'true' : 'false'}
                  className={`${
                    errors?.password ? 'border-error/60' : ''
                  } rounded-md w-full`}
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
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                >
                  {signup ? 'Sign up' : 'Log in'}
                </button>
                <Link
                  tabIndex="4"
                  href={signup ? '/login' : '/signup'}
                  className="btn btn-quiet"
                >
                  {signup ? 'Log in' : 'Create account'}
                </Link>
              </div>
              <ErrorList summary="Problem logging in" error={errors?.message} />
              <p>
                <Link href="/forgot-password" className="link text-sm">
                  Forgot password?
                </Link>
              </p>
            </fieldset>
          </form>
        </>
      )}
    </div>
  )
}

const SuccessfulSubmit = () => (
  <div className="flex flex-col space-y-4 p-4 sm:p-6 md:p-10">
    <h1 className="h3 text-gray-700">Please confirm email</h1>
    <p>
      We&apos;ve sent a confirmation email to the address you entered. Please
      click the confirmation link in your email.
    </p>
    <p>You can close this tab.</p>
  </div>
)
