export const prependAndDedupe = (item, items) =>
  [item].concat(items.filter(i => i !== item))

export const convertNodeListToCheckedValues = list => {
  let x = []
  list.forEach(el => {
    if (el.checked) x.push(el.value)
  })
  return x
}
