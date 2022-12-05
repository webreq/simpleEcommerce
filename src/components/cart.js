import React from 'react'
import {TrashIcon} from '@heroicons/react/24/outline'
function Cart({product,decrement,increment,deleteItem}) {
  return (
    <div className='w-full h-auto p-10 mt-20 flex flex-col space-y-4 justify-center items-center relative'>
        {product?.map((val,index)=><div key={index} className='flex space-x-10 w-full h-20 border-orange-200 border-b items-center'>
            <img src={val?.image} className="w-14 h-10" />
            <div className='w-80 h-auto line-clamp-1'>{val?.title}</div>
            <div className='flex space-x-2'>
                <div className='cursor-pointer select-none' onClick={()=>decrement(val.id)}>-</div>
                <p className='font-semibold'>{val.qty}</p>
                <div className='cursor-pointer select-none' onClick={()=>increment(val.id)}>+</div>
            </div>
            <p className='font-semibold'>{val.price}</p>
            <p className='font-bold'>${val.price*val.qty}</p>
            <TrashIcon className='w-5 h-5 bg-red-500 text-white rounded-sm cursor-pointer' onClick={()=>deleteItem(val.id)}/>
        </div>)}
        {product.length?<div className='flex self-end w-40 border-b border-orange-600 text-lg font-bold'>Total : ${
            product.reduce((sum,item)=>{
                return sum + (item.qty * item.price)
            },0).toFixed(2)
        }</div>:<p className='text-xl font-bold text-gray-500'>Belum Ada Produk yang Ditambahkan</p>}
    </div>
  )
}

export default Cart