import { QueryClient, useMutation } from '@tanstack/react-query'
import { PhraseFull, uuid } from 'types/main'

// new language: nope
// update language: nope

// postNewPhraseCardTranslations, but restructure
async function postPhraseInsert(args) {}

function cachePhraseFull(phrase: PhraseFull, client: QueryClient): void {
  if (!phrase && phrase.relations && phrase.translations) return
  // upsert the individual cache entry
  client.setQueryData(['lang', phrase.lang, 'pid', phrase.id], phrase)
  // append the pid to the array (if needed)
  client.setQueryData(
    ['lang', phrase.lang, 'all_pids'],
    (allPids: Array<uuid>) => {
      if (phrase.id in allPids) return undefined
      return [phrase.id, ...allPids]
    }
  )
  // invalidate the metadata in case the phrase change alters it
  // TODO: this won't work yet bc the query needs to be "registered" somehow
  client.invalidateQueries({ queryKey: ['lang', phrase.lang, 'meta'] })
}

// current is addCardPhrase
function usePhraseInsert() {
  return useMutation({
    mutationKey: [],
    mutationFn: async args => await postPhraseInsert(args),
  })
}

// anon
async function postNewTranslation() {}
function cacheNewTranslation(): void {}
// addTranslation
function useNewTranslation() {
  return useMutation({})
}

function cacheNewSeeAlso(): void {}
async function postNewSeeAlso() {}
function useNewSeeAlso() {
  return useMutation({})
}

// user data now...

// It's not clear this part is needed... maybe just cache deck.lang[]s like with languages_spoken
/*

// anon update, anon insert
async function postUpsertProfile() {}
function cacheUpsertProfile(): void {}
// updateProfile, mainForm
function useUpsertProfile() {}

*/

// postNewDeck
async function postNewDeck() {}
function cacheNewDeck(): void {}
// createNewDeck
function useNewDeck() {
  return useMutation({})
}
// update deck: nope

// postNewCard
async function postNewCard() {}
function cacheNewCard(): void {}
// makeNewCard
function useNewCard() {
  return useMutation({})
}

// updateCardStatus
async function postUpdateCard() {}
function cacheUpdateCard(): void {}
// updateStatus
function useUpdateCard() {
  return useMutation({})
}

// postReview -- always an upsert
async function postUpsertReview() {}
function cacheUpsertReview(): void {}
// anon
function useUpsertReview() {
  return useMutation({})
}

export {
  postPhraseInsert,
  cachePhraseFull,
  usePhraseInsert,
  postNewTranslation,
  cacheNewTranslation,
  useNewTranslation,
  postNewSeeAlso,
  cacheNewSeeAlso,
  useNewSeeAlso,
  postNewDeck,
  cacheNewDeck,
  useNewDeck,
  postNewCard,
  cacheNewCard,
  useNewCard,
  postUpdateCard,
  cacheUpdateCard,
  useUpdateCard,
  postUpsertReview,
  cacheUpsertReview,
  useUpsertReview,
}
