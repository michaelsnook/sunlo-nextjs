import AvatarSection from './avatar-section'

export default function Layout({ children }) {
  return (
    <div className="w-app space-y-4">
      <AvatarSection />
      {children}
    </div>
  )
}
