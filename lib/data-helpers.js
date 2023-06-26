export const prependAndDedupe = (item, items) =>
  [item].concat(items.filter(i => i !== item))

export const convertNodeListToCheckedValues = list => {
  let x = []
  list.forEach(el => {
    if (el.checked) x.push(el.value)
  })
  return x
}

export const profileContextObject = profileResponseData => {
  let { user_decks, ...user_profile } = profileResponseData
  if (!user_profile) return { user_profile: null, user_decks: [] }
  if (!user_decks) return { user_profile, user_decks: [] }

  return { user_profile, user_decks }
}
