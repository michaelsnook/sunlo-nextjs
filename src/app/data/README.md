# README for Data handling

1. We're using the supabase-JS client for everything, client and server/edge alike.
1. Authenticated operations (reading from `user_card`, `user_deck` or `user_profile`) are all client side run through `tanstack/query` because full SSG is required for the Tauri build.
1. Postgres RLS is used everywhere so you can write fetchers against any data and get back whatever is available to the user, just be mindful of left-joins, and know that useQuery is going to cache these partial or empty responses like full data, so we have to invalidate queries when we log in, or make sure they depend on/observe some value that will change when we log in like the user ID.
1. `pnpm types` will ask Supabase to generate a new types file any time you modify one of the views. You can access them with the `Tables<'user_deck_plus'>` and `TablesInsert<'user_deck'>` style shortcuts, but generally when something gets used out in component-land we'll give it a handy alias in `types/main.ts`.
1. Hooks - client-side hooks that wrap `useQuery` from @tanstack/query.
1. **Verson 0.4 Data Hoisting**: we are about halfway through a chunked migration of all the data handling throughout the app, removing the old `client-types.ts` and the individual-datapoint hooks like `usePhrase(pid)`. Instead we want to use a single fetch/query for all the public data about a certain language, and then a second query for all the authenticated data about that language (the deck). The pages/components pull from this single object to get the data they need to render the UI, and after a mutation we invalidate the entire cache (or just the user cache, if the operation only affected user data). If you need to access some complex set of data in a component, you have a few options:
   1. Create a new hook like `useSomeNewDeckInfo()` that does what all the other hooks do: pass a selector to `useDeckQuery`. If you can do this with a selector (maybe a memoised one) then good.
   1. Can this be done by adding a new field to the view we're querying? And sometimes it's easier to modify the view that we're reading from, like `deck_positive_reviews_last_7_days` instead of doing map/reduce inside your react component 😅 we can leverage the power of the typed Supabase client and the views-exposed-to-the-api pattern to make it so that lots of components don't need to fetch the whole data-tree associated with something, they can just fetch from its `*_plus` view and access the metadata they need.
      - Here is [a commit showing this exact change](https://github.com/michaelsnook/sunlo-nextjs/pull/112/commits/5d1ac2e7f21dd7d34bac12d65a633465ae2fcf32) where we were able to remove an entire hook, query, request, loading state, and brittle js math by adding a couple fields of metadata to the `user_deck_plus` view. If you can safely consider it "metadata" and not its own separate object, then add it to the metadata. (These views can get really fat before performance will become an issue.)
1. There is an optional useLangParam in all the hooks so it will default to fetching from wherever you are in the URL tree, e.g. `useDeckMeta()` will assume you want English if your URL location is `/home/eng`, but if you want another deck's metadata, you can get it with `useDeckMeta('ben')` (or if you have useProfile loaded already, get it from `profile.decks['ben']`)
1. Here's the full tree of the way we access data:
   - `ProfileFull`, contains a map of `DeckMeta`s (this is a view)
   - `DeckLoaded`, contains the big pre-loaded chunk of deck data, not _really_ meant to be accessed in components
     - `DeckMeta` will return and subscribe to `deck.meta`
     - `DeckPids` a list of phrase IDs in the deck
     - `DeckCards` for when you need the full card tree; returns a json map of cards
     - `Card(pid): CardFull` just `deck.cards[pid]`, this is a `CardFull` including your reviews, notes about the card, and other card data that may be more granular on the server
     - `ReviewsCollated`
   - `LanguageLoaded` much liked `DeckLoaded` but for the tree of public content
     - `LanguageMeta` -- What's it called and how many phrases are there to learn?
     - `LanguagePids` when you want to loop through the whole thing
     - `LanguagePhrases` a json map of all the phrases
     - `Phrase(pid): PhraseFull` a `language.phrases[pid]` that includes all the translations and related phrases and so on
1. And the following query Keys:
   - `[ 'user', lang ]` -- all the deck data
   - `[ 'user', 'profile' ]` -- the user ID. We put the uid in the key so we can watch when it changes
   - `[ 'user', 'reviews', date ]` -- idk if we should be doing reviews differently like this or not, but I don't want to have to reload the entire deck every time you submit a review; that seems nuts.
   - `[ 'language', lang ]` -- the whole language
1. Then use uptimistic updates and stuff the data back in where it goes, or just refetch the whole deck! it's not so expensive to do.
