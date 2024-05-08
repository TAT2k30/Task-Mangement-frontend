'use client'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React from 'react';
import { Button } from './ui/button';
import { ListEndIcon, RemoveFormatting, StopCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

function EndCallButton() {
    const call = useCall();
    const router = useRouter();
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    const isMeetingOwner = localParticipant && call?.state.createdBy &&
        localParticipant.userId === call?.state.createdBy.id;

    if (!isMeetingOwner) return null;
    return (
        <Button className='cursor-pointer rounded-2xl  bg-red-500 px-4 py-2 hover:bg-red-400'
            onClick={async () => {
                await call.endCall();
                router.push('/');
            }}
        >
            End call for everyone
        </Button>
    );
}

export default EndCallButton;