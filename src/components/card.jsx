import TinyPhrase from './tiny-phrase'

function readStatus(status) {
  if (!status) return { emoji: '', classString: '' }
  if (status === 'learned')
    return {
      emoji: `✅ `,
      classString: 'bg-success/20 hover:bg-success/30',
    }
  if (status === 'active')
    return {
      emoji: `📖 `,
      classString: 'bg-info/20 hover:bg-info/30',
    }
  return { emoji: `❌ `, classString: 'hover:bg-base-300' }
}

export default function Card({ status, phrase }) {
  const { emoji, classString } = readStatus(status)
  // console.log(`card phrase is:`, phrase)

  return (
    <div className={`alert ${classString} shadow-lg justify-start my-2`}>
      <div className="flex-none text-xl">{emoji}</div>
      <div className="block">
        <p lang={phrase?.lang} className="mb-2 text-xl font-bold">
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
          <p className="text-base-content/80 italic">
            There aren&apos;t any translations, sorry{' '}
            <span className="not-italic">😢</span>
          </p>
        )}
      </div>
    </div>
  )
}
