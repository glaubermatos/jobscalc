import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { SignInButton } from "../../components/SignInButton";

export default function index() {
    return (
        <SignInButton />
    )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const session = await getSession({req})

    if (session?.user) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            
        }
    }
}