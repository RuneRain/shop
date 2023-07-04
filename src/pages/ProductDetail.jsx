import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addOrUpdateToCart } from '../api/firebase';
import { useAuthContext } from '../components/context/AuthContext';
import Button from '../components/ui/Button';
import {useMutation, useQueryClient} from '@tanstack/react-query'

export default function ProductDetail() {
  const { uid } = useAuthContext();
  const { state: {product: {id,category,description,image,options,price,title}} } = useLocation();
  //useLocation = obj + state 가져옴
  const [selected, setSelected] = useState(options && options[0]);
  const [success, setSuccess] = useState();  //성공표시

  /*🍏 useQuery 중에 Mutation - 실시간 업데이트 위해서 */
  const queryClient = useQueryClient();
  const addOrUpdateItem = useMutation((product)=> addOrUpdateToCart(uid,product),{
    onSucces:()=>queryClient.invalidateQueries(['cart', uid])
    //carts키를 가진 쿼리를 무효화(+uid를 확인하고 바로 업데이트 해줘)
    //cartstatus.jsx 내에서 따로 시간 선언을 해줬음. 무효화되는 부분이지만 안 해주면 오류남.
    //queryClient는 따로 이름을 지정해서 선언후 사용 가능.
  })


  const handleSelect = (e)=> {
    //console.log('e??',e)
    //발생되는 이벤트 콘솔로 알아오기
    //알아오고 싶을때는 하단에 있는 건, 꺼놓은 상태에서 적용해야 함

    setSelected(e.target.value)
    console.log('e.target.value?',e.target.value)
    //option 선택된 값 가져오기. 옵션 누르고 장바구니 추가 누르면 적용되서 뜸.
  }
  
  /* 장바구니에 추가하기 */
  const handleClick = (e) => {
    const product = { id, title, image, options:selected, price, quantity:1 }
    //options:selected = option을 다 가져오는 것이 아니라, 선택된 값만 가져오려고.
    //quantity:1 quantity는 수량 뜻하고, 처음엔 1개가 보이게
    
    //addOrUpdateToCart(uid, product)
    //🍏🚨위에서 선언해줬기때문에 지워주는 부분
    addOrUpdateItem.mutate(product, {
      onSuccess:()=>{
        setSuccess('장바구니에 추가되었습니다.')
        setTimeout(()=>setSuccess(null),3000)
      }
    })
  }
  

  return (
    <div className='w-full max-w-screen-xl m-auto py-24 md:py-40'>
      <section className='flex flex-col md:flex-row'>
        <img src={image} alt={title} />
        <div>
          <p>여성의류 / {category}</p>
          <h2>{title}</h2>
          <p>{`￦${price}`}</p>
          <p>{description}</p>
          <div>
            <label htmlFor="select">옵션</label>
            <select name="" id="select" onChange={handleSelect} value={selected}>
            {/*selected ustState에 적용하게 하려고 이 이름으로 설정해줌*/}
            {options && options.map((option,index)=>(
              <option key={index}>{option}</option>
            ))}
            {/* <option태그> {props로 가져온 옵션} </option태그>
            map으로 돌려줬으면 무조건 키값 필요해서, index(1,2,3...)으로 붙여줌*/}
            </select>
          </div>
          {success && (<p className='text-center text-2xl pb-6'> 🎁 {success}</p>)}
          <Button onClick={handleClick} text='장바구니에 추가' />
        </div>
      </section>
    </div>
  )
}
