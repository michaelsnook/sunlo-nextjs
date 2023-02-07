import 'styles/globals.css'
import { GlobalStateProvider } from 'lib/global-store'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <GlobalStateProvider>{children}</GlobalStateProvider>
      </body>
    </html>
  )
}
