import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, product: {id,image,title,price,category}}) {
  //product(useNavigate)이용, productDetail에 통째로 넘겨줄 데이터
  //product: {id,image,title,price,category}는 구조분해 해서 가져오는 부분
  const navigate = useNavigate();
  //링크 걸어줌. ProductDtail로 넘어가야 함.

  return (
    <li 
      onClick={()=>{ navigate(`/products/${id}`,{ state:{product}}  )} }
      className='rounded-sm hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-300 pb-6'>
      <img className='w-full' src={image} alt={title} />
      <div className='flex justify-between items-center mt-6 mb-2 px-2'>
        <h3 className='truncate'>{title}</h3>
        <p className=' text-red-700 text-sm'>{`₩${price}`}</p>
      </div>
      <p className='text-sm text-slate-400 pl-2'>{category}</p>
    </li>
  )
}