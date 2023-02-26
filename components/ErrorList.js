const ErrorList = ({ summary, error, errors, asCard }) => {
  // convert neively-passed error objects to strings
  const errorString = typeof error === 'object' ? JSON.stringify(error) : error

  return !error && !errors?.length ? null : (
    <div className={`${asCard ? 'big-card' : ''} mt-6 mb-2`}>
      {summary ? <p className="font-bold text-red-600">{summary}</p> : null}
      <ul className="pl-5 text-red-600 list-disc">
        {errorString ? <li key={errorString}>{errorString}</li> : null}
        {errors ? errors.map(m => <li key={m}>{m}</li>) : null}
      </ul>
    </div>
  )
}

export default ErrorList
