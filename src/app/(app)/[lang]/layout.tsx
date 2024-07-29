import { AppDataProvider } from './app-data-provider'

export default function Layout({ params: { lang }, children }) {
  return <AppDataProvider lang={lang}>{children}</AppDataProvider>
}
