import QueryProvider from 'app/query-provider'
import { AuthProvider } from 'components/auth-context'
import { Toaster } from 'react-hot-toast'
import Sidebar from 'components/sidebar'
import 'styles/globals.css'

export const metadata = {
  image: `/images/sunlo-logo-color.png`,
  description: `Sunlo is a Social Language Learning App. Build a deck of flash cards, or help a friend learn phrases that will be useful from day one.`,
  title: `Sunlo, the Social Language Learning App`,
}

export const viewport = {
  themeColor: '#663399',
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-row bg-[hsl(210,100,15)] text-white">
        {/*
          This is the root of the layout. The flex, with 2 children
          a) Sidebar with fixed width, and b) and main content/app area. 
          This flex allows the sidebar to shift the content right.
        */}
        <Toaster position="bottom-center" />
        <QueryProvider>
          <AuthProvider>
            <Sidebar />
            {/*
              This is the main container for the site, ensuring that all the
              business happens in a consistent sizing box, no matter the
              contents on screen at the time.
            */}
            <div className="mx-auto w-full max-w-[1100px] px-[1%] py-20 @container">
              {children}
            </div>
            <div id="modal-root" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
