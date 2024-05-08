import { cn } from '@/lib/utils';
import { CallControls, CallParticipantListing, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import React, { useState } from 'react';
import { LayoutList, Loader, User } from 'lucide-react';
import { Button } from './ui/button';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';
function MeetingRoom() {
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get('peronal')
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
    const [showParticipants, setShowParticipants] = useState(false);

    const {useCallCallingState} = useCallStateHooks();
    const callingState = useCallCallingState();
    if(callingState !==  CallingState.JOINED){
        return <Loader/>
    }

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />;
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="right" />;
            default:
                return <SpeakerLayout participantsBarPosition="left" />;
        }
    }
    return (
        <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
            <div className='relative flex size-full items-center justify-center'>
                <div className='flex size-full max-w-[1000px] items-center'>
                    <CallLayout />
                </div>
                <div className={cn('h-[calc(100vh-86px)] hidden ml-2',
                    { 'show-block': showParticipants })}>
                    <CallParticipantsList onClose={() => {
                        setShowParticipants(false)
                    }} />
                </div>
                <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
                    <CallControls />
                    <DropdownMenu>
                        <div className='flex items-center'>
                            <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                                <LayoutList size={20} className='text-white' />
                            </DropdownMenuTrigger>
                        </div>

                        <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
                            {['Grid', 'Speaker-left', 'Speaker-right'].map((item, index) => (
                                <div key={index}>
                                    <DropdownMenuItem>
                                        <Button className='hover:bg-[#4c535b]' onClick={() => { setLayout(item.toLowerCase() as CallLayoutType) }}>{item}</Button>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className='border-dark-1' />
                                </div>
                            ))}

                        </DropdownMenuContent>
                    </DropdownMenu>
                    <CallStatsButton />
                    <button onClick={() => setShowParticipants((prev) => !prev)}>
                        <div className='cursor-pointer rounded-2xl  bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                            <User size={20} className='text-white cursor-pointer' />
                        </div>
                    </button>
                    {!isPersonalRoom && <EndCallButton />}
                </div>

            </div>
        </section>
    );
}

export default MeetingRoom