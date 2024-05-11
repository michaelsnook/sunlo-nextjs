import { Toaster } from 'react-hot-toast'
import 'styles/globals.css'
import { AuthProvider } from 'lib/auth-context'
import QueryProvider from 'app/query-provider'

function App({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <QueryProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryProvider>
    </>
  )
}

export default App
