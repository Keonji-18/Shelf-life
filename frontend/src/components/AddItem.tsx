import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {type ChangeEvent, useState} from "react";
import axios from "axios";

export function AddItem({householdId, setIsUpdated}:{householdId:string|undefined, setIsUpdated: (value: boolean | ((prevState: boolean) => boolean)) => void
}) {

    const [item, setItem] = useState({
        name: "",
        barcode: "",
        expiry:""
    })

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target
        setItem(prev => ({...prev, [name]: value}))
    }

    async function handleAdd(){
        console.log("clicked")
        try {
            console.log(householdId)
            axios.post(`http://localhost:3000/households/${householdId}/items`, {...item})
            setItem({
                name: "",
                barcode: "",
                expiry:""
            })
            alert("Added")
            setIsUpdated((prev)=>!prev)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger render={<Button variant="outline">Add Item</Button>} />
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Add Item</DialogTitle>
                        <DialogDescription>
                            Fill below details to add Item
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" value={item.name} required={true} onChange={(e )=>handleChange(e)} />
                        </Field>
                        <Field>
                            <Label >barcode</Label>
                            <Input  name="barcode" minLength={12} maxLength={12} value={item.barcode} required={true} onChange={(e )=>handleChange(e)} />
                        </Field>
                        <Field>
                            <Label >expiry</Label>
                            <Input  name="expiry" type="date" value={item.expiry} required={true}  onChange={(e )=>handleChange(e)}/>
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <DialogClose render={<Button onClick={handleAdd}>Add</Button>} />
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
