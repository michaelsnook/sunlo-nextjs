import AppProfileLayout from 'components/AppProfileLayout'
import { useGlobalState } from 'lib/global-store'

export default function ChangePassword() {
  const { user } = useGlobalState()
  return (
    <AppProfileLayout>
      <main>
        <div className="card shadow-lg bg-white text-gray-800 max-w-lg p-10">
          <div className="mx-auto max-w-lg my-6">
            {user ? (
              <div className="flex flex-col space-y-4">
                <h1 className="h3 text-gray-700">Email address changed!</h1>
                <p>
                  You&apos;ve successfully changed your email to {user?.email}
                </p>
                <p>You can close this tab.</p>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <h1 className="h3 text-gray-700">Something went wrong...</h1>
                <p>
                  We are&apos;t sure what it is... if this message is still here
                  in 10 seconds you may want to try setting your email again.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </AppProfileLayout>
  )
}
