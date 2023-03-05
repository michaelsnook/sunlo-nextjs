# README for Data handling

## Reading this folder:

_NB: currently the Hooks and Fetchers are both in hooks.js; the description below is a bit optimistic._

1. Queries - graphql queries expressing the structure of data requested/returned from the postgres database, [handled by `pg_graphql`](https://github.com/supabase/pg_graphql).

There are two main categories of queries, for public data or for user data. **Public queries** look at Languages, which contain Phrases, which contain Translations and See-Alsos (other phrases). **User data queries** look at Decks (when a User is learning a Language), which contain Cards (when a user is learning/has-learned a Phrase), and a User's Profile information.

2. Fetchers - async functions that wrap [`request` from `graphql-request`](https://github.com/jasonkuhrt/graphql-request#quick-start), in this format:

```javascript
const data = await request({
  url: endpoint,
  document: someDataQuery,
  variables: variables,
  requestHeaders: headers,
})
```

Fetchers for user data also await `supabase.auth.getSession()` and include the `auth_token`.

If data gets reshaped or unpacked after the request, it happens here so the client side cache keeps shaped data.

3. Constants - the API URL, public key, default headers. The main export here is a convenience function, `requestOptions(optionalToken)` which returns the fetch URL and the requestHeaders object for use in `request({ ...options })`, adding an `Authorization` header if a token is passed.

```javascript
const { url, requestHeaders } = requestOptions(optionalToken)
```

4. Hooks - client-side hooks that wrap [`useQuery` from `react-query`](https://tanstack.com/query/v4/docs/react/quick-start)

```javascript
const { status, data, error } = useSomeData()
```

These hooks also include configuration options for the client side cache, e.g. setting stale-time for different types of data.
