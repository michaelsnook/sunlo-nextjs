const ErrorList = ({ summary, error, errors }) => {
  const pickSummary =
    summary ?? error?.message ?? error?.response?.errors[0]?.message ?? null
  const displaySummary = pickSummary ? pickSummary.split(':')[0] : null
  // convert naively-passed error objects to strings
  const errorString = JSON.stringify(error, null, 2)

  return !error && !errors?.length ? null : (
    <div className="ErrorList mb-2 mt-6 w-full rounded-lg border-error-content bg-base-content/80 p-4">
      {displaySummary ? (
        <p className="inline border-b border-error font-bold text-error">
          Error: {displaySummary}
          <br />
        </p>
      ) : null}
      <ul className="flex list-disc flex-col pl-5 text-error">
        <pre>
          {errorString ? <p>{errorString}</p> : null}
          {errors
            ? errors.map(m => (
                <li key={JSON.stringify(m)}>{JSON.stringify(m, null, 2)}</li>
              ))
            : null}
        </pre>
      </ul>
    </div>
  )
}

export default ErrorList
