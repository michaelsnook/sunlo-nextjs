import AppProfileLayout from '../../../components/AppProfileLayout'
import SetNewEmailForm from '../../../components/SetNewEmailForm'

export default function ChangePassword() {
  return (
    <AppProfileLayout>
      <main>
        <div className="card shadow-lg bg-white text-gray-800 max-w-lg p-10">
          <SetNewEmailForm />
        </div>
      </main>
    </AppProfileLayout>
  )
}
