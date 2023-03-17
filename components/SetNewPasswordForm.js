import { useState } from 'react'
import Link from 'next/link'
import supabase from 'lib/supabase-client'
import ErrorList from 'components/ErrorList'
import { useGlobalState } from 'lib/global-store'

export default function SetNewPasswordForm() {
  const { user } = useGlobalState()
  const [errors, setErrors] = useState()
  const [isSubmitting, setIsSubmitting] = useState()
  const [successfulSubmit, setSuccessfulSubmit] = useState()

  const onSubmit = event => {
    setErrors()
    setIsSubmitting(true)
    event.preventDefault()

    const password = event.target.password.value

    supabase.auth.updateUser({ password }).then(({ data, error }) => {
      console.log(data, error)
      setIsSubmitting(false)
      setErrors(error)
      setSuccessfulSubmit(!error)
    })
  }

  return (
    <div className="section-card-inner">
      {successfulSubmit ? (
        <SuccessfulSubmit />
      ) : !user ? (
        <InvalidLink />
      ) : (
        <>
          <h1 className="h3 text-gray-700">Choose a new password</h1>
          <form role="form" onSubmit={onSubmit} className="form">
            <fieldset className="flex flex-col gap-y-4" disabled={isSubmitting}>
              <div>
                <p>
                  <label htmlFor="password">New password</label>
                </p>
                <input
                  id="password"
                  name="password"
                  required="required"
                  aria-invalid={errors?.password ? 'true' : 'false'}
                  className={`${
                    errors?.password ? 'border-error/60' : ''
                  } rounded-md w-full`}
                  tabIndex="1"
                  type="password"
                  placeholder="new password"
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

const InvalidLink = () => (
  <div className="flex flex-col space-y-4">
    <h1 className="h3 text-gray-700">Invalid link</h1>
    <p>
      Perhaps you&apos;ve received more than one password reset email? try the
      most recent one.
    </p>
    <p>
      Or maybe the token has expired; try requesting{' '}
      <Link href="/forgot-password" className="link">
        another password reset email
      </Link>
      .
    </p>
  </div>
)

const SuccessfulSubmit = () => (
  <div className="flex flex-col space-y-4">
    <h1 className="h3 text-gray-700">Update Successful!</h1>
    <p>
      You can close this window or go{' '}
      <Link href="/app/profile" className="link">
        back to your profile
      </Link>
      .
    </p>
  </div>
)
