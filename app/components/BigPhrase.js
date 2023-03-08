'use client'

export function TinyPhrase({ lang, text }) {
  return (
    <>
      [{lang}] {text}
    </>
  )
}

export default function BigPhrase({ phraseID }) {
  const { data, status, error } = usePhrase(phraseID)
  const translations = data.cardTranslationCollection?.edges ?? null

  return (
    <div
      className={`card p-4 shadow-lg hover:bg-primary hover:text-white mb-4 w-full inline-block`}
    >
      <p lang={data.lang} className="mb-2 font-bold">
        {emoji}
        <TinyPhrase {...data} />
      </p>
      {translations?.length > 0 ? (
        <ul>
          {translations.map(({ node }) => (
            <li lang={node.lang} key={`translation-${node.id}`}>
              <TinyPhrase {...node} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">There aren't any translations sorry</p>
      )}
    </div>
  )
}
