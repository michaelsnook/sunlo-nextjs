import languages from 'lib/languages'

export default function SelectMultipleLanguagesInput({
  label = 'What other languages do you know?',
  selectedLanguages,
  setSelectedLanguages,
  except,
}) {
  const handleSelectedLanguage = lang => {
    setSelectedLanguages([
      lang,
      ...selectedLanguages.filter(l => typeof l === 'string' && l !== lang),
    ])
  }
  const handleRemoveLanguage = lang => {
    setSelectedLanguages([
      ...selectedLanguages.filter(l => typeof l === 'string' && l !== lang),
    ])
  }

  const handleChange = event => {
    const lang = event.target.value
    if (event.target.checked) {
      handleSelectedLanguage(lang)
    } else {
      handleRemoveLanguage(lang)
    }
  }

  return (
    <>
      <label htmlFor="languages_spoken" className="px-3 font-bold">
        {label}
      </label>
      <div className="h-40 overflow-auto rounded border py-3">
        {Object.keys(languages).map(k => (
          <p key={`languages-spoken-${k}`} className="flex">
            <label className="w-full px-3 py-1 has-[:checked]:bg-primary has-[:checked]:text-white">
              <input
                type="checkbox"
                className="mr-2 rounded"
                value={k}
                name="languages_spoken"
                onChange={handleChange}
                defaultChecked={
                  selectedLanguages.indexOf(k) !== -1 || k === except
                }
              />
              {languages[k]}
            </label>
          </p>
        ))}
      </div>
    </>
  )
}
