import Sidebar from 'app/components/Sidebar'
import { AvatarSection } from 'components/AppProfileLayout'

export default function Layout({ children }) {
  return (
    <div className="md:flex flex-row bg-primary text-white">
      <Sidebar />
      <div className="flex-grow py-6 px-min sm:px-2 md:px-6 lg:px-10 min-h-100vh">
        <AvatarSection />
        {children}
      </div>
    </div>
  )
}
