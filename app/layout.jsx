import QueryProvider from 'app/query-provider'
import { AuthProvider } from 'lib/auth-context'
import { Toaster } from 'react-hot-toast'
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
      <body>
        <Toaster />
        <QueryProvider>
          <AuthProvider>
            {children}
            <div id="modal-root" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
