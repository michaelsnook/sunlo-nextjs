import Head from 'next/head'
import Link from 'next/link'

const Footer = ({menus}) => (
  <footer className="container py-10 flex flex-row gap-16">
    {menus.map(menu => (
      <div>
        <p className="font-bold my-4">{menu.name}</p>
        <ul className="flex flex-col gap-2">
          {menu.links?.map(i => (
            <li key={i.href}>
              <Link href={i.href}>
                {i.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </footer>
)

export default function Layout({ 
  image = `/images/sunlo-logo-color.png`,
  description = `Sunlo is a Social Language Learning App. Build a deck of flash cards, or help a friend learn phrases that will be useful from day one.`,
  title = `Sunlo, the Social Language Learning App`,
  withFooter,
  children 
}) {
  const menus = [
    {
      name: 'Menu',
      links: [
        {
          name: 'Home',
          href: '/',
        },
        {
          name: 'Log in or sign up',
          href: '/auth',
        },
      ]
    },
    {
      name: 'App Links',
      links: [
        {
          name: 'Languages',
          href: '/languages',
        },
        {
          name: 'User Profile',
          href: '/profile',
        },
      ]
    },
  ]

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
      {children}
      {withFooter ? <Footer menus={menus} /> : null}
    </>
  )
}
