import React from 'react';
import { useAuthContext } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children, requireAdmin}) {
  const {user} = useAuthContext();
  console.log('user????? ',user);

  if(!user || (requireAdmin && !user.isAdmin)){
    return <Navigate to='/' replace /> 
    // replace - 히스토리에 넣지 않음(뒤로 가기 불가능) 
  }

  return children;
}

/*
  로그인한 사용자가 있는지 확인? 
  그 사용자가 admin인지?
*/
