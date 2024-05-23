import LoginChallenge from './login-challenge'

export default function Layout({ children }) {
  return (
    <>
      <LoginChallenge />
      {children}
    </>
  )
}
