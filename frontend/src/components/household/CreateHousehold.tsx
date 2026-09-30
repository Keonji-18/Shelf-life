import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {type FormEvent, useState} from "react";
import axios from "axios";
import type {CreateHouseholdResponseBody} from "@/@types.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle, CheckCircle2Icon} from "lucide-react";

export default function CreateHousehold(){

    const [name, setName] = useState("")
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")


    const handleClick = async () => {

        console.log("clicked")
        try {
            const response = await axios.post('http://localhost:3000/households',{name})
            const responseData = response.data.data as CreateHouseholdResponseBody;

            console.log(responseData)
            if(!response.data.success){
                setErrorMessage(response?.data?.message || "Something went wrong");
                throw new Error(errorMessage);
            }

            setSuccess(true)
            setName('')

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
    return(<>
        <hr className="mb-6"/>
        <Card className="w-full max-w-sm">

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
                    <AlertTitle>House Created Successfully</AlertTitle>
                    <AlertDescription>

                    </AlertDescription>
                </Alert>)
            }

            <CardHeader>
                <CardTitle>Create Your Household</CardTitle>
                <CardDescription>
                    Enter name of your household below to create :
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="Name">Name</Label>
                            <Input
                                id="Name"
                                type="text"
                                minLength={5}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button className="w-full" onClick={handleClick}>
                    Create
                </Button>
            </CardFooter>
        </Card>
    </>)
}