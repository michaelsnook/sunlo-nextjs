import LoginChallenge from './login-challenge'
import Navbar from 'app/(app)/Navbar'

export default function Layout({ children }) {
  return (
    <div className="w-full max-w-prose mx-auto pt-12">
      <Navbar />
      <LoginChallenge />
      {children}
    </div>
  )
}
