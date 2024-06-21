import Link from 'next/link'
import { GarlicBroccoli } from 'app/components/Garlic'

export default function Page() {
  return (
    <>
      <main className="flex flex-row flex-wrap gap-4 mb-8 @xl:my-20">
        <div className="space-y-4 flex flex-col basis-11/12 @xl:basis-3/5 justify-center mx-auto max-w-[537px]">
          <h1 className="text-4xl text-center @xl:text-start @xl:h-24 @xl:mt-16">
            Sunlo is a social
            <br />
            language&nbsp;learning app
          </h1>
          <p className="text-xl @xl:h-[120px] text-center @xl:text-start">
            Create your own flash cards, pick from a crowd-sourced pool, or send
            your friend some key phrases to help them learn.
          </p>
        </div>
        <div className="space-y-4 @xl:basis-1/3 flex-none text-center mx-auto">
          <GarlicBroccoli className="mx-auto" />
          <Link
            tabIndex={1}
            href="/login"
            className="btn btn-lg btn-primary btn-outline bg-white focus:shadow focus:shadow-white"
          >
            Log in or sign up &rarr;
          </Link>
        </div>
      </main>

      <div className="w-app bg-black/30 text-warning alert">
        <p className="text-center">
          ⚠️ Sunlo is under development; it is incomplete but most of
          what&apos;s there should work, so if you do spot a problem, please let
          me know! ⚠️
        </p>
      </div>
    </>
  )
}
