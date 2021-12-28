const ErrorList = ({ summary, error, errors }) =>
  !error && !errors?.length ? null : (
    <div>
      {summary ? <p className="font-bold text-red-600">{summary}</p> : null}
      <ul className="pl-5 text-red-600 list-disc">
        {error ? <li key={error}>{error}</li> : null}
        {errors ? errors.map(m => <li key={m}>{m}</li>) : null}
      </ul>
    </div>
  )

export default ErrorList
