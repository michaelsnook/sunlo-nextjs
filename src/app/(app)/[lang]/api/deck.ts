import { useMutation } from '@tanstack/react-query'
// postNewDeck
async function postInsertDeck() {}
function cacheDeck(data): void {}
// createNewDeck
function useInsertDeck() {
  return useMutation({
    mutationKey: [],
    mutationFn: () => {},
    onSuccess: cacheNewDeck,
  })
}
// update deck: nope
