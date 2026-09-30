import {Link} from 'react-router-dom'
import {EmptyHousehold} from "@/pages/EmptyHousehold.tsx";

export default function Home(){
    return(
        <>
            <nav>
                <Link to={'/signIn'}> Sign In </Link>
                <Link to={'/signUp'}> Sign Up </Link>

            </nav>
            <h1>WELCOME TO SHELF LIFE WEB APP</h1>
        </>
    )
}