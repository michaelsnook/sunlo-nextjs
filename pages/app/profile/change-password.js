import AppProfileLayout from 'components/AppProfileLayout'
import SetNewPasswordForm from 'components/SetNewPasswordForm'

export default function ChangePassword() {
  return (
    <AppProfileLayout>
      <main className="big-card">
        <SetNewPasswordForm />
      </main>
    </AppProfileLayout>
  )
}
