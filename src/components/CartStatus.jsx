import React from 'react';
import { HiShoppingBag } from "react-icons/hi";
import { useAuthContext } from '../components/context/AuthContext';
import { getCart } from '../api/firebase';
import { useQuery } from '@tanstack/react-query'

export default function CartStatus() {
  const { uid } = useAuthContext();//현재 사용자가 누군지 알아오는 용도
  const { data:products } = useQuery(['carts',uid || ''], ()=> getCart(uid),{staleTime:1000});
  //console.log('CartStatus data??',data)
  //staleTime:1000*5 5초 동안은 캐시내용 가져옴

  return (
    <div className='relative'>
      <HiShoppingBag className='text-xl' />
      {products && (<p className='absolute -top-1 -right-2 text-sm'>{products.length}</p>)}
      {/* top-1 : 1=4px. 4px만큼 떨어져있게. */}
    </div>
  )
}
