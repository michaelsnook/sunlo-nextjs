type ErrorListProps = {
  summary?: string
  error?: Object
  errors?: Object[]
  asCard?: boolean
}

const ErrorList = ({ summary, error, errors, asCard }: ErrorListProps) => {
  // convert neively-passed error objects to strings
  const errorString = JSON.stringify(error)

  return !error && !errors?.length ? null : (
    <div className={`${asCard ? 'big-card' : ''} mt-6 mb-2`}>
      {summary ? <p className="font-bold text-error/60">{summary}</p> : null}
      <ul className="pl-5 text-error/60 list-disc">
        {errorString ? <li key={errorString}>{errorString}</li> : null}
        {errors
          ? errors.map(m => (
              <li key={JSON.stringify(m)}>{JSON.stringify(m)}</li>
            ))
          : null}
      </ul>
    </div>
  )
}

export default ErrorList
