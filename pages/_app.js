import 'styles/globals.css'
import { AuthProvider } from 'lib/auth-context'
import Provider from 'app/Provider'

function App({ Component, pageProps }) {
  return (
    <Provider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  )
}

export default App
