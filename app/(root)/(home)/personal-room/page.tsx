import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "IDEA - Personal Room",
    description: "Task management app",
    icons: {
      icon: '/icons/idea-logo.svg'
    }
  };
function PersonalRoom() {
    return (
        <section className='flex size-full flex-col gap-10 text-white'>
            <h1 className='text-3xl font-bold'>
                This is personal room
            </h1>
        </section>
    )
}

export default PersonalRoom

