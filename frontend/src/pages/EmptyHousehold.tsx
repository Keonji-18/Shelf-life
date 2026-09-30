import { IconFolderCode } from "@tabler/icons-react"
import '@/pages/styles/EmptyHouse.css'
import { Button } from "@/components/ui/button.tsx"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty.tsx"
import {useState} from "react";
import CreateHousehold from "@/components/household/CreateHousehold.tsx";
import JoinHousehold from "@/components/household/JoinHousehold.tsx";

export function EmptyHousehold() {

    const [isCreate, setIsCreate] = useState(false)
    const [isJoinHouse, setIsJoinHouse] = useState(false)

    function handleCreateHousehold() {
        setIsCreate(true)
        setIsJoinHouse(false)
    }

    function handleJoinHousehold() {
        setIsJoinHouse(true)
        setIsCreate(false)
    }

    return (
        <div className="empty-household-container">

            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <IconFolderCode />
                    </EmptyMedia>
                    <EmptyTitle>Not In Household Yet</EmptyTitle>
                    <EmptyDescription>
                        You aren&apos;t in any household yet. Get started by creating
                        your Household.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent className="flex-row justify-center gap-2">
                    <Button onClick={handleCreateHousehold}>Create Household</Button>
                    <Button onClick={handleJoinHousehold} variant="outline">Join Household</Button>
                </EmptyContent>
            </Empty>

            <div className="options-container">
                {isCreate && (
                    <CreateHousehold />
                )}

                {isJoinHouse && (
                    <JoinHousehold/>
                )}
            </div>
        </div>
    )
}
