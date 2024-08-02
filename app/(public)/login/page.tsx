//login page
import LoginForm from "./login"
import {GetServerSideProps} from "next"


//page component
export default function Login()
{
    return (
        <main className="flex flex-col items-center justify-center w-full ">
            <LoginForm/>
        </main>
    )
}

