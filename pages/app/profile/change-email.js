import AppProfileLayout from 'components/AppProfileLayout'
import SetNewEmailForm from 'components/SetNewEmailForm'

export default function ChangePassword() {
  return (
    <AppProfileLayout>
      <main className="big-card p-10">
        <SetNewEmailForm />
      </main>
    </AppProfileLayout>
  )
}
