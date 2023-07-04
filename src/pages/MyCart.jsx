import React from 'react';
import { getCart } from '../api/firebase';
import { useAuthContext } from '../components/context/AuthContext';
import { useQuery } from '@tanstack/react-query'
import CartItem from '../components/CartItem';
import Button from '../components/ui/Button'
import { LiaPlusSolid, LiaEqualsSolid } from "react-icons/lia";

const MONEY_CLASS = 'text-2xl text-red-700';
const SHOPPING = 3000; //배송액

export default function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data:products } = useQuery(['carts',uid || ''],()=>getCart(uid),{staleTime:1000})  

  if(isLoading) return <p>Loading...</p>;
  /* 쇼핑카트에 아이템이 없을 때 */
  const hasProducts = products && products.length > 0 ; 
  //products가 있을 때, products의 수가 0보다 작을 때(=없을때)

  /* 총합 */
  //형식 : const totalPrice = products && products.reduce((prev, current)=>{prev + (current * 수량)})
  const totalPrice = products && products.reduce(
    (sum, value)=> sum + (parseInt(value.price) * value.quantity),0)

  return (
    <section className='w-full max-w-scree-xl m-auto py-24 -md:py-40'>
      <div className='flex flex-col'>
        <h2 className='text-center text-2xl font-bold pb-4 border-b border-slate-300'>내 장바구니</h2>
        <div>
          <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
            {!hasProducts && <p className='py-50'>장바구니에 들어있는 상품이 없습니다.</p>}
            {products && products.map((product)=>(
              <CartItem key={product.id} product={product} uid={uid} />
            ))}
          </ul>
          <div className='flex justify-between items-center text-center mb-8 px-2 md:px-8 lg:px-20'>
            <div>
            상품 총액
            <p>{`￦${totalPrice}`}</p>
            </div>
            <LiaPlusSolid />
            <div>
            배송비
            <p className={MONEY_CLASS}>₩ {SHOPPING} </p>
            </div>
            <LiaEqualsSolid />
            <div>총가격
              <p>￦{totalPrice + SHOPPING}</p>
            </div>
          </div>
          <div className="text-center text-xl p-4">
            <Button className="" text='주문하기'></Button>
          </div>
        </div>
      </div>
    </section>
  )
}
