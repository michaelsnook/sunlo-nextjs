'use client'

import { useState } from 'react'
import supabase from 'lib/supabase-client'
import ErrorList from 'app/components/ErrorList'

const baseUrl =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'https://sunlo.co'

const redirectUrl = `${baseUrl}/profile/change-password`
console.log(`redirectUrl is ${redirectUrl}`)

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
    supabase.auth
      .resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      })
      .then(({ data, error }) => {
        setIsSubmitting(false)
        if (!error) {
          setSuccessfulSubmit(true)
          setErrors()
          console.log(`Succeeded submitting the form`, data)
        } else {
          setErrors(error)
          console.log(`There was an error submitting the form`, error)
        }
      })
  }

  return (
    <div className="section-card-inner">
      {successfulSubmit ? (
        <div className="flex flex-col space-y-4">
          <h1 className="h3 text-base-content/90">Check your email</h1>
          <p>We&apos;ve sent a password reset link to {yourEmail}.</p>
          <p>You can close this window.</p>
        </div>
      ) : (
        <>
          <h1 className="h3 text-base-content/90">Request a password reset</h1>
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
