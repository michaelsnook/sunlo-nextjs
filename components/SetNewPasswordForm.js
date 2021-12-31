import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import supabase from '../lib/supabase-client'
import ErrorList from './ErrorList'

export default function SetNewPasswordForm() {
  const [errors, setErrors] = useState()
  const [isSubmitting, setIsSubmitting] = useState()
  const [successfulSubmit, setSuccessfulSubmit] = useState()
  const [yourEmail, setYourEmail] = useState()
  const router = useRouter()
  const { token: access_token } = router.query

  const onSubmit = event => {
    setErrors()
    setIsSubmitting(true)
    event.preventDefault()

    const password = event.target.password.value

    supabase.auth.api
      .updateUser(access_token, { password })
      .then(d => {
        console.log(d)
        setIsSubmitting(false)
      })
      .catch(e => {
        setErrors(e)
        console.log(e)
        setIsSubmitting(false)
      })
  }

  return (
    <div className="mx-auto max-w-lg my-6">
      {!access_token ? (
        <div className="flex flex-col space-y-4">
          <h1 className="h3 text-gray-700">Invalid link</h1>
          <p>
            Perhaps you&apos;ve received more than one password reset email? try
            the most recent one.
          </p>
          <p>
            Or maybe the token has expired; try requesting{' '}
            <Link href="/forgot-password">
              <a className="link">another password reset email</a>
            </Link>
            .
          </p>
        </div>
      ) : (
        <>
          <h1 className="h3 text-gray-700">Choose a new password</h1>
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
              <div className="flex flex-row justify-between">
                <button
                  tabIndex="3"
                  className="btn btn-primary"
                  type="submit"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                >
                  Set new password
                </button>
              </div>
            </fieldset>
          </form>
          <ErrorList
            summary="Error setting new password"
            error={errors?.message}
          />
        </>
      )}
    </div>
  )
}
