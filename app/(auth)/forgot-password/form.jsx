'use client'

import { useState } from 'react'
import supabase from 'lib/supabase-client'
import ErrorList from 'app/components/ErrorList'
import { useMutation } from '@tanstack/react-query'
import { BASE_URL } from 'lib/helpers'

const redirectUrl = `${BASE_URL}/profile/change-password`
console.log(`redirectUrl is ${redirectUrl}`)

export default function ForgotPasswordForm() {
  const [yourEmail, setYourEmail] = useState()

  const onSubmit = async event => {
    event.preventDefault()
    const email = event.target.email.value
    setYourEmail(email)
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    })
    if (error) throw Error(error)
    return data
  }

  const useRequestPasswordForm = useMutation({
    mutationFn: onSubmit,
  })

  return (
    <div className="section-card-inner">
      {useRequestPasswordForm.isSuccess ? (
        <div className="flex flex-col space-y-4">
          <h1 className="h3 text-base-content/90">Check your email</h1>
          <p>We&apos;ve sent a password reset link to {yourEmail}.</p>
          <p>You can close this window.</p>
        </div>
      ) : (
        <>
          <h1 className="h3 text-base-content/90">Request a password reset</h1>
          <form
            role="form"
            onSubmit={useRequestPasswordForm.mutate}
            className="form"
          >
            <fieldset
              className="flex flex-col gap-y-4"
              disabled={useRequestPasswordForm.isSubmitting}
            >
              <div>
                <p>
                  <label htmlFor="email">Email</label>
                </p>
                <input
                  id="email"
                  name="email"
                  required="required"
                  aria-invalid={useRequestPasswordForm.error ? 'true' : 'false'}
                  className={`${
                    useRequestPasswordForm.error ? 'border-error' : ''
                  } rounded-md w-full border-2`}
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
                  disabled={useRequestPasswordForm.isSubmitting}
                  aria-disabled={useRequestPasswordForm.isSubmitting}
                >
                  Send password reset email
                </button>
              </div>
            </fieldset>
          </form>
          <ErrorList
            summary="Error sending password reset"
            error={`${useRequestPasswordForm.error}`}
          />
        </>
      )}
    </div>
  )
}
