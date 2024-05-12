'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Garlic from 'app/components/Garlic'
import { staticMenu, convertDecksToMenu } from 'lib/menus'
import { usePathname, useRouter } from 'next/navigation'
import { useProfile, useAllDecks } from 'app/data/hooks'
import Loading from 'app/loading'
import supabase from 'lib/supabase-client'
import { toast } from 'react-hot-toast'

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
  const router = useRouter()

  const { data: decks, status: decksStatus, error: decksError } = useAllDecks()
  const {
    data: profile,
    status: profileStatus,
    error: profileError,
  } = useProfile()

  const loading = decksStatus === 'loading' || profileStatus === 'loading'

  // close the sidebar when the user navigates
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const myMenus = loading
    ? [staticMenu]
    : [convertDecksToMenu(decks), staticMenu]

  return (
    <div id="sidebar-all">
      <SidebarOpener isOpen={isOpen} setIsOpen={setIsOpen} shy={shy} />
      <div
        className={`z-20 bg-black bg-opacity-50 pt-10 ${
          isOpen ? 'fixed' : 'hidden'
        } md:hidden top-0 left-0 right-0 bottom-0`}
        onClick={() => setIsOpen(false)}
      />
      <nav
        aria-label="Main navigation"
        className={`overflow-y-auto overflow-x-hidden z-30 top-0 w-72 p-6 bg-white text-gray-800 h-screen ${
          isOpen ? 'fixed' : 'hidden'
        } ${shy && !isOpen ? '' : 'md:sticky md:flex'}  flex-col gap-4`}
      >
        <span className="h4 flex flex-row items-center">
          <Garlic size={50} />
          Sunlo
        </span>
        {loading ? (
          <Loading />
        ) : (
          <>
            {profile ? (
              <Navlink href="/profile">
                <p className="flex flex-row gap-2">
                  <ProfileIcon /> {profile?.username}
                </p>
              </Navlink>
            ) : null}
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
              <button
                className="btn btn-quiet"
                onClick={() =>
                  supabase.auth.signOut().then(() => {
                    toast(`You have logged out`)
                    router?.push('/')
                  })
                }
              >
                Sign out
              </button>
            </p>
          </>
        )}
      </nav>
    </div>
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

const ProfileIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )
}
