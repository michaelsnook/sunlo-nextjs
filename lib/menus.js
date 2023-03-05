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

export const convertDecksToMenu = edges => {
  console.log(`convertDecksToMenu, edges`, edges)
  return !edges?.length
    ? {
        name: 'My decks',
      }
    : {
        name: 'My decks',
        links: edges.map(edge => {
          return {
            name: languages[edge.node.lang],
            href: `/my-decks/${edge.node.lang}`,
          }
        }),
      }
}
