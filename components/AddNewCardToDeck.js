import { useState } from 'react'
import supabase from 'lib/supabase-client'
import { useGlobalState } from 'lib/global-store'

export default function AddNewCardToDeck({ lang }) {
  const { user, decks } = useGlobalState()
  const thisDeck = () => {
    decks.find(d => (d.lang = lang))
  }
  const [errors, setErrors] = useState()
  const [isSubmitting, setIsSubmitting] = useState()
  const onSubmit = e => {
    e.preventDefault()
    setIsSubmitting(true)
    const text = e.target.text.value
    const translation_text = e.target.translation_text.value
    const translation_lang = e.target.translation_lang.value
    const status = e.target.status.value
    const [newCard, setNewCard] = useState()
    const addToNewCard = data => {
      setNewCard(...newCard, ...data)
    }
    supabase
      .from('card_phrase')
      .upsert({ lang, text })
      .then(({ data, error }) => {
        console.log(error, data)
        if (error) {
          setErrors(error)
          setIsSubmitting(false)
          return
        }
        const phrase = data[0]
        setNewCard(phrase)
        const p0 = supabase
          .from('card_translation')
          .upsert({
            card_phrase_id: phrase.id,
            text: translation_text,
            lang: translation_lang,
          })
          .then(({ data, error }) => {
            console.log(data, error)
            if (error) {
              setErrors(error)
              setIsSubmitting(false)
              return
            }
          })
        const deck = thisDeck()
        const p1 = supabase
          .from('user_deck_card_membership')
          .upsert({
            deck_id: deck.id,
            card_id: phrase.id,
            status,
            auth_user_id: user.id,
          })
          .then(({ data, error }) => {
            console.log(data, error)
            if (error) {
              setErrors(error)
              setIsSubmitting(false)
              return
            }
          })
        Promise.all([p0, p1]).then(setIsSubmitting(false))
      })
  }

  return <p>Add</p>
}
