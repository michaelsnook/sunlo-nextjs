import Head from 'next/head'
import Sidebar from 'components/Sidebar'

export default function AppLayout({
  image = `/images/sunlo-logo-color.png`,
  description = `Sunlo is a Social Language Learning App. Build a deck of flash cards, or help a friend learn phrases that will be useful from day one.`,
  title = `Sunlo, the Social Language Learning App`,
  children,
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
      <div className="md:flex flex-row gap-6">
        <Sidebar />
        <div className="flex-grow py-6 px-min min-h-100vh max-w-prose">
          {children}
        </div>
      </div>
    </>
  )
}
