import Loader from './loader'

export default function Layout({ params: { lang }, children }) {
  return (
    <>
      <Loader lang={lang} />
      {children}
    </>
  )
}
