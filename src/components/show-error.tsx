import type { PropsWithChildren } from 'react'

/*
  If the error message passed as `children` is nullable, we can simply use:

    <ShowError>{some nullable message}</ShowError>

  But when we want to put some text directly in the template, like `Error: ${message}` it will mean
  that `children` is never null, so we add the `show` prop:

    <ShowError show={!!error}>Error submitting form: {error.message}</ShowError>
*/

export default function ShowError({
  show = null,
  children = null,
}: PropsWithChildren<{ show?: boolean | null }>) {
  // if show is "false", don't show. if show is true, show it.
  // if show us not set, then show if there's content to show.
  if (show === false) return null
  if (show === null && !children) return null
  return (
    <div className="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 flex-shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div>{children || `An unknown error has occurred (sorry)`}</div>
    </div>
  )
}
