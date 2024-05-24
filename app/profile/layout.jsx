import AvatarSection from './avatar-section'

export default function Layout({ children }) {
  return (
    <>
      <AvatarSection />
      {children}
    </>
  )
}
