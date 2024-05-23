import AvatarSection from './avatar-section'

export default function Layout({ children }) {
  return (
    <main className="py-6">
      <AvatarSection />
      {children}
    </main>
  )
}
