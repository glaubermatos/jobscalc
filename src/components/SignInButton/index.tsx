import { useSession, signIn, signOut } from "next-auth/react"

export function SignInButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Logado como: {session.user.email} <br />
        <button onClick={() => signOut()}>Sair do app</button>
      </>
    )
  }
  return (
    <>
      Usuario nao autenticado <br />
      <button onClick={() => signIn()}>Entrar com seu Github</button>
    </>
  )
}