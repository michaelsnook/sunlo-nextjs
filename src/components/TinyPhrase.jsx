const TinyPhrase = ({ lang, text }) => (
  <span lang={lang} className="space-x-2">
    {lang && (
      <div className="badge badge-neutral group-hover:badge-outline font-mono font-normal transition-none">
        {lang}
      </div>
    )}{' '}
    <span>&ldquo;{text}&rdquo;</span>
  </span>
)

export default TinyPhrase