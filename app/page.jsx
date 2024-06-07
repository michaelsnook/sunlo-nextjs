import Link from 'next/link'
import { GarlicBroccoli } from 'app/components/Garlic'

export default function Page() {
  return (
    <main className="container grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-8 md:gap-12 lg:gap-20">
      <article className="pt-20 md:pt-4 md:pb-10 grid grid-cols-1 gap-6 col-span-3 lg:col-span-4 place-content-center">
        <h1 className="text-4xl">
          Sunlo is a social
          <br />
          language&nbsp;learning app
        </h1>
        <p className="text-xl">
          Create your own flash cards, pick from a crowd-sourced pool, or send
          your friend some key phrases to help them learn.
        </p>
      </article>
      <aside className="py-5 px-0 md:px-3 lg:px-5 col-span-3">
        <div className="justify-center flex flex-col gap-2 content-center">
          <GarlicBroccoli size={180} />

          <Link
            href="/login"
            className="btn btn-lg btn-outline btn-primary bg-white"
          >
            Log in or sign up &rarr;
          </Link>
        </div>
      </aside>
    </main>
  )
}
