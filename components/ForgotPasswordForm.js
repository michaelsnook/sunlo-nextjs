import { useState } from 'react'
import supabase from 'lib/supabase-client'
import ErrorList from 'app/components/ErrorList'

export default function ForgotPasswordForm() {
  const [errors, setErrors] = useState()
  const [isSubmitting, setIsSubmitting] = useState()
  const [successfulSubmit, setSuccessfulSubmit] = useState()
  const [yourEmail, setYourEmail] = useState()

  const onSubmit = event => {
    setErrors()
    setIsSubmitting(true)
    event.preventDefault()

    const email = event.target.email.value
    setYourEmail(email)
    supabase.auth.api.resetPasswordForEmail(email).then(({ data, error }) => {
      setIsSubmitting(false)
      if (!error) {
        setSuccessfulSubmit(true)
        setErrors()
        console.log(data)
      } else {
        setErrors(error)
        console.log(error)
      }
    })
  }

  return (
    <div className="section-card-inner">
      {successfulSubmit ? (
        <div className="flex flex-col space-y-4">
          <h1 className="h3 text-gray-700">Check your email</h1>
          <p>We&apos;ve sent a password reset link to {yourEmail}.</p>
          <p>You can close this window.</p>
        </div>
      ) : (
        <>
          <h1 className="h3 text-gray-700">Request a password reset</h1>
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
              <div className="flex flex-row justify-between">
                <button
                  tabIndex="3"
                  className="btn btn-primary"
                  type="submit"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                >
                  Send password reset email
                </button>
              </div>
            </fieldset>
          </form>
          <ErrorList
            summary="Error sending password reset"
            error={errors?.message}
          />
        </>
      )}
    </div>
  )
}
