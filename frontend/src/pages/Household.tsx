import {useLocation} from "react-router-dom";
import type {HouseholdWithFullDetails, LogInResponseBody} from "@/@types.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item"
import {Button} from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import {AddItem} from "@/components/AddItem.tsx";
import {Trash2} from "lucide-react";
import './styles/household.css'


export function Household() {

    const location = useLocation()

    const userData = location.state as LogInResponseBody
    const [householdDetails, setHouseholdDetails] = useState<HouseholdWithFullDetails | null>()
    const [itemStatus, setItemStaus] = useState('')
    const [isUpdated, setIsUpdated] = useState(false)

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/households/${userData.householdId}/details`)
                const data = response.data.data as HouseholdWithFullDetails;

                setHouseholdDetails(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchDetails()
    },[isUpdated])

    async function handleStatus(itemId: string) {

        try {
            const response = await axios.get(`http://localhost:3000/households/${userData.householdId}/${itemId}/status`)
            console.log(response)
            const status = response.data.data.status as string
            setItemStaus(status)
            console.log(status)
        }catch(error) {
            console.log(error)
        }
    }

    async function handleDelete(itemId: string) {

        try {
            const response = await axios.delete(`http://localhost:3000/households/${userData.householdId}/${itemId}`)
            alert("Item Deleted" )
            setIsUpdated((prev)=> !prev)
        }catch(error) {
            console.log(error)
        }
    }



    return (<>
    <div className="household-container">
        <div className="household-header">
            <h1>{householdDetails?.name}</h1>
            <div className="flex gap-1">
                <span>Members :{householdDetails?.members?.length || 0}</span>
                <span>Items :{householdDetails?.inventory?.length || 0}</span>
            </div>
        </div>

        <div className="flex w-full max-w-md flex-col gap-6">

            {householdDetails?.members?.map((member, index) => (
                <Item variant="outline" key={index}>
                    <ItemContent>
                        <ItemTitle>{member.name}</ItemTitle>
                        <ItemDescription>
                            Joined Household on {new Date(member.createdAt).toLocaleDateString()}
                        </ItemDescription>
                    </ItemContent>
                </Item>
            ))}
        </div>

        <div className="flex w-full max-w-md flex-col gap-6">

            {householdDetails?.inventory?.map((item, index) => (
                <Item variant="outline" key={index} >
                    <ItemContent >
                        <ItemTitle>{item.name}</ItemTitle>
                        <ItemDescription>
                            Will expire on {new Date(item.expiry).toLocaleDateString()}
                        </ItemDescription>
                        <ItemActions >
                            <Popover>
                                <PopoverTrigger render={<Button variant="outline" className="w-fit" onClick={()=>handleStatus(item.id)}>Check Status</Button>} />
                                <PopoverContent align="start">
                                    <PopoverHeader>
                                        <PopoverTitle>{ itemStatus }</PopoverTitle>
                                        <PopoverDescription>
                                            {item.name} is {itemStatus}
                                        </PopoverDescription>
                                    </PopoverHeader>
                                </PopoverContent>
                            </Popover>
                        </ItemActions>
                        <ItemActions>
                            <Button variant="outline" size="sm" onClick={()=>handleDelete(item.id)}>
                                <Trash2 size={20} color="currentColor" />
                            </Button>
                        </ItemActions>
                    </ItemContent>
                </Item>
            ))}
            <AddItem householdId={householdDetails?.id}  setIsUpdated={setIsUpdated}/>
        </div>
    </div>
</>)
}