import languages from './languages'

export const staticMenu = {
  name: 'Menu',
  links: [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Log in or sign up',
      href: '/login',
    },
    {
      name: 'Browse Languages',
      href: '/language',
    },
  ],
}

export const convertDecksToMenu = decks => {
  return !decks?.length
    ? {
        name: 'My decks',
      }
    : {
        name: 'My decks',
        links: decks.map(deck => {
          return {
            name: languages[deck.lang],
            href: `/my-decks/${deck.lang}`,
          }
        }),
      }
}
