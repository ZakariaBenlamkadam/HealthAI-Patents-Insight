import React from 'react'
import {ReactTyped} from 'react-typed';

const Hero = () => {
  return (
    <div className='text-white'>
        <div className='max-x-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
            <p className='text-[#8158cc44] text-2xl font-bold md: sm:text-2xl p-2'>Innovating Medicine & AI Patents.</p>
            <h1 className='md:text-7xl sm:text-6xl text-5xl font-bold md:py-8'>Shaping Tomorrow's Healthcare.</h1>
            <div>
            <p className='text-[#8158cc44] text-3xl font-bold md:sm:text-2xl p-2'>
              Include Patents about{' '}
              <span className='text-[#d1191944] md:text-5xl sm:text-4xl text-xl font-bold py-4 inline-flex items-center'>
                <ReactTyped
                  strings={['Medicine', 'Ai', 'HealthCare']}
                  typeSpeed={120}
                  backSpeed={140}
                  loop
                />
              </span>
            </p>
            </div>

        </div>

    </div>
  )
}

export default Hero