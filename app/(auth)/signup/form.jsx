'use client'

import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import supabase from 'lib/supabase-client'
import ErrorList from 'app/components/ErrorList'
import { BASE_URL } from 'lib/helpers'

export default function SignupForm() {
  const router = useRouter()

  const submitSignup = useMutation({
    mutationFn: async event => {
      event.preventDefault()
      const email = event.target.email.value
      const password = event.target.password.value

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          redirectTo: `${BASE_URL}/getting-started`,
        },
      })

      if (error) throw error
      if (data?.user && data?.session) router.push('/getting-started')
    },
  })

  return (
    <div>
      {submitSignup.isSuccess ? (
        <SuccessfulSubmit />
      ) : (
        <>
          <h1 className="h3 text-base-content/90">Create your account</h1>
          <form role="form" onSubmit={submitSignup.mutate} className="form">
            <fieldset
              className="flex flex-col gap-y-4"
              disabled={submitSignup.isSubmitting}
            >
              <div>
                <p>
                  <label htmlFor="email">Email</label>
                </p>
                <input
                  id="email"
                  name="email"
                  required="required"
                  aria-invalid={
                    submitSignup.error?.errors?.email ? 'true' : 'false'
                  }
                  className={`${
                    submitSignup.error?.errors?.email ? 'border-error/60' : ''
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
                  aria-invalid={
                    submitSignup.error?.errors?.password ? 'true' : 'false'
                  }
                  className={`${
                    submitSignup.error?.errors?.password
                      ? 'border-error/60'
                      : ''
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
                  disabled={submitSignup.isSubmitting}
                  aria-disabled={submitSignup.isSubmitting}
                >
                  Sign up
                </button>
                <Link tabIndex="4" href="/login" className="btn btn-ghost">
                  Log in
                </Link>
              </div>
              <ErrorList
                summary="Problem logging in"
                error={submitSignup.error}
              />
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
  <div className="flex flex-col space-y-4 p-4 @md:p-6 @xl:p-10">
    <h1 className="h3 text-base-content/90">Please confirm email</h1>
    <p>
      We&apos;ve sent a confirmation email to the address you entered. Please
      click the confirmation link in your email.
    </p>
    <p>You can close this tab.</p>
  </div>
)
