import React, { useEffect, useState } from 'react'

function loadState(){
  try{ return JSON.parse(localStorage.getItem('roar_state')) || { balance:0, lastClaimAt:0 } }
  catch{ return { balance:0, lastClaimAt:0 } }
}

export default function Wallet(){
  const [state, setState] = useState(loadState())
  useEffect(()=>{
    const i = setInterval(()=> setState(loadState()), 2000)
    return ()=> clearInterval(i)
  },[])
  return (
    <div className="container">
      <div className="card" style={{textAlign:'center'}}>
        <div style={{opacity:.7, marginBottom:6}}>TOTAL BALANCE</div>
        <div style={{fontSize:32, fontWeight:800}}>{state.balance.toFixed(6)} ROAR</div>
        <div style={{marginTop:10, opacity:.6}}>This is your total collected ROAR points.</div>
      </div>
    </div>
  )
}
