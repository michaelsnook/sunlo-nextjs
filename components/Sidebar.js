import { useState } from 'react'
import Link from 'next/link'
import menus from 'lib/menus'
import { useGlobalState } from 'lib/global-store'
import { useRouter } from 'next/router'
import languages from 'lib/languages'

const Navlink = ({ href, children }) => {
  const router = useRouter()
  return href !== router.asPath ? (
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

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState()
  const { user, profile, signOut, decks, isLoading } = useGlobalState()
  const myMenus = decks
    ? [
        {
          name: 'Your decks',
          href: '/app/decks',
          links:
            decks?.map(d => {
              return {
                name: languages[d.lang],
                href: d?.lang ? `/app/decks/${d.lang}` : '',
              }
            }) || [],
        },
        ...menus,
      ]
    : menus

  return (
    <>
      <SidebarOpener isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`z-20 bg-black bg-opacity-50 pt-10 ${
          isOpen ? 'fixed' : 'hidden'
        } md:hidden top-0 left-0 right-0 bottom-0`}
        onClick={() => setIsOpen(false)}
      />
      <nav
        aria-label="Main navigation"
        className={`overflow-y-auto overflow-x-hidden z-30 top-0 w-80 p-6 bg-[#efe9fb] text-gray-800 h-screen shadow-lg ${
          isOpen ? 'fixed' : 'hidden'
        } md:sticky md:flex flex-col gap-4`}
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
              <button className="btn btn-quiet" onClick={signOut}>
                Sign out
              </button>
            </p>
          </>
        )}
      </nav>
    </>
  )
}

const SidebarOpener = ({ isOpen, setIsOpen }) => (
  <button
    className="z-50 fixed md:hidden bottom-4 left-3 p-2 btn-outline rounded-full bg-white btn-primary border border-primary"
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
