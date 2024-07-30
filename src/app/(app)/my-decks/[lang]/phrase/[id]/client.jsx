'use client'

import { AddCardButtonsSection, SectionSeeAlsos } from 'components/big-phrase'
import EditCardStatusButtons from 'components/edit-status-buttons'
import SectionTranslations from 'components/translations-section'
import TinyPhrase from 'components/tiny-phrase'
import { usePhrase } from 'app/data/hooks'
import Loading from 'components/loading'
import Error from 'components/error'

export default function Client({ pid }) {
  const { data: phrase, error, isLoading } = usePhrase(pid)

  return isLoading ? (
    <Loading />
  ) : (
    <main className="card-white">
      {error ? (
        <Error>{error.message}</Error>
      ) : (
        <>
          <h2 lang={phrase.lang} className="h3 font-bold">
            <TinyPhrase lang={phrase.lang} text={phrase.text} />
          </h2>
          <SectionTranslations
            translations={phrase?.translations}
            lang={phrase.lang}
            phraseId={pid}
            phraseText={phrase.text}
          />
          <SectionSeeAlsos
            seeAlsos={phrase?.see_also_phrases}
            linkFactory={(lang, pid) => `/my-decks/${lang}/phrase/${pid}`}
          />
          {phrase?.card ? (
            <EditCardStatusButtons cardId={phrase?.card?.id} />
          ) : (
            <AddCardButtonsSection
              phrase_id={pid}
              user_deck_id={phrase?.card?.user_deck_id}
              onClose={() => {}}
            />
          )}
        </>
      )}
    </main>
  )
}
