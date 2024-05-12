import Banner from 'app/components/Banner'
import Footer from 'app/Footer'

export default function Layout({ children }) {
  return (
    <>
      <main>
        <Banner>
          <div className="section-card mx-auto">{children}</div>
        </Banner>
      </main>
      <Footer />
    </>
  )
}
