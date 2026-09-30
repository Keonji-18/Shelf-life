import axios,{AxiosError} from "axios";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Field, FieldLabel, FieldDescription} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import "./styles/signup.css"
import {buttonVariants} from "@/components/ui/button.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle, CheckCircle2Icon} from "lucide-react";


interface PostData{
    name: string;
    email: string;
    password: string;
}



export default function SignUp(){

    const navigate = useNavigate();

    const [postData, setPostData] = useState<PostData>({
        name :"",
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target

        setPostData(((prevData) => ({ ...prevData, [name]: value })))

    }


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

       try {

           const response = await axios.post('http://localhost:3000/users/register', {...postData})

           console.log(response)
           if(!response.data.success){
               setErrorMessage(response.data.error.message || "Something went wrong");
               throw new Error(response.data.error.message || "Something went wrong");
           }
           setSuccess(true);

           setPostData({
               name: '',
               email: '',
               password: ''
           })

           console.log("User created successfully", response.data)
           navigate('/signin', { replace: true });


       }catch (error){

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
        <div className="sign-up-container">


            {errorMessage !== "" && !success &&(
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Signup Failed</AlertTitle>
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
            <form onSubmit={handleSubmit}>
                <Field>
                    <FieldLabel htmlFor="input-field-email">Name:</FieldLabel>
                    <Input

                        id="input-field-email"
                        required
                        type="text"
                        minLength={3}
                        name={"name"}
                        value={postData.name}
                        onChange={handleChange}
                    />
                    <FieldDescription>
                        Write your name
                    </FieldDescription>
                </Field>

                <Field>
                    <FieldLabel htmlFor="input-field-email">Email:</FieldLabel>
                    <Input

                        id="input-field-email"
                        required
                        type="email"
                        name={"email"}
                        value={postData.email}
                        onChange={handleChange}
                    />
                    <FieldDescription>
                        Choose a unique email address
                    </FieldDescription>
                </Field>

                <Field >
                    <FieldLabel htmlFor="input-field-password">Password:</FieldLabel>
                    <Input
                        id="input-field-password"
                        required
                        type="password"
                        name={"password"}
                        minLength={8}
                        value={postData.password}
                        onChange={handleChange}
                    />
                    <FieldDescription>
                        Choose a  strong password
                    </FieldDescription>
                </Field>

                <button className={buttonVariants({ variant: "default", size: "sm" })} type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <Link to={'/signIn'}><span className="underline accent-blue-300">Sign in</span></Link></p>
        </div>

    </>)
}