import AppProfileLayout from 'components/AppProfileLayout'
import SetNewPasswordForm from 'components/SetNewPasswordForm'

export default function ChangePassword() {
  return (
    <AppProfileLayout>
      <main className="section-card">
        <SetNewPasswordForm />
      </main>
    </AppProfileLayout>
  )
}
