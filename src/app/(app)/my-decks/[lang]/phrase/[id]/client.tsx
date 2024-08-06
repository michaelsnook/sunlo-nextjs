'use client'

import { AddCardButtonsSection, SectionSeeAlsos } from 'components/big-phrase'
import EditCardStatusButtons from 'components/edit-status-buttons'
import SectionTranslations from 'components/translations-section'
import TinyPhrase from 'components/tiny-phrase'
import Loading from 'components/loading'
import { useDeckData, useLanguageData } from 'lib/hooks'

export default function Client({ pid }) {
  const phrase = useLanguageData()?.phrases[pid] || null
  const card = useDeckData()?.cards[pid] || null

  return !phrase ? (
    <Loading />
  ) : (
    <main className="card-white">
      {!phrase ? null : (
        <>
          <h2 lang={phrase.lang} className="h3 font-bold">
            <TinyPhrase lang={phrase.lang} text={phrase.text} />
          </h2>
          <SectionTranslations phrase={phrase} />
          <SectionSeeAlsos seeAlsos={phrase?.relation_pids} />
          {card ? (
            <EditCardStatusButtons pid={phrase?.id} />
          ) : (
            <AddCardButtonsSection
              phrase_id={pid}
              lang={phrase.lang}
              onClose={() => {}}
            />
          )}
        </>
      )}
    </main>
  )
}
