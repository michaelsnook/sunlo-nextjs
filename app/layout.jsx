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
            <div className="flex flex-row">
              <Sidebar />
              <main className="flex-grow flex-col pt-6 md:pt-10 pb-10 md:pb-16 px-[2%] md:px-[5%] min-h-screen content-center">
                <div className="content-center grid justify-center mb-8">
                  {children}
                </div>
              </main>
            </div>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
