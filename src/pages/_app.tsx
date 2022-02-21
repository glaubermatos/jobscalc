import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import Modal from 'react-modal'

import '../styles/globals.scss'

Modal.setAppElement('#root')

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
