import QueryProvider from 'app/query-provider'
import { AuthProvider } from 'lib/auth-context'
import { Toaster } from 'react-hot-toast'
import Sidebar from 'app/components/Sidebar'
import 'styles/globals.css'

export const metadata = {
  image: `/images/sunlo-logo-color.png`,
  description: `Sunlo is a Social Language Learning App. Build a deck of flash cards, or help a friend learn phrases that will be useful from day one.`,
  title: `Sunlo, the Social Language Learning App`,
}

export const viewport = {
  themeColor: '#570df8',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary text-white flex flex-row min-h-screen">
        <Toaster />
        <QueryProvider>
          <AuthProvider>
            {/*
              This is the root of the layout. The flex, with 2 children
              a) Sidebar with fixed width, and b) and main content/app area
              with .flex-grow
            */}
            <Sidebar />
            {/*
              This is the main container for the app. Its child applies some
              container-relative padding and width, ensuring that the app's
              business happens in a consistent sizing box, no matter the
              contents on screen at the time.
            */}
            <div
              className="
                @container w-full max-w-[1100px] 
                py-20 
                mx-auto px-[1%]
                flex flex-col
              "
            >
              {children}
            </div>
            <div id="modal-root" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
