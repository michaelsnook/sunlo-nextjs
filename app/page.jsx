import Link from 'next/link'
import { GarlicBroccoli } from 'app/components/Garlic'

export default function Page() {
  return (
    <>
      <main className="flex flex-row flex-wrap gap-4 justify-around">
        <article className="space-y-4 flex flex-col basis-11/12 sm:basis-3/5 justify-center">
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
        <aside className="space-y-4 sm:basis-1/3 flex-none text-center">
            <GarlicBroccoli />
            <Link
              href="/login"
              className="btn btn-lg btn-outline btn-primary bg-white"
            >
              Log in or sign up &rarr;
            </Link>
        </aside>
      </main>

      <div className="fixed top-0 left-0 right-0 bg-black/70 text-warning">
        <p className="md:container md:max-w-[70vw] p-4 text-center">
          ⚠️ Sunlo is under development; it is very incomplete but most of
          what&apos;s there should work so if you do spot a problem, please let
          me know! ⚠️
        </p>
      </div>
    </>
  )
}
