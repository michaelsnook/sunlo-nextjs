# README for Data handling

## Reading this folder:
1. Supabase-JS client.
1. Fetchers - async functions that fetch data for either the client or the server. RLS is used everywhere so you can write them optimistically for authenticated users and they will just not return any rows for protected tables. Fetcher functions must always shape the data into something useful, and they should use types.
1. Hooks - client-side hooks that wrap `useQuery` from tanstack/query.

```javascript
const { status, data, error } = useSomeData()
```

These hooks also include configuration options for the client side cache, e.g. setting stale-time for different types of data.

