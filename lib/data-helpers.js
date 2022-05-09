export const prependAndDedupe = (item, items) =>
  [item].concat(items.filter(i => i !== item))

export const convertNodeListToCheckedValues = list => {
  let x = []
  list.forEach(el => {
    if (el.checked) x.push(el.value)
  })
  console.log(x)
  return x
}

export const convertLanguageDataToLookupTable = data => {
  if (typeof data === 'undefined') return null
  let languageLookup = {}
  data.map(({ code, name }) => (languageLookup[code] = name))
  return languageLookup
}

// @@TODO: account for relateds, and offer filtering for relateds with
// translations within languages_spoken
// @@TODO: offer filtering see_also's within languages_spoken
export function deckDataShaper(data) {
  // turn the count into an integer and delete the old one
  data.cards_in_deck_count = data.cards_in_deck_count_object[0].count
  delete data.cards_in_deck_count_object
  // flag for deck_is_empty
  data.deck_is_empty = data.cards_in_deck_count === 0
  // destructure arrays from join tables in cards array
  data.cards = data.deck_memberships.map(i => {
    i.card.related = i.card.see_also?.map(j => {
      // select the proper phrase_id for the related phrases list
      return {
        phrase_id:
          i.card.id === j.to_phrase_id ? j.from_phrase_id : j.to_phrase_id,
      }
    })
    delete i.card.see_also
    return { status: i.status, ...i.card }
  })
  delete data.deck_memberships
  console.log('finishing datashaper', data)
  return data
}
