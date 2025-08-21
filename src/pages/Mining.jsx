import React, { useEffect, useState } from 'react'
import Dial from '../components/Dial'

const FOUR_HOURS_MS = 4*60*60*1000
const CLAIM_AMOUNT = 1.0 // ROAR per 4 hours

function loadState(){
  try{ return JSON.parse(localStorage.getItem('roar_state')) || { balance:0, lastClaimAt:0 } }
  catch{ return { balance:0, lastClaimAt:0 } }
}
function saveState(s){ localStorage.setItem('roar_state', JSON.stringify(s)) }

export default function Mining(){
  const [state, setState] = useState(loadState())
  const [now, setNow] = useState(Date.now())

  useEffect(()=>{
    const id = setInterval(()=> setNow(Date.now()), 1000)
    return ()=> clearInterval(id)
  },[])

  // elapsed since last claim
  const elapsed = state.lastClaimAt ? (now - state.lastClaimAt) : Infinity
  const cycles = Math.floor(elapsed / FOUR_HOURS_MS)
  const ready = cycles >= 1

  // countdown
  const remain = FOUR_HOURS_MS - (elapsed % FOUR_HOURS_MS || 0)
  const h = Math.max(0, Math.floor(remain / 3600000))
  const m = Math.max(0, Math.floor((remain % 3600000) / 60000))
  const s = Math.max(0, Math.floor((remain % 60000) / 1000))

  function claim(){
    if(!ready) return
    const gained = cycles * CLAIM_AMOUNT
    const next = { balance: state.balance + gained, lastClaimAt: now }
    setState(next); saveState(next)
  }

  return (
    <div className="container">
      <div className="card">
        <Dial value={state.balance} max={state.balance + CLAIM_AMOUNT} subtitle={"Balance • ROAR"} />
        <div className="row" style={{justifyContent:'space-between', marginTop:8}}>
          <div className="kpi"><div className="l">Fill</div><div className="v">{h}H : {m}M : {s}S</div></div>
          <div className="kpi"><div className="l">Rate</div><div className="v">{CLAIM_AMOUNT} ROAR / 4h</div></div>
        </div>
        <div style={{marginTop:16}}>
          <button className="btn btn-wide" disabled={!ready} onClick={claim}>
            {ready ? 'Claim ROAR' : 'Come back later'}
          </button>
        </div>
      </div>
    </div>
  )
}
