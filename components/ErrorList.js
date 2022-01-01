const ErrorList = ({ summary, error, errors, asCard }) =>
  !error && !errors?.length ? null : (
    <div className={`${asCard ? 'big-card' : ''} mt-6 mb-2`}>
      {summary ? <p className="font-bold text-red-600">{summary}</p> : null}
      <ul className="pl-5 text-red-600 list-disc">
        {error ? <li key={error}>{error}</li> : null}
        {errors ? errors.map(m => <li key={m}>{m}</li>) : null}
      </ul>
    </div>
  )

export default ErrorList
