import Sidebar from 'app/components/Sidebar'

export default function Layout({ children }) {
  return (
    <div className="md:flex flex-row bg-primary text-white min-h-screen">
      <Sidebar shy={true} />
      <div className="flex-grow min-h-60vh">
        <div className="py-6 px-min container">{children}</div>
      </div>
    </div>
  )
}
