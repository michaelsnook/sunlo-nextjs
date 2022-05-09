This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The public API key for the supabase connection is already in the repo; there's no setup needed, but you also have no special privileges on the database, other than the user account(s) you create and log into.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Current features (QA checklist)

- Create an account, log in and out, forgot password, change password, change account email
- Profile page: edit your display name, set your spoken languages and primary language
- Starting flow: a new or logged-in user can edit profile info, create decks, see any current profile information pre-filled
- Languages: browse the current set of languages, show a language's phrases on an index page with mini cards for each phrase
- [soon] Languages: search for phrases
- Cards: shows card phrase, translation, see also, dynamically load card data for see_also references
- [soon] Cards: card modal for any situation, responsive to user login and preferences, add card to deck and set its status, add a new card with translations
- Decks: see your list of decks
- [soon] Decks: create a new deck, deck view with size and status, pin your primary deck, deck-builder interface to browse existing cards and add them to your deck
- [later] Review workflow, friends mode, app localisation
