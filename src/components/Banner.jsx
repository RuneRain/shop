import React from 'react'

export default function Banner() {
  return (
    <section className='relative'>
      <div className="">
        <img className="hidden md:block" src="./images/img01.webp" alt="pc"/>
        <img className="md:hidden" src="./images/img01_m.webp" alt="mobile"/>
      </div>
      <div className='absolute w-full top-2/3 md:top-1/2 text-center'>
        <img className="w-1/3 md:w-1/6 m-auto mb-4" src="./images/womens_polo_logo_white.svg" alt="배너안로고" />
        <p className=" text-white text-5xl md:text-4xl font-serif">Foundation</p>
      </div>
    </section>
  )
}

