import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import supabase from '../lib/supabase-client'
import { useGlobalState } from '../lib/global-store'

export default function Login() {
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState()
  const router = useRouter()
  const { user, profile, signOut } = useGlobalState()

  const onSubmit = event => {
    setErrors({})
    setIsSubmitting(true)
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value

    supabase.auth
      .signIn({
        email,
        password,
      })
      .then(({ user, session, error }) => {
        setIsSubmitting(false)
        setErrors(error ?? {})
        if (user) {
          router.push('/app/profile')
        }
      })
      .catch(e => {
        setIsSubmitting(false)
        setErrors(e)
      })
  }

  return (
    <div className="mx-auto max-w-lg my-6">
      {user && profile ? (
        <div className="flex flex-col space-y-4">
          <h1 className="h3 text-gray-700">
            You&apos;re logged in as {profile.username}
          </h1>
          <p>
            <Link href="/app/profile">
              <a className="link">Skip logging in again and go to my profile</a>
            </Link>
          </p>
          <p>
            <button className="link" onClick={signOut}>
              Log out and log in as someone new
            </button>
          </p>
        </div>
      ) : (
        <>
          <h1 className="h3 text-gray-700">Please log in</h1>
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
                  aria-invalid={errors.email ? 'true' : 'false'}
                  className={`${
                    errors.email ? 'border-red-600' : ''
                  } rounded-md`}
                  tabIndex="1"
                  type="text"
                  placeholder="email"
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
                  aria-invalid={errors.password ? 'true' : 'false'}
                  className={`${
                    errors.password ? 'border-red-600' : ''
                  } rounded-md`}
                  tabIndex="2"
                  type="password"
                  placeholder="****"
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
                  Log in
                </button>
                <Link tabIndex="4" href="/signup">
                  <a className="btn btn-quiet">Create account</a>
                </Link>
              </div>
              <p>
                <Link href="/forgot-password">
                  <a className="link text-sm">Forgot password?</a>
                </Link>
              </p>
            </fieldset>
          </form>
        </>
      )}
    </div>
  )
}
