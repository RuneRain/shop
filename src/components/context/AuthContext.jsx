import { createContext, useContext, useEffect, useState } from "react";
import { onUserStateChange,login, logout } from "../../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({children}){

  const [user, setUser] = useState(); //로그인여부(로그인정보)

  //화면이 마운트(리로드 될때) 로그인이 되어있는 아닌지 상태를 알아보는 함수 호출
  useEffect(() => {
    onUserStateChange((user)=> {
      setUser(user)
      console.log('user',user)
    });
  }, [])

  /* 🍋 userId만 가져오려고 uid부분 추가 */
  return (
    <AuthContext.Provider value={{user, uid:user && user.uid, login:login, logout:logout}}>
      {children}
    </AuthContext.Provider>
    )
}

export function useAuthContext(){
  return useContext(AuthContext);
}

