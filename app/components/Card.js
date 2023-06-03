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

export default function Card({ status, phrase }) {
  const { emoji, classString } = readStatus(status)
  // console.log(`card phrase is:`, phrase)

  return (
    <div
      className={`card p-4 ${classString} shadow-lg hover:bg-primary hover:text-white mb-4 w-full inline-block`}
    >
      <p lang={phrase?.lang} className="mb-2 font-bold">
        {emoji}
        <TinyPhrase {...phrase} />
      </p>
      {phrase?.translations?.length > 0 ? (
        <ul>
          {phrase.translations.map(trans => (
            <li lang={trans.lang} key={`translation-${trans.id}`}>
              <TinyPhrase {...trans} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">
          There aren&apos;t any translations sorry
        </p>
      )}
    </div>
  )
}
