import Link from 'next/link'
import menus from 'lib/menus'
// import Sidebar from 'components/Sidebar'

const Footer = () => (
  <footer className="container pt-10 pb-16 flex flex-row gap-16">
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
  </footer>
)

export default function Layout({ children }) {
  return (
    <>
      {/* <Sidebar /> */}
      <div className="container flex-col py-10 min-h-70vh">{children}</div>
      <Footer />
    </>
  )
}
