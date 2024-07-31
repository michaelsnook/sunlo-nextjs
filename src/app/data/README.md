# README for Data handling

1. We're using the supabase-JS client for everything, client and server/edge alike.
1. Authenticated operations (reading from `user_card`, `user_deck` or `user_profile`) are all client side; we haven't set up the middleware to do authenticated server-side data fetching and rendering.
1. Fetcher functions that are used by both client and server get their own functions in fetchers.js. Postgres RLS is used everywhere so you can write these functions optimistically for authenticated users and they will just not return any rows for protected tables unless the request is properly authenticated.
1. Fetcher functions must always shape the data into something useful, and these return types should use types defined in `types/main.ts`.
1. Supabase-generated types are imported into `main.ts` and either modified or re-exported as-is with more user friendly names.
1. Hooks - client-side hooks that wrap `useQuery` from @tanstack/query.
1. We're hosting the data needs as far up the chain as we can and using `queryClient.prefetchQuery` to unpack a whole deck or language into its component parts and then `queryClient.setQueryData` to fill up different indices like:
   - `'language', lang, 'meta'`
   - `'language', lang, 'all_pids'` (a single array)
   - `'language', lang, 'phrase', pid` (individual records for each phrase, including its translations and see-alsos) (
     - @@TODO: does this include the flag as to whether it's in the deck or not? only when hydratic from the client? does it get build from the deck's fetch so these queries are always consistent and 100% cache-able?)
   - `'deck', lang, 'meta'`
   - `'deck', lang, 'all_pids'`
   - `'deck', lang, 'card', pid` (with all the reviews attached)
   - `'deck', lang, 'all_reviews'` (not needed anymore since metadata contains totals?)
1. Then use uptimistic updates, and optionally refetch with more specific fetchers only when we hit problems.
