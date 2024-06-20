import Link from 'next/link'
import { GarlicBroccoli } from 'app/components/Garlic'

export default function Page() {
  return (
    <>
      <main className="flex flex-row flex-wrap gap-4 mb-8 sm:my-20">
        <article className="space-y-4 flex flex-col basis-11/12 sm:basis-3/5 justify-center mx-auto max-w-[537px]">
          <h1 className="text-4xl max-sm:text-center sm:h-24 sm:mt-12 md:mt-16">
            Sunlo is a social
            <br />
            language&nbsp;learning app
          </h1>
          <p className="text-xl sm:h-[120px] max-sm:text-center">
            Create your own flash cards, pick from a crowd-sourced pool, or send
            your friend some key phrases to help them learn.
          </p>
        </article>
        <aside className="space-y-4 sm:basis-1/3 flex-none text-center max-sm:mx-auto">
          <GarlicBroccoli className="mx-auto" />
          <Link
            href="/login"
            className="btn btn-lg btn-primary btn-outline bg-white"
          >
            Log in or sign up &rarr;
          </Link>
        </aside>
      </main>

      <div className="w-app md:max-w-[70cqw] bg-black/60 text-warning">
        <p className="p-4 text-center">
          ⚠️ Sunlo is under development; it is very incomplete but most of
          what&apos;s there should work so if you do spot a problem, please let
          me know! ⚠️
        </p>
      </div>
    </>
  )
}
