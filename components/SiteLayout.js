import Head from 'next/head'
import Link from 'next/link'
import menus from 'lib/menus'
import Sidebar from 'components/Sidebar'

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

export default function SiteLayout({
  image = `/images/sunlo-logo-color.png`,
  description = `Sunlo is a Social Language Learning App. Build a deck of flash cards, or help a friend learn phrases that will be useful from day one.`,
  title = `Sunlo, the Social Language Learning App`,
  children,
  sidebar,
}) {
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
      {sidebar ? (
        <div className="md:flex flex-row gap-6">
          <Sidebar />
          <div className="flex-col pt-6 pb-20 px-min">{children}</div>
        </div>
      ) : (
        <>
          {children}
          <Footer />
        </>
      )}
    </>
  )
}
