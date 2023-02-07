import { useState } from 'react'
import supabase from 'lib/supabase-client'
import { useGlobalState } from 'lib/global-store'
import ErrorList from 'components/ErrorList'

export default function SetNewEmailForm() {
  const { user } = useGlobalState()
  const [errors, setErrors] = useState()
  const [isSubmitting, setIsSubmitting] = useState()
  const [successfulSubmit, setSuccessfulSubmit] = useState()

  const onSubmit = event => {
    setErrors()
    setIsSubmitting(true)
    event.preventDefault()

    const email = event.target.email.value

    supabase.auth.updateUser({ email }).then(({ data, error }) => {
      console.log(data, error)
      setIsSubmitting(false)
      setSuccessfulSubmit(!error)
      setErrors(error)
    })
  }

  return (
    <div className="mx-auto max-w-lg my-6">
      {successfulSubmit ? (
        <SuccessfulSubmit />
      ) : (
        <>
          <h1 className="h3 text-gray-700">Choose a new email</h1>
          <form role="form" onSubmit={onSubmit} className="form">
            <fieldset
              className="flex flex-col gap-y-4"
              disabled={!user || isSubmitting}
            >
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
                    errors?.email ? 'border-red-600' : ''
                  } rounded-md`}
                  tabIndex="1"
                  type="text"
                  placeholder="email"
                  defaultValue={user?.email}
                />
              </div>
              <div className="flex flex-row justify-between">
                <button
                  tabIndex="3"
                  className="btn btn-primary"
                  type="submit"
                  disabled={!user || isSubmitting}
                  aria-disabled={isSubmitting}
                >
                  Set new Email
                </button>
              </div>
            </fieldset>
          </form>
          <ErrorList
            summary="Error requesting new email"
            error={errors?.message}
          />
        </>
      )}
    </div>
  )
}

const SuccessfulSubmit = () => (
  <div className="flex flex-col space-y-4">
    <h1 className="h3 text-gray-700">Please confirm email</h1>
    <p>
      We&apos;ve sent a confirmation email to the address you entered. Please
      click the confirmation link in your email.
    </p>
    <p>You can close this tab.</p>
  </div>
)
