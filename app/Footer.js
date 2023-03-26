import Link from 'next/link'
import { staticMenu } from 'lib/menus'

const Footer = () => (
  <footer className="container p-10 flex flex-row gap-16">
    {[staticMenu].map(menu => (
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

export default Footer
