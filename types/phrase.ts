export type Translation = {
  id: number
  text: string
  lang: string
  phrase_id: string
}

export type Phrase = {
  id: string
  text: string
  lang: string
  translations?: Translation[] | []
  see_alsos?: Phrase[] | []
}
