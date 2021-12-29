import '../styles/globals.css'
import { GlobalStateProvider } from '../lib/global-store'

function App({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <Component {...pageProps} />
    </GlobalStateProvider>
  )
}

export default App
