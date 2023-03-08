export function TinyPhrase({ lang, text }) {
  return (
    <>
      [{lang}] {text}
    </>
  )
}

function readStatus(status) {
  if (!status) return { emoji: '', classString: '' }
  if (status === 'learned') return { emoji: `✅ `, classString: 'bg-green-200' }
  if (status === 'active') return { emoji: `📖 `, classString: 'bg-blue-200' }
  return { emoji: `❌ `, classString: '' }
}

export default function Card({ status, cardPhrase }) {
  const { emoji, classString } = readStatus(status)
  const translations = cardPhrase?.cardTranslationCollection?.edges ?? null
  return (
    <div
      className={`card p-4 ${classString} shadow-lg hover:bg-primary hover:text-white mb-4 w-full inline-block`}
    >
      <p lang={cardPhrase?.lang} className="mb-2 font-bold">
        {emoji}
        <TinyPhrase {...cardPhrase} />
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
