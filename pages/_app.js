import { Toaster } from 'react-hot-toast'
import 'styles/globals.css'
import { AuthProvider } from 'lib/auth-context'
import Provider from 'app/Provider'

function App({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <Provider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </>
  )
}

export default App
