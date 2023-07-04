import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { getProduct } from '../api/firebase'
import ProductCard from './ProductCard';

export default function Products() {
  const { isLoading, error, data:products } = useQuery( ['products'], getProduct);
  console.log('products??', products)


  return (
    <div className='w-full max-w-screen-2xl m-auto py-8 md:py-32'>
      <h2 className='md:text-2xl pb-4 pl-2 font-serif'>More to Explore</h2>
      { isLoading && <p>Loading...</p>}
      { error &&  <p>{error} 😥</p>}      
      <ul className='grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8 lg:gap-6 lg:gap-y-12'>
        { products && products.map( product => <ProductCard key={product.id} product={product} />  ) }
      </ul>
    </div>
  )
}