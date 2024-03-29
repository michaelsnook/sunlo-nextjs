import Provider from 'app/Provider'
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
        <Provider>
          {children}
          <div id="modal-root" />
        </Provider>
      </body>
    </html>
  )
}
