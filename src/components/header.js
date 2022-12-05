import React from 'react'
import {ShoppingBagIcon} from '@heroicons/react/24/outline'
export default function Header({cartCount,handleOpen}) {
  return (
    <div className='w-full h-20 bg-gray-100 py-2 px-10 fixed top-0 left-0 justify-end items-center flex'>
        <div className='w-12 h-12 relative rounded-full bg-slate-200 flex items-center justify-center cursor-pointer' onClick={handleOpen}>
            <ShoppingBagIcon className='w-6 h-6'/>
            {cartCount?.length?<div className='absolute top-1 right-1 text-xs rounded-full bg-red-500 text-white px-1'>{cartCount.length}</div>:<></>}
        </div>

    </div>
  )
}
