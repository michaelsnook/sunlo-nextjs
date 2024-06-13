import LoginChallenge from './login-challenge'

export default function Layout({ children }) {
  return (
    <div className="w-full max-w-prose mx-auto">
      <LoginChallenge />
      {children}
    </div>
  )
}
