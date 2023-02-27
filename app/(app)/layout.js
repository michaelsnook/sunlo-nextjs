import MySpecialQueryProvider from './QueryProvider'
import Sidebar from 'components/Sidebar'

export default function Layout({ children }) {
  return (
    <div className="md:flex flex-row gap-6 bg-primary text-white">
      <Sidebar shy={true} />
      <div className="flex-grow py-6 px-min min-h-60vh">
        <MySpecialQueryProvider>{children}</MySpecialQueryProvider>
      </div>
    </div>
  )
}
