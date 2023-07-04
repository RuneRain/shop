import React from 'react'

export default function Button({onClick,text}) {
  return (
    <button className='bg-brand text-white py-2 px-4  rounded-sm hover:brightness-150 text-sm' onClick={onClick}>{text}</button>
  )
}
