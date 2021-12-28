import { useState } from 'react'
import { useRouter } from 'next/router'
import supabase from '../lib/supabase-client'

export default function Login() {
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState()
  const router = useRouter()

  const onSubmit = event => {
    setErrors({})
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value

    const { user, session, error } = supabase.auth
      .signIn({
        email,
        password,
      })
      .then(({ user, session, error }) => {
        setErrors(error ?? {})
        if (user) {
          router.push('/app/profile')
        }
      })
      .catch(e => setErrors(e))
  }

  return (
    <div className="mx-auto max-w-lg my-6">
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
              className={`${errors.email ? 'border-red-600' : ''} rounded-md`}
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
          <div>
            <button
              tabIndex="3"
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              Log in
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}
