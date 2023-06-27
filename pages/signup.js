import SiteLayout from 'components/SiteLayout'
import SignupForm from 'components/SignupForm'
import Banner from 'app/components/Banner'

export default function Login() {
  return (
    <SiteLayout>
      <main>
        <Banner>
          <div className="section-card">
            <SignupForm />
          </div>
        </Banner>
      </main>
    </SiteLayout>
  )
}
