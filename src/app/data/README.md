# README for Data handling

1. We're using the supabase-JS client for everything, client and server/edge alike.
1. Authenticated operations (reading from `user_card`, `user_deck` or `user_profile`) are all client side; we haven't set up the middleware to do authenticated server-side data fetching and rendering.
1. Fetcher functions that are used by both client and server get their own functions in fetchers.js. Postgres RLS is used everywhere so you can write these functions optimistically for authenticated users and they will just not return any rows for protected tables unless the request is properly authenticated.
1. Fetcher functions must always shape the data into something useful, and these return types should use types defined in `types/main.ts`.
1. Supabase-generated types are imported into `main.ts` and either modified or re-exported as-is with more user friendly names.
1. Hooks - client-side hooks that wrap `useQuery` from @tanstack/query.

```javascript
const { status, data, error } = useSomeData()
```

These hooks also include configuration options for the client side cache, e.g. setting stale-time for different types of data.
