import { useState } from 'react'
import Link from 'next/link'
import menus from '../lib/menus'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState()
  return (
    <>
      <SidebarOpener isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`z-20 bg-black bg-opacity-50 px-2 pt-10 ${
          isOpen ? 'fixed' : 'hidden'
        } md:hidden top-0 left-0 right-0 bottom-0`}
        onClick={() => setIsOpen(false)}
      />
      <nav
        aria-label="Main navigation"
        className={`sticky z-30 top-0 w-80 p-6 bg-[#efe9fb] h-screen shadow-lg ${
          isOpen ? 'fixed' : 'hidden'
        } md:flex flex-col gap-4`}
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
    </>
  )
}

const SidebarOpener = ({ isOpen, setIsOpen }) => (
  <button
    className={`shadow-lg fixed bottom-4 md:hidden left-3 border rounded-full inline-block ${
      isOpen
        ? 'bg-primary hover:border-white border-gray-400 text-white'
        : 'text-primary hover:border-primary backdrop-filter backdrop-blur'
    } p-2 z-50`}
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
