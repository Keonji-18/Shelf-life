import axios from "axios";
import type {LogOutResponse} from "@/@types.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {buttonVariants} from "@/components/ui/button.tsx";



export default function Logout() {

    const [success, setSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const navigate = useNavigate();
    async function handleClick() {

        try {
            const response = await axios.post("http://localhost:3000/users/logout",{ withCredentials: true })
            const responseData = response.data

            console.log("Logout successful",response)
            if(!responseData.success){

                setErrorMessage(responseData.message || "Something went wrong");
                throw new Error(errorMessage)
            }

            setSuccess(true)
            localStorage.removeItem("isLoggedIn");
            navigate('/signin', { replace: true });


        }catch (error) {
            if(axios.isAxiosError(error)){
                setErrorMessage(error?.response?.data?.error?.message || "Something went wrong")
                console.log(errorMessage)
            }else {
                setErrorMessage("Something went wrong")
            }
            console.error('Something went wrong:', error);
        }

    }

    return(<>

            <div>
                <a
                    href="#"
                    className={buttonVariants({ variant: "secondary", size: "sm" })}
                    onClick={handleClick}
                >
                    Log-out
                </a>
            </div>

    </>)
}