import Banner from 'app/components/Banner'

export default function Layout({ children }) {
  return (
    <div className="min-h-100vh bg-primary flex flex-col justify-center">
      <Banner>{children}</Banner>
    </div>
  )
}
