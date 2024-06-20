import LoginChallenge from './login-challenge'

export default function Layout({ children }) {
  return (
    <div className="w-app">
      <LoginChallenge />
      {children}
    </div>
  )
}
