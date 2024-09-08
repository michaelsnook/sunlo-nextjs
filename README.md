This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The back-end consists of a Supabase instance with a postgrest server we fetch to/from using the supabase-js client.

## Getting Started

The first time you run the server, you'll need to make sure you're running a modern nodejs (18+) and install packages

```bash
pnpm install
```

Set the environment variables

```bash
cp .env.example .env.local
```

And then enter the supabase API url and public key.

Then you can install npm packages and run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This should be all you need to do to work with the interface.

### Uncommitted

The state of the database isn't commited to the repo yet. There are some Supabase types but they are outdated and now incomplete. But I'm not working with other devs and for this part of development I don't even need to use a local copy of the database, so I haven't bothered to figure out and start using Supabase's particular flavour of managing migrations. (By the time we get to production, we may be using something else anyway 🤷)

As a result, you should request access to the Supabase project in order to see what fields and types we have there. Here is the general outline of the database:

- `user_profile`, `user_deck`, `user_card`, `user_card_review` -- these are the user data tables that are owned by a specific user. They all have a `uid` column which is their auth user's ID, and RLS protects from anyone else reading or writing to these records.
- `public_profile`, `language`, `phrase`, `phrase_translation`, `phrase_relation` -- this is the public content of the app. Unauthenticated visitors should be able to view and browse this information, and it should be available as a public API if anyone wants it. Logged-in users can write to these tables (except `language`, for some reason 🤔). At some point we may introduce moderation and things will change drastically but for now this is all open.
  - These tables shouldn't contain any PII but they do contain an `added_by` reference to a uid, which is perhaps a leak... (perhaps to be filtered out by only exposing the `*_plus` views to the API...)
- `language_plus`, `user_deck_plus`, `user_card_review_plus`, `phrase_plus`, `card_plus` -- these `*_plus` relations are views meant for the client application to more easily fetch collated and sorted data from the database. It's useful to know how many people are learning a certain language, or which of my decks I reviewed most recently, and this is really the kind of logic that databases and query languages are better at then Javascript, so we put the logic in the database (preferring this over fatter fetcher functions with `supabase-js`'s extremely specific select/query language).

This naming convention of using `*_plus` views may want to change in the future. At the moment these are pretty 1-to-1 metadata enhancements so it's working fine but it may make sense to switch _all_ data access over to a separate schema or to separate things into public data and user data more explicitly, etc. **Update**: They have just released their [API hardening features](https://supabase.com/docs/guides/database/hardening-data-api) which may allow me to address this simply (maybe).

### With Local Supabase

If you are working with database migrations or sample data not suitable for the production database, you need to run Supabase locally, so you can follow [these instructions to run Supabase locally](https://supabase.com/docs/guides/getting-started/local-development#start-supabase-services) via Docker.

```bash
pnpx supabase start
```

The first time you run this it will download and build all the docker images for postgres, the postgrest server, the auth server, storage server, GraphQL API server, etc. After that, it will just start.

When your local supabase starts up it will spit out the environment variables you need for your environment file. You can either change your values in `.env.local` or add another file `.env.development.local` which overrides its values.

### Using Tauri for Native Apps

The app is set to deploy as static HTML outputs, so it should generally work
with the Tauri system for compiling to WASM/Rust. e.g. `pnpm tauri dev`,
`pnpm tauri android dev`, `pnpm tauri android open` and so on.
