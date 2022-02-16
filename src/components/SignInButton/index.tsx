import { signIn } from "next-auth/react"

export function SignInButton() {
  
  return (
    <>
      Usuario nao autenticado <br />
      <button onClick={() => signIn()}>Entrar com seu Github</button>
    </>
  )
}