const TinyPhrase = ({ lang, text }) => (
  <span lang={lang} className="space-x-2">
    {lang && (
      <div className="badge badge-neutral font-mono font-normal transition-none group-hover:badge-outline">
        {lang}
      </div>
    )}{' '}
    <span>&ldquo;{text}&rdquo;</span>
  </span>
)

export default TinyPhrase
