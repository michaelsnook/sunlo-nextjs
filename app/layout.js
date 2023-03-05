import Provider from './Provider'
import 'styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
