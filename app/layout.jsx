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
      <body className="bg-primary text-white">
        <Toaster />
        <QueryProvider>
          <AuthProvider>
            <div id="modal-root" />
            {/*
              This is the root of the layout. The flex, with 2 children
              a) Sidebar with fixed width, and b) and main content/app area
              with .flex-grow
            */}
            <div className="flex min-h-screen p-px">
              <Sidebar />
              {/*
                This flexbox only ever has 1 child, the <main> element, so it
                can use items-center and justify-center to always center the
                page contents
              */}
              <div
                className="
                flex-grow
                flex
                items-center justify-center
                py-6
              "
              >
                <div>{children}</div>
              </div>
            </div>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
