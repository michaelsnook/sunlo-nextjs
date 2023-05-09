This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The back-end consists of a Supabase instance with a postgrest server we fetch to/from using the supabase-js client.

## Getting Started

The first time you run the server, you'll need to make sure you're running a modern nodejs (18+) and install packages

```bash
npm install
```

Set the environment variables

```bash
cp .env.example .env.local
```

And then enter the supabase API url and public key.

Then you can install npm packages and run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### With Local Supabase

If you are working with database migrations or sample data not suitable for the production database, you need to run Supabase locally, so you can follow [these instructions to run Supabase locally](https://supabase.com/docs/guides/getting-started/local-development#start-supabase-services) via Docker.

```bash
npx supabase start
```

The first time you run this it will download and build all the docker images for postgres, the postgrest server, the auth server, storage server, GraphQL API server, etc. After that, it will just start.

When your local supabase starts up it will spit out the environment variables you need for your environment file. You can either change your values in `.env.local` or add another file `.env.development.local` which overrides its values.
