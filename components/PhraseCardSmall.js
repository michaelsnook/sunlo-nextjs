export default function PhraseCardSmall({ text, lang, translations }) {
  return (
    <>
      <p lang={lang} className="mb-2 font-bold">
        {text}
      </p>
      {translations && translations?.length > 0 ? (
        <ul>
          {translations.map(t => (
            <li lang={t.lang} key={`translation-${t.id}`}>
              ({t.lang}) {t.text}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  )
}
