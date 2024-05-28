const TinyPhrase = ({ lang, text, children }) => (
  <p className="block">
    {children}
    {lang ? <span className="text-gray-500">[{lang}]&nbsp;</span> : null}
    &ldquo;{text}&rdquo;
  </p>
)

export default TinyPhrase
