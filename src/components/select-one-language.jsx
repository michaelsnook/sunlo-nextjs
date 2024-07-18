import { allLanguageOptions } from 'lib/languages'

export default function SelectOneLanguage({ value, setValue }) {
  return (
    <select
      name="language_primary"
      defaultValue={value}
      className="s-input"
      onChange={e => setValue(e.target.value)}
    >
      <option value="">-- select one --</option>
      {allLanguageOptions.map(l => (
        <option key={l.value} value={l.value}>
          {l.label}
        </option>
      ))}
    </select>
  )
}
