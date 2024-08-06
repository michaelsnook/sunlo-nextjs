'use client'

import Loading from 'components/loading'
import ShowError from 'components/show-error'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postNewCard } from 'app/(app)/my-decks/[lang]/new-card/add-card'
import { toast } from 'react-hot-toast'
import EditCardStatusButtons from './edit-status-buttons'
import SectionTranslations from './translations-section'
import TinyPhrase from './tiny-phrase'
import Link from 'next/link'
import { cn, links } from 'lib/utils'
import { useDeckData, useLanguageData } from 'lib/hooks'

export const AddCardButtonsSection = ({ phrase_id, lang, onClose }) => {
  const queryClient = useQueryClient()
  const meta = useDeckData(lang)?.meta
  const makeNewCard = useMutation({
    mutationFn: status =>
      postNewCard({
        status,
        phrase_id,
        user_deck_id: meta?.id,
      }),
    onSuccess: data => {
      setTimeout(async () => {
        onClose()
      }, 5000)
      toast.success(`Card successfully added with status: "${data.status}"`)
      queryClient.invalidateQueries({ queryKey: ['deck', lang, 'loaded'] })
      queryClient.setQueryData(['card', data?.id], data)
      queryClient.invalidateQueries({
        queryKey: ['user_deck'],
        exact: false,
        refetchType: 'active',
      })
      const phrase = queryClient.getQueryData(['phrase', phrase_id])
      if (phrase) {
        queryClient.setQueryData(['phrase', phrase_id], {
          ...phrase,
          card: data,
        })
      }
      // console.log(`Return data from adding card:`, data)
    },
  })
  return (
    <div className="my-6 flex gap-8 text-2xl">
      {makeNewCard.isSubmitting ? (
        <Loading />
      ) : makeNewCard.error ? (
        <ShowError>{makeNewCard.error.message}</ShowError>
      ) : makeNewCard.isSuccess ? (
        <p className="text-lg">
          This phrase is in your deck with status: &ldquo;
          {makeNewCard.data?.status}
          &rdquo;.&nbsp;
          <a className="s-link text-primary" onClick={onClose}>
            Keep browsing.
          </a>
        </p>
      ) : (
        <>
          <button
            className={`btn btn-success btn-lg ${
              makeNewCard.isPending ? 'loading' : ''
            }`}
            role="button"
            onClick={() => makeNewCard.mutate('active')}
          >
            📖 Learn it!
          </button>
          <button
            className={`btn btn-error btn-lg ${
              makeNewCard.isPending ? 'loading' : ''
            }`}
            role="button"
            onClick={() => makeNewCard.mutate('skipped')}
          >
            ❌ Skip it
          </button>
        </>
      )}
    </div>
  )
}

export default function BigPhrase({
  user_deck_id,
  phrase_id,
  onClose,
  onNavigate,
  noBox,
}) {
  const phrase = useLanguageData()?.phrases?.[phrase_id]

  if (!phrase_id) throw new Error('no phrase info provided')
  if (phrase === null) throw new Error('no phrase info provided')
  if (phrase === null) return <Loading />

  const seeAlsos = phrase?.see_also_phrases

  if (phraseError) return <ShowError>{phraseError.message}</ShowError>

  return (
    <div
      className={cn(
        noBox ? '' : `card inline-block p-6 shadow-lg`,
        'mb-4 w-full'
      )}
    >
      {phrase ? (
        <>
          <h2 lang={phrase.lang} className="h3 font-bold">
            <TinyPhrase text={phrase.text} />
          </h2>
          <SectionTranslations phrase={phrase} />
          <SectionSeeAlsos seeAlsos={seeAlsos} onNavigate={onNavigate} />
          {!!phrase?.card ? (
            <EditCardStatusButtons pid={phrase_id} />
          ) : (
            <AddCardButtonsSection
              user_deck_id={user_deck_id}
              phrase_id={phrase_id}
              onClose={onClose}
            />
          )}
        </>
      ) : (
        <>could not load this phrase</>
      )}
    </div>
  )
}

export function SectionSeeAlsos({ seeAlsos }) {
  const phrases = useLanguageData()?.phrases || []
  return (
    <>
      <p className="mt-6 text-sm font-bold text-base-content/70">
        Related phrases
      </p>
      {seeAlsos.length ? (
        <ul className="text-xl/9">
          {seeAlsos.map(pid => (
            <li key={pid}>
              <Link
                className="group rounded p-2 hover:bg-primary hover:text-white"
                href={links.deckPhrase(phrases[pid].lang, pid)}
              >
                <TinyPhrase {...phrases[pid]} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6">none. Add one?</p>
      )}
    </>
  )
}
