import {type FormEvent, useState} from "react";
import {AlertCircle, CheckCircle2Icon} from "lucide-react"
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Input} from "@/components/ui/input.tsx"
import {Field, FieldLabel} from "@/components/ui/field.tsx"
import { buttonVariants } from "@/components/ui/button.tsx"
import {Alert, AlertDescription, AlertTitle,} from "@/components/ui/alert.tsx"
import './styles/signin.css'
import type {LogInResponseBody} from "@/@types.tsx";

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios.post('http://localhost:3000/users/login', {email, password}, { withCredentials: true })

            .then((response) => {

                const responseData = response.data.data as LogInResponseBody;
                console.log('Data sent successfully:', responseData)
                if(!response.data.success){
                    setErrorMessage(response.data.message || "Something went wrong");
                    throw new Error(response.data.message || "Something went wrong");
                }
                setSuccess(true)
                localStorage.setItem("isLoggedIn", "true")
                console.log(responseData.householdId)
                if(!responseData.householdId){
                    navigate('/joinHousehold', {state: responseData})
                }else{
                    navigate('/yourHousehold', {state: responseData})
                }


            })
            .catch((error) => {
                if(axios.isAxiosError(error)){
                    setErrorMessage(error?.response?.data?.error?.message || "Something went wrong")
                    console.log(errorMessage)
                }else {
                    setErrorMessage("Something went wrong")
                }
                console.error('Something went wrong:', error);
            });

        setEmail('')
        setPassword('')
    }
    return (<>


        <div className="sign-in-container">
            <div className="head-container">
                <h1>Sign in to your account</h1>
                <p>Welcome back! Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit}>

                {errorMessage !== "" && !success &&(
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Submission Failed</AlertTitle>
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}

                {

                    success && (<Alert className="max-w-md">
                        <CheckCircle2Icon/>
                        <AlertTitle>Logged In Successful</AlertTitle>
                        <AlertDescription>

                        </AlertDescription>
                    </Alert>)
                }
                <Field>
                    <FieldLabel htmlFor="input-field-email">Email:</FieldLabel>
                    <Input

                        id="input-field-email"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Field>

                <Field >
                    <FieldLabel htmlFor="input-field-password">Password:</FieldLabel>
                    <Input
                        id="input-field-password"
                        required
                        type="password"
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Field>
                <button className={buttonVariants({ variant: "default", size: "sm" })} type="submit">Sign in</button>
            </form>


            <p>Don't have an account? <Link to={'/signUp'}><span className="underline accent-blue-300">Sign up</span></Link></p>
        </div>


    </>)
}