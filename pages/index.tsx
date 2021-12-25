import Link from 'next/link'
import SiteLayout from '~components/SiteLayout'

export default function Home(): JSX.Element {
  return (
    <SiteLayout>
      <main className="md:min-h-85vh text-white bg-primary pt-10 pb-10 md:pb-24 grid">
        <div className="container grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-8 md:gap-12 lg:gap-20 place-self-center">
          <article className="pt-20 md:pt-4 md:pb-10 grid grid-cols-1 gap-6 col-span-3 lg:col-span-4 place-content-center">
            <h1 className="text-4xl">
              Sunlo is a social
              <br />
              language&nbsp;learning app
            </h1>
            <p className="text-xl">
              Create your own flash cards, pick from a crowd-sourced pool, or
              send your friend some key phrases to help them learn.
            </p>
          </article>
          <aside className="py-5 px-0 md:px-3 lg:px-5 col-span-3">
            <ul className="py-10 flex flex-row gap-2">
              <li>
                <Link href="/auth">
                  <a className="btn btn-lg btn-outline btn-primary bg-white">
                    Log in or sign up &rarr;
                  </a>
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </main>
    </SiteLayout>
  )
}
