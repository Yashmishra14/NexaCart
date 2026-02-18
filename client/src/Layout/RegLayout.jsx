import React from 'react'
import { Outlet } from 'react-router-dom'
import AiAvatar from './AiAvtar/AiAvtar'

const RegLayout = () => {
  return (
    <div className='min-h-screen flex bg-black text-white relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-purple-900 opacity-60' />

      <div className='absolute w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-30 top-[-80px] left-[-80px]' />
      <div className='absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-30 bottom-[-80px] right-[-80px]' />

      <div className='relative z-10 flex w-full'>
        {/* LEFT SIDE — Branding / AI Feel */}
        <div className='hidden md:flex w-1/2 flex-col justify-center px-16'>
          <h1 className='text-5xl font-bold leading-tight'>
            Smart Commerce <br />
            Powered by AI
          </h1>

          <p className='text-gray-300 mt-6 max-w-md'>
            Personalized recommendations, intelligent search, and automated
            shopping experiences built for the next generation of digital
            commerce.
          </p>

          {/* Decorative Line */}
          <div className='mt-8 h-[2px] w-40 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full' />
        </div>

        {/* RIGHT SIDE — Outlet Area */}
        <div className='flex w-full md:w-1/2 items-center justify-center p-6'>
          <div className='hidden lg:flex'>
            <AiAvatar />
          </div>
          {/* Glass Container */}
          <div className='w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-2'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegLayout
