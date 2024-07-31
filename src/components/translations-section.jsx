'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import TinyPhrase from './tiny-phrase'
import supabase from 'lib/supabase-client'
import Modal from 'react-modal'
import { SelectLanguageYouKnow } from 'app/(app)/my-decks/[lang]/new-card/form'
import Loading from 'components/loading'
import toast from 'react-hot-toast'
import ShowError from './show-error'

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
        className="page-card w-app"
        overlayClassName="bg-black/70 fixed top-0 bottom-0 left-0 right-0 flex place-items-center backdrop-blur-sm"
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false)
          addTranslation.reset()
        }}
      >
        <h1 className="h2">Add a translation for &ldquo;{phraseText}&rdquo;</h1>
        <form
          onSubmit={e => {
            e.preventDefault()
            console.log(`Submitting form with`, e)
            addTranslation.mutate(e.target.translation_text.value)
          }}
        >
          <fieldset className="space-y-4" disabled={addTranslation.isPending}>
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
              disabled={addTranslation.isPending}
            >
              {addTranslation.isPending ? <Loading /> : `Submit translation`}
            </button>
            <ShowError show={!!addTranslation.error}>
              {addTranslation.error?.code === '23505'
                ? `This translation already exists for this phrase`
                : addTranslation.error?.message}
            </ShowError>
          </fieldset>
        </form>
      </Modal>
      <p className="mt-6 text-sm font-bold text-base-content/70">
        Translations{' '}
        <button
          onClick={() => {
            setIsModalOpen(true)
          }}
          className="rounded-full align-text-bottom hover:outline"
        >
          <PlusCircleIcon />
        </button>
      </p>
      {translations?.length > 0 ? (
        <ul className="text-2xl font-bold">
          {translations.map(trans => (
            <li lang={trans.lang} key={`translation-${trans.id}`}>
              <TinyPhrase {...trans} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-base-content/70">
          There aren&apos;t any translations yet for this phrase,{' '}
          <a className="s-link" onClick={() => setIsModalOpen(true)}>
            you can be the first to add one.
          </a>
        </p>
      )}
    </>
  )
}

const PlusCircleIcon = ({ className = 'size-4' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
)
