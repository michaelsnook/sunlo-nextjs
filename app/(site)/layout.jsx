import Footer from 'app/Footer'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-primary">{children}</div>
      <Footer />
    </div>
  )
}
