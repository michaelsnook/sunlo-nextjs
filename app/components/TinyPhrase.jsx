const TinyPhrase = ({ lang, text, children }) => (
  <span>
    {children}
    {lang ? <span className="opacity-70">[{lang}]&nbsp;</span> : null}
    &ldquo;{text}&rdquo;
  </span>
)

export default TinyPhrase
