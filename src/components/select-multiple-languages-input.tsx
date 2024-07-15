/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/iA68C0NNoNu
 */
'use client'

import { useState } from 'react'
import { Label } from 'components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'components/ui/select'
import { Button } from 'components/ui/button'
import { allLanguageOptions } from 'lib/languages'
import languages from 'lib/languages'

export function SelectMultipleLanguagesInput({
  label = 'Which languages do you know?',
  labelClassName,
}) {
  const [selectedLanguages, setSelectedLanguages] = useState([])
  const handleSelectedLanguage = val => {
    if (!selectedLanguages.includes(val)) {
      setSelectedLanguages([val, ...selectedLanguages])
    }
  }
  const handleRemoveLanguage = lang => {
    setSelectedLanguages(selectedLanguages.filter(l => l !== lang))
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="language">{label}</Label>
        <Select onValueChange={handleSelectedLanguage}>
          <SelectTrigger id="language" aria-label="Language">
            <SelectValue placeholder="Select a language..." />
          </SelectTrigger>
          <SelectContent className="bg-base-100">
            {allLanguageOptions.map(option => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={selectedLanguages.includes(option.value)}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {selectedLanguages.map(lang => {
          return (
            <div key={lang} className="flex items-center gap-2">
              <Button
                variant="outline"
                className="bg-background flex items-center gap-2 hover:bg-red-500 hover:text-red-50 rounded-full"
                size="sm"
                onClick={() => handleRemoveLanguage(lang)}
              >
                {languages[lang]}
                <XIcon className="w-3 h-3" />
                <span className="sr-only">Remove {languages[lang]}</span>
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
