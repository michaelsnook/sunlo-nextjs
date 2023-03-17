'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { staticMenu } from 'lib/menus'
import Garlic from 'app/components/Garlic'
import { useGlobalState } from 'lib/global-store'
import { usePathname } from 'next/navigation'
import languages from 'lib/languages'

const Navlink = ({ href, children }) => {
  const pathname = usePathname()
  return href !== pathname ? (
    <Link href={href} className="link-hover">
      {children}
    </Link>
  ) : (
    <a
      href="#"
      className="border-gray-400 pl-2 border-l-4 text-gray-600"
      disabled
    >
      {children}
    </a>
  )
}

export default function Sidebar({ shy = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false)
    }
  }, [pathname])

  const { user, profile, signOut, decks, isLoading } = useGlobalState()
  const myMenus = decks
    ? [
        {
          name: 'Your decks',
          href: '/my-decks',
          links:
            decks?.map(d => {
              return {
                name: languages[d.lang],
                href: d?.lang ? `/my-decks/${d.lang}` : '',
              }
            }) || [],
        },
        staticMenu,
      ]
    : [staticMenu]

  return (
    <>
      <SidebarOpener isOpen={isOpen} setIsOpen={setIsOpen} shy={shy} />
      <div
        className={`z-20 bg-black bg-opacity-50 pt-10 ${
          isOpen ? 'fixed' : 'hidden'
        } md:hidden top-0 left-0 right-0 bottom-0`}
        onClick={() => setIsOpen(false)}
      />
      <div className="bg-white">
        <nav
          aria-label="Main navigation"
          className={`overflow-y-auto overflow-x-hidden z-30 top-0 w-72 p-6 bg-primary/20 text-gray-800 h-screen ${
            isOpen ? 'fixed' : 'hidden'
          } ${shy && !isOpen ? '' : 'md:sticky md:flex'}  flex-col gap-4`}
        >
          <span className="h4 flex flex-row items-center">
            <Garlic size={50} />
            &nbsp; Sunlo
          </span>
          {isLoading ? null : (
            <>
              <Navlink href="/app/profile">
                <p>{profile?.username}</p>
                <p>{user?.email}</p>
              </Navlink>
              {myMenus.map(menu => (
                <div key={menu.name}>
                  <p className="font-bold my-4">
                    {menu.href ? (
                      <Navlink href={menu.href}>{menu.name}</Navlink>
                    ) : (
                      menu.name
                    )}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {menu.links?.map(i => (
                      <li key={i.href}>
                        <Navlink href={i.href}>{i.name}</Navlink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p>
                <button className="btn btn-quiet" onClick={() => signOut(`/`)}>
                  Sign out
                </button>
              </p>
            </>
          )}
        </nav>
      </div>
    </>
  )
}

const SidebarOpener = ({ isOpen, setIsOpen, shy }) => (
  <button
    className={`z-50 fixed ${
      shy ? '' : 'md:hidden'
    } bottom-4 left-3 p-2 btn-outline rounded-full bg-white btn-primary border border-primary`}
    role="button"
    aria-haspopup="true"
    aria-label="Toggle main menu"
    aria-expanded={isOpen ? 'true' : 'false'}
    aria-controls="main-menu"
    onClick={() => setIsOpen(!isOpen)}
    tabIndex="0"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 8h16M4 16h16"
      />
    </svg>
  </button>
)
