'use client'

import {
  AddCardButtonsSection,
  SectionSeeAlsos,
  SectionTranslations,
} from 'app/components/BigPhrase'
import TinyPhrase from 'app/components/TinyPhrase'
import { usePhrase } from 'app/data/hooks'

export default function Client({ pid }) {
  const {
    data: phrase,
    error: phraseError,
    status: phraseStatus,
  } = usePhrase(pid)

  return (
    phrase && (
      <main className="card-white">
        <h2 lang={phrase.lang} className="h3 font-bold">
          <TinyPhrase lang={phrase.lang} text={phrase.text} />
        </h2>
        <SectionTranslations translations={phrase?.translations} />
        <SectionSeeAlsos
          seeAlsos={phrase?.see_also_phrases}
          linkFactory={(lang, pid) => `/my-decks/${lang}/phrase/${pid}`}
        />
        <AddCardButtonsSection
          phrase_id={pid}
          user_deck_id={phrase?.card?.user_deck_id}
          onClose={() => {}}
        />
      </main>
    )
  )
}
