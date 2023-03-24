// @ts-ignore
/*
import type { Maybe } from 'app/data/gql/graphql'

type ErrorListProps = {
  summary: Maybe<string>
  error: Maybe<any>
  errors: Maybe<Array<any>>
}
*/
// const ErrorList = ({ summary, error, errors }: ErrorListProps) => {
const ErrorList = ({ summary, error, errors }) => {
  const pickSummary =
    summary ?? error?.message ?? error?.response?.errors[0]?.message ?? null
  const displaySummary = pickSummary ? pickSummary.split(':')[0] : null
  // convert naively-passed error objects to strings
  const errorString = JSON.stringify(error, null, 2)

  return !error && !errors?.length ? null : (
    <div className="ErrorList border-gray-900 p-4 rounded-lg mt-6 mb-2 bg-gray-700 w-full">
      {displaySummary ? (
        <p className="font-bold text-error border-b border-error inline">
          Error: {displaySummary}
          <br />
        </p>
      ) : null}
      <ul className="pl-5 text-error list-disc w-full">
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
