'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Garlic } from 'components/garlic'
import languages from 'lib/languages'
import { usePathname, useRouter } from 'next/navigation'
import { useProfile } from 'app/data/hooks'
import Loading from 'components/loading'
import ErrorList from './error-list'
import supabase from 'lib/supabase-client'
import { toast } from 'react-hot-toast'
import { useAuth } from 'lib/auth-context'
import { cn } from 'lib/utils'

const Navlink = ({ href, children }) => {
  const pathname = usePathname()
  return href !== pathname ? (
    <Link href={href} className="link-hover">
      {children}
    </Link>
  ) : (
    <a
      className="border-l-4 border-base-content/50 pl-2 text-base-content/70"
      disabled
    >
      {children}
    </a>
  )
}

const staticMenu = {
  name: 'Menu',
  links: [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Log in or sign up',
      href: '/login',
    },
    {
      name: 'Browse Languages',
      href: '/language',
    },
  ],
}

const GenericMenu = ({ menu }) => {
  return (
    <div>
      <p className="my-4 font-bold">
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
  )
}

const StaticMenu = () => <GenericMenu menu={staticMenu} />

const DeckMenu = () => {
  const { data, status, error } = useProfile()
  if (status === 'loading') return null
  if (error) return <ErrorList error={error.message} />

  const decks = data?.deck_stubs
  const menuData = {
    name: 'Learning decks',
    href: '/home',
    links: decks?.map(deck => {
      return {
        name: languages[deck.lang],
        href: `/home/${deck.lang}`,
      }
    }),
  }
  return <GenericMenu menu={menuData} />
}

export default function Sidebar() {
  const { isAuth } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const pathname = usePathname()
  const router = useRouter()

  const { data: profile, isPending, error } = useProfile()

  // close the sidebar when the user navigates
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <div id="sidebar-all">
      <SidebarOpener isOpen={isOpen} toggle={toggle} />
      <div
        className={cn(
          'z-20 bg-black bg-opacity-50 pt-10',
          isOpen ? 'fixed' : 'hidden',
          'bottom-0 left-0 right-0 top-0 md:hidden',
        )}
        onClick={toggle}
      />
      <nav
        aria-label="Main navigation"
        className={cn(
          isOpen ? 'fixed' : 'hidden',
          !isOpen ? '' : 'md:sticky md:flex',
          'top-0 z-30 h-screen w-72 flex-col gap-4 overflow-y-auto overflow-x-hidden bg-base-300 p-6 text-base-content',
        )}
      >
        <span className="h4 flex flex-row items-center">
          <Garlic size={50} />
          Sunlo
        </span>
        {isPending ? (
          <Loading />
        ) : profile ? (
          <Navlink href="/profile">
            <p className="flex flex-row gap-2">
              <ProfileIcon /> {profile?.username}
            </p>
          </Navlink>
        ) : null}

        <DeckMenu />
        <StaticMenu />

        {isAuth && (
          <p>
            <button
              className="btn btn-ghost"
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
        )}
      </nav>
    </div>
  )
}

const SidebarOpener = ({ isOpen, toggle }) => (
  <button
    className={`btn-outline btn-primary fixed bottom-4 left-3 z-50 rounded-full border border-primary bg-white p-2`}
    role="button"
    aria-haspopup="true"
    aria-label="Toggle main menu"
    aria-expanded={isOpen ? 'true' : 'false'}
    aria-controls="main-menu"
    onClick={toggle}
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
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )
}
