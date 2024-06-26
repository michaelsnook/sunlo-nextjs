import TinyPhrase from './TinyPhrase'

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
        <TinyPhrase {...phrase}>{emoji}</TinyPhrase>
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
        <p className="text-base-content/70 italic">
          There aren&apos;t any translations, sorry{' '}
          <span className="not-italic">😢</span>
        </p>
      )}
    </div>
  )
}
