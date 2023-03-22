import SiteLayout from 'components/SiteLayout'
import LoginForm from 'components/LoginForm'
import Banner from 'components/Banner'

export default function Login() {
  return (
    <SiteLayout>
      <main>
        <Banner>
          <div className="section-card">
            <LoginForm signup />
          </div>
        </Banner>
      </main>
    </SiteLayout>
  )
}
