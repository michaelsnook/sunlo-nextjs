import AppProfileLayout from 'components/AppProfileLayout'
import SetNewEmailForm from 'components/SetNewEmailForm'

export default function ChangePassword() {
  return (
    <AppProfileLayout>
      <main className="section-card">
        <SetNewEmailForm />
      </main>
    </AppProfileLayout>
  )
}
