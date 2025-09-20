import React from 'react'
import { useAuth } from '../context/AdminAuthContext'

export default function Protectedroute({children}) {
  const {Admin} = useAuth()
  if(!Admin){
      window.location.href = '/admin/login'
      return null
  }
  return (
    <>
      {children}
    </>
  )
}
