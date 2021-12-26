import { ReactElement, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import menus from '~lib/menus'

function Sidebar(): ReactElement {
  const [isOpen, setIsOpen] = useState()

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 w-80 p-6 bg-[#efe9fb] h-screen shadow-md hidden md:flex flex-col gap-4"
    >
      <span className="h4 flex flex-row items-center">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11
              21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          ></path>
        </svg>
        &nbsp; Sunlo
      </span>
      {menus.map(menu => (
        <div key={menu.name}>
          <p className="font-bold my-4">{menu.name}</p>
          <ul className="flex flex-col gap-2">
            {menu.links?.map(i => (
              <li key={i.href}>
                <Link href={i.href}>{i.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p>
        <button className="btn btn-outline btn-neutral" type="submit">
          Sign out
        </button>
      </p>
    </nav>
  )
}

export default function AppLayout({
  image = `/images/sunlo-logo-color.png`,
  description = `Sunlo is a Social Language Learning App. Build a deck of flash cards, or help a friend learn phrases that will be useful from day one.`,
  title = `Sunlo, the Social Language Learning App`,
  children,
}: any): ReactElement {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:image" content={image} />
        <meta name="theme-color" content="#570df8" />
      </Head>
      <div className="flex flex-row gap-6 relative">
        <Sidebar />
        <div className="flex-grow py-6 px-6">{children}</div>
      </div>
    </>
  )
}
