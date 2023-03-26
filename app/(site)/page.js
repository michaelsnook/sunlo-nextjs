import Link from 'next/link'
import Banner from 'app/components/Banner'
import Garlic from 'app/components/Garlic'

export default function SiteHome() {
  return (
    <Banner>
      <main className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-8 md:gap-12 lg:gap-20">
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
          <ul className="py-10 flex flex-col gap-2">
            <li className="ml-10">
              <Garlic size={120} />
            </li>
            <li>
              <Link
                href="/login"
                className="btn btn-lg btn-outline btn-primary bg-white"
              >
                Log in or sign up &rarr;
              </Link>
            </li>
          </ul>
        </aside>
      </main>
    </Banner>
  )
}
