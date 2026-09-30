import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {useState} from "react";
import axios from "axios";
import type {HouseholdWithMemberResponseBody} from "@/@types.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle, CheckCircle2Icon} from "lucide-react";


export default function JoinHousehold(){

    const [inviteCode, setInviteCode] = useState("");
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleClick(){

        try {
            const response = await axios.post(`http://localhost:3000/households/members`,{inviteCode});
            const responseData = response.data.data as HouseholdWithMemberResponseBody;
            if(!response.data.success){
                setErrorMessage(response?.data?.message || "Something went wrong");
                throw new Error(errorMessage);
            }

            setSuccess(true)
            setInviteCode('')

        }catch(error){
            if(axios.isAxiosError(error)){
                setErrorMessage(error?.response?.data?.error?.message || "Something went wrong")
                console.log(errorMessage)
            }else {
                setErrorMessage("Something went wrong")
            }
            console.error('Something went wrong:', error);
        }
    }

    return (
        <>
            <hr className="mb-6"/>
            {errorMessage !== "" && !success && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertTitle>Submission Failed</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
            )}

            {

                success && (<Alert className="max-w-md">
                    <CheckCircle2Icon/>
                    <AlertTitle>Joined SuccessFully</AlertTitle>
                    <AlertDescription>

                    </AlertDescription>
                </Alert>)
            }
            <Field orientation="horizontal">


                <Input
                    type="text"
                    minLength={36}
                    maxLength={36}
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    placeholder="Invite Code..."/>
                <Button onClick={handleClick}>Join</Button>
            </Field>

        </>
    )

}