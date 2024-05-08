import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "IDEA - Previous",
    description: "Task management app",
    icons: {
      icon: '/icons/idea-logo.svg'
    }
  };
function Previous() {
    return (
        <section className='flex size-full flex-col gap-10 text-white'>
            <h1 className='text-3xl font-bold'>
                Previous page
            </h1>
        </section>
    )
}

export default Previous

