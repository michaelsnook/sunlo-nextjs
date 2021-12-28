const DevData = ({ data }) => (
  <div className="rounded-md shadow-2xl bg-gray-800 mt-4">
    {data.map(([i, j]) => (
      <span key={i} className="overflow-hidden max-w-prose">
        <h3 className="px-2 py-1 text-white bg-green-800">{i} data object</h3>
        <small className="text-white px-4 py-2 overflow-hidden">
          {JSON.stringify(j)}
        </small>
      </span>
    ))}
  </div>
)

export default DevData
