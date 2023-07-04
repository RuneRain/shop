import React from 'react'
import { PiMinusSquareLight, PiPlusSquareLight, PiXBold } from "react-icons/pi";
import { addOrUpdateToCart, removeFromCart } from '../api/firebase';
import {useMutation, useQueryClient} from '@tanstack/react-query'

export default function CartItem({product, product:{id, image, title, options, price, quantity}, uid}) {

  //productDetail에서 가져옴. useQuery Mutation사용- 실시간 업데이트를 위해
  const queryClient = useQueryClient();
  const addOrUpdatePlus = useMutation((product)=>
    addOrUpdateToCart(uid,{...product,quantity:quantity+1}),{
      onSuccess: () => queryClient.invalidateQueries(['carts',uid])
  })
  const addOrUpdateMinus = useMutation((product)=>
    addOrUpdateToCart(uid,{...product,quantity:quantity-1}),{
      onSuccess: () => queryClient.invalidateQueries(['carts',uid])
  })
  const removeCart = useMutation(()=>
    removeFromCart(uid, id), {
     onSuccess: () => queryClient.invalidateQueries(['carts', uid])
  })

  //여기에서 uid가 props로 불러온 유저 아이디라서, 따로 import 안 하고 불러와도 됨
  const handleMinus = ()=> {
    if(quantity < 2) return; //1일때에는 더이상 빼줄 수 없음
    addOrUpdateMinus.mutate(product);
  }
  
  const handlePlus = ()=> {
    //addOrUpdateToCart(uid,{...product,quantity:quantity+1})
    //유저아이디 / 내용을 다 불러와서 집어넣는데, quantity만 하나씩 증가하게 해서.

    addOrUpdatePlus.mutate(product);
  }
  const handleDelete = ()=> removeCart.mutate(uid, id);
  //const handleDelete = ()=> removeFromCart(uid, id);
  
  return (
    <li className='flex justify-between'>
      <img className='w-24' src={image} alt={title} />
      <div className='flex-1 flex justify-between ml-4'>
        <div className=''>
        <p className='text-lg truncate'>{title}</p>
          <p className='text-xl text-brand'>{options}</p>
          <p>{`₩${price}`}</p>
        </div>
        <div className="flex items-center gap-2 text-xl">
          <PiMinusSquareLight className='text-slate-400' onClick={handleMinus} />
          <span>{quantity}</span>
          <PiPlusSquareLight className='text-slate-400' onClick={handlePlus} />
          <PiXBold className='text-2xl' onClick={handleDelete} />
        </div>
      </div>
    </li>
  )
}
