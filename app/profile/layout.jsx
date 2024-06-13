import AvatarSection from './avatar-section'

export default function Layout({ children }) {
  return (
    <div className="max-w-prose mx-auto space-y-4">
      <AvatarSection />
      {children}
    </div>
  )
}
