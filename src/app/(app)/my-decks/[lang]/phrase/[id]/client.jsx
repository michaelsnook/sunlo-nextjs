'use client'

import { AddCardButtonsSection, SectionSeeAlsos } from 'components/big-phrase'
import EditCardStatusButtons from 'components/edit-status-buttons'
import SectionTranslations from 'components/translations-section'
import TinyPhrase from 'components/tiny-phrase'
import { usePhrase } from 'app/data/hooks'
import Loading from 'components/loading'
import ShowError from 'components/show-error'

export default function Client({ pid }) {
  const { data: phrase, error, isLoading } = usePhrase(pid)

  return isLoading ? (
    <Loading />
  ) : (
    <main className="card-white">
      <ShowError>{error?.message}</ShowError>
      {!phrase ? null : (
        <>
          <h2 lang={phrase.lang} className="h3 font-bold">
            <TinyPhrase lang={phrase.lang} text={phrase.text} />
          </h2>
          <SectionTranslations phrase={phrase} />
          <SectionSeeAlsos seeAlsos={phrase?.see_also_phrases} />
          {phrase?.card ? (
            <EditCardStatusButtons pid={phrase?.id} />
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
