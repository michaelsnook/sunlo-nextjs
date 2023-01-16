import { Providers } from 'lib/providers'
import 'styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
