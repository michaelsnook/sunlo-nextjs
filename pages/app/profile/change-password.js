import AppProfileLayout from '../../../components/AppProfileLayout'
import SetNewPasswordForm from '../../../components/SetNewPasswordForm'

export default function ChangePassword() {
  return (
    <AppProfileLayout>
      <main>
        <div className="card shadow-lg bg-white text-gray-800 max-w-lg p-10">
          <SetNewPasswordForm />
        </div>
      </main>
    </AppProfileLayout>
  )
}
