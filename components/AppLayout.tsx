import { ReactElement, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import menus from '~lib/menus'

function Sidebar({ user, profile, decks }): ReactElement {
  const [isOpen, setIsOpen] = useState()

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 w-80 p-3 bg-blue-10 h-screen shadow-md flex flex-col gap-4"
    >
      <p>{profile?.username}</p>
      <p>{user?.email}</p>
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
        <button type="submit" size="xs" variant="reset">
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
}): ReactElement {
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
      <div className="flex flex-row">
        <Sidebar />
        <div className="ml-80 flex-grow py-6 px-6">{children}</div>
      </div>
    </>
  )
}
