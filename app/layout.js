import QueryProvider from 'app/query-provider'
import { Toaster } from 'react-hot-toast'
import 'styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Toaster />
        <QueryProvider>
          {children}
          <div id="modal-root" />
        </QueryProvider>
      </body>
    </html>
  )
}
