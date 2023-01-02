export function TinyPhrase({ lang, text }) {
  return (
    <>
      [{lang}] {text}
    </>
  )
}

export default function PhraseCardSmall({ text, lang, translations }) {
  return (
    <div className="p-4">
      <p lang={lang} className="mb-2 font-bold">
        {text}
      </p>
      {translations && translations?.length > 0 ? (
        <ul>
          {translations.map(({ node }) => (
            <li lang={node.lang} key={`translation-${node.id}`}>
              <TinyPhrase {...node} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
