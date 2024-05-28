const TinyPhrase = ({ lang, text, children }) => (
  <span>
    {children}
    {lang ? <span className="text-gray-500">[{lang}]&nbsp;</span> : null}
    &ldquo;{text}&rdquo;
  </span>
)

export default TinyPhrase
