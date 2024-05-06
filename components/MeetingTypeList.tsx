'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from './ui/use-toast';
function MeetingTypeList() {
    const [meetingState, setMeetingState] = useState<'isSchedualMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
    const router = useRouter();
    const { toast } = useToast();
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    });
    const [callDetails, setCallDetails] = useState<Call>();

    const createMeeting = async () => {
        if (!user || !client) return;
        try {
            if(!values.dateTime){
                toast({ title: "Please select a date and time", })
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id);
            if (!call) throw new Error("Failed to create a call")
            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant meeting'
            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })
            setCallDetails(call);
            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }
            toast({ title: "Meeting created", })
        } catch (error) {
            toast({ title: "Failed to create meeting", })
        }
    }
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                img="/icons/add-meeting.svg"
                title="New Meeting"
                description="Start an instant meeting"
                handleClick={() => { setMeetingState('isInstantMeeting') }}
                className="bg-orange-1"
            />
            <HomeCard
                img="/icons/schedule.svg"
                title="Schedual Meeting"
                description="Plann your meeting"
                handleClick={() => { setMeetingState('isSchedualMeeting') }}
                className="bg-blue-1"
            />
            <HomeCard
                img="/icons/recordings.svg"
                title="View recordings"
                description="Checkout your recordings"
                handleClick={() => { router.push('/recordings') }}
                className="bg-purple-1"
            />
            <HomeCard
                img="/icons/join-meeting.svg"
                title="Join Meeting"
                description="Via invitation link"
                handleClick={() => { setMeetingState('isJoiningMeeting') }}
                className="bg-yellow-1"
            />
            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
        </section>
    );
}

export default MeetingTypeList;