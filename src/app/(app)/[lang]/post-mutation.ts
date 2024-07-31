import { useMutation } from '@tanstack/react-query'

// new language: nope
// update language: nope

// postNewPhraseCardTranslations, but restructure
async function postNewPhrase() {}
function cacheNewPhrase(): void {}
// addCardPhrase, but restructure
function useNewPhrase() {
  return useMutation({
    /*
    queryKey: [],
    queryFn: async () => {},
  */
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
  postNewPhrase,
  cacheNewPhrase,
  useNewPhrase,
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
