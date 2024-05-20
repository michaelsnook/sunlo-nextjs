'use client'

import { useState } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { toast } from 'react-hot-toast'
import supabase from 'lib/supabase-client'
import { useAuth } from 'lib/auth-context'
import ErrorList from 'app/components/ErrorList'

export default function LoginForm({ asModal = false }) {
  const [errors, setErrors] = useState()
  const [isSubmitting, setIsSubmitting] = useState()

  const { isAuth } = useAuth()

  if (isAuth) return null

  const onSubmit = event => {
    event.preventDefault()
    setErrors()
    setIsSubmitting(true)
    const email = event.target.email.value
    const password = event.target.password.value

    supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then(({ data, error }) => {
        setIsSubmitting(false)
        if (error) setErrors(error)
        if (data) {
          toast.success(`You're logged in as ${data.user.email}`)
          if (!asModal) redirect('/my-decks')
        }
      })
      .catch(e => {
        setIsSubmitting(false)
        setErrors(e)
      })
  }

  return (
    <div className="section-card-inner">
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
              aria-invalid={errors?.email ? 'true' : 'false'}
              className={`${
                errors?.email ? 'border-error/60' : ''
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
              aria-invalid={errors?.password ? 'true' : 'false'}
              className={`${
                errors?.password ? 'border-error/60' : ''
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
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              Log in
            </button>
            <Link tabIndex="4" href="/signup" className="btn btn-quiet">
              Create account
            </Link>
          </div>
          <ErrorList summary="Problem logging in" error={errors?.message} />
          <p>
            <Link href="/forgot-password" className="link text-sm">
              Forgot password?
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  )
}
