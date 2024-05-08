import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "IDEA - Upcomings",
    description: "Task management app",
    icons: {
      icon: '/icons/idea-logo.svg'
    }
  };
function Upcoming() {
    return (
        <section className='flex size-full flex-col gap-10 text-white'>
            <h1 className='text-3xl font-bold'>
                Upcoming page
            </h1>
        </section>
    )
}

export default Upcoming

