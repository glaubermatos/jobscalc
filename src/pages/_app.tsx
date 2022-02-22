import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import { ToastContainer, toast } from 'react-toastify';

import Modal from 'react-modal'

import '../styles/globals.scss'
//import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
import 'react-toastify/dist/ReactToastify.min.css';

Modal.setAppElement('#root')

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover 
      />

      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
