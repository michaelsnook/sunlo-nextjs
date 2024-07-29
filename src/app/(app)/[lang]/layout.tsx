import { LangContextProvider } from './lang-data-provider'

export default function Layout({ params: { lang }, children }) {
  return <LangContextProvider lang={lang}>{children}</LangContextProvider>
}
