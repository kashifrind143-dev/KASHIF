import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Splash(){
  const nav = useNavigate()
  useEffect(()=>{
    const t = setTimeout(()=> nav('/mining', { replace:true }), 1600)
    return ()=>clearTimeout(t)
  },[])
  return (
    <div className="container center" style={{flexDirection:'column', gap:16}}>
      <img src="/roar-logo.png" alt="ROAR" className="logo-splash glow"/>
      <div style={{opacity:.8}}>Mine • Earn • ROAR</div>
    </div>
  )
}
