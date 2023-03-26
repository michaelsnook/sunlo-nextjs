export function TinyPhrase({ lang, text }) {
  return (
    <>
      [{lang}] {text}
    </>
  )
}

function readStatus(status) {
  if (!status) return { emoji: '', classString: '' }
  if (status === 'learned')
    return { emoji: `✅ `, classString: 'bg-success/20' }
  if (status === 'active') return { emoji: `📖 `, classString: 'bg-info/20' }
  return { emoji: `❌ `, classString: '' }
}

export default function PhraseCardSmall({ status, text, lang, translations }) {
  const { emoji, classString } = readStatus(status)
  return (
    <div
      className={`card p-4 ${classString} shadow-lg hover:bg-primary hover:text-white mb-4 w-full inline-block`}
    >
      <p lang={lang} className="mb-2 font-bold">
        {emoji}
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
