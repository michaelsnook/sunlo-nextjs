'use client'

import { useMutation } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
import { useAuth } from 'lib/auth-context'
import ErrorList from 'components/error-list'
import { BASE_URL } from 'lib/helpers'

export default function SetNewEmailForm() {
  const { userEmail } = useAuth()

  const changeEmail = useMutation({
    mutationFn: async event => {
      event.preventDefault()
      const email = event.target.email.value
      const { data, error } = await supabase.auth.updateUser({
        email,
        options: {
          emailRedirectTo: `${BASE_URL}/change-email-success`,
        },
      })
      if (error) throw error
      return data
    },
  })

  return (
    <>
      {changeEmail.isSuccess ? (
        <SuccessfulSubmit />
      ) : (
        <>
          <h1 className="h3 text-base-content/90">Choose a new email</h1>
          <form role="form" onSubmit={changeEmail.mutate} className="form">
            <fieldset
              className="flex flex-col gap-y-4"
              disabled={!userEmail || changeEmail.isSubmitting}
            >
              <div>
                <p>
                  <label htmlFor="email">Email</label>
                </p>
                <input
                  id="email"
                  name="email"
                  required="required"
                  pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*"
                  aria-invalid={
                    changeEmail.error?.errors?.email ? 'true' : 'false'
                  }
                  className={`${
                    changeEmail.error?.errors?.email ? 'border-error/60' : ''
                  } s-input`}
                  tabIndex="1"
                  type="email"
                  placeholder="email@domain"
                  defaultValue={userEmail}
                />
              </div>
              <div className="flex flex-row justify-between">
                <button
                  tabIndex="3"
                  className="btn btn-primary"
                  type="submit"
                  disabled={!userEmail || changeEmail.isSubmitting}
                  aria-disabled={changeEmail.isSubmitting}
                >
                  Set new Email
                </button>
              </div>
            </fieldset>
          </form>
          <ErrorList
            summary="Error requesting new email"
            error={changeEmail.error}
          />
        </>
      )}
    </>
  )
}

const SuccessfulSubmit = () => (
  <div className="flex flex-col space-y-4">
    <h1 className="h3 text-base-content/90">Please confirm email</h1>
    <p>
      We&apos;ve sent a confirmation email to the address you entered. Please
      click the confirmation link in your email.
    </p>
    <p>You can close this tab.</p>
  </div>
)
