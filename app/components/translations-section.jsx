'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import TinyPhrase from './TinyPhrase'
import supabase from 'lib/supabase-client'
import Modal from 'react-modal'
import { SelectLanguageYouKnow } from 'app/(app)/my-decks/[lang]/new-card/form'
import Loading from 'app/loading'
import toast from 'react-hot-toast'

export default function SectionTranslations({
  translations,
  lang,
  phraseId,
  phraseText,
}) {
  const queryClient = useQueryClient()
  const [translationLang, setTranslationLang] = useState()
  const [isModalOpen, setIsModalOpen] = useState()
  const addTranslation = useMutation({
    mutationFn: async text => {
      console.log(`Running mutation with`, text, translationLang, phraseId)
      const { data, error } = await supabase
        .from('phrase_translation')
        .insert({
          phrase_id: phraseId,
          lang: translationLang,
          text,
        })
        .select()
      if (error) throw error
      console.log(`The Data`, data)
      return data[0]
    },
    onSuccess: data => {
      console.log(`onSuccess with data`, data)
      toast.success('Added a new translation')
      queryClient.invalidateQueries({ queryKey: ['phrase', phraseId] })
      setIsModalOpen(false)
    },
  })

  return (
    <>
      <Modal
        className="page-card"
        overlayClassName="bg-base-content/70 fixed top-0 bottom-0 left-0 right-0 flex place-items-center"
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <h1 className="h2">Add a translation for &ldquo;{phraseText}&rdquo;</h1>
        <form
          onSubmit={e => {
            e.preventDefault()
            console.log(`Submitting form with`, e)
            addTranslation.mutate(e.target.translation_text.value)
          }}
        >
          <fieldset className="space-y-4" disabled={addTranslation.isLoading}>
            <div className="form-control">
              <label>Into which language?</label>
              <SelectLanguageYouKnow
                disabledLang={lang}
                onChange={val => setTranslationLang(val.value)}
              />
            </div>
            <div className="form-control">
              <label>What is the translation?</label>
              <textarea className="s-input" name="translation_text" />
            </div>
            {/*<div className="text-sm">
              Is there a more literal translation that might help understand the
              meaning?
            </div>*/}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={addTranslation.isLoading}
            >
              {addTranslation.isLoading ? <Loading /> : `Submit translation`}
            </button>
            {addTranslation.error && (
              <div className="alert alert-error">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {addTranslation.error.code === '23505'
                    ? `This translation already exists for this phrase`
                    : addTranslation.error.message}
                </div>
              </div>
            )}
          </fieldset>
        </form>
      </Modal>
      {translations?.length > 0 ? (
        <>
          <p className="mt-6 font-bold text-base-content/70 text-sm">
            Translations{' '}
            <button
              onClick={() => {
                console.log('click')
                setIsModalOpen(true)
              }}
            >
              <PlusCircleIcon />
            </button>
          </p>
          <ul className="text-2xl font-bold">
            {translations.map(trans => (
              <li lang={trans.lang} key={`translation-${trans.id}`}>
                <TinyPhrase {...trans} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-base-content/70">
          There aren&apos;t any translations sorry
        </p>
      )}
    </>
  )
}

const PlusCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
)
