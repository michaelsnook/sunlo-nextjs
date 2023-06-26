import 'styles/globals.css'
import { GlobalStateProvider } from 'lib/global-store'
import Provider from 'app/Provider'

function App({ Component, pageProps }) {
  return (
    <Provider>
      <GlobalStateProvider>
        <Component {...pageProps} />
      </GlobalStateProvider>
    </Provider>
  )
}

export default App
