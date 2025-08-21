import React from 'react'
import { Routes, Route, useLocation, Link, Navigate } from 'react-router-dom'
import Splash from './pages/Splash'
import Mining from './pages/Mining'
import Wallet from './pages/Wallet'

function Topbar(){ 
  return (
    <div className="topbar">
      <div className="title">ROAR</div>
    </div>
  )
}

function BottomNav(){
  const { pathname } = useLocation()
  const items = [
    { to:'/wallet', label:'Wallet' },
    { to:'/mining', label:'Mining' },
    { to:'/profile', label:'Profile' }
  ]
  return (
    <div className="bottomnav">
      {items.map(it => (
        <Link key={it.to} to={it.to} className={'nav-item ' + (pathname===it.to?'active':'')}>
          <div>{it.label}</div>
        </Link>
      ))}
    </div>
  )
}

export default function App(){
  return (
    <div className="app">
      <Topbar/>
      <Routes>
        <Route path="/" element={<Splash/>}/>
        <Route path="/mining" element={<Mining/>}/>
        <Route path="/wallet" element={<Wallet/>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
      <BottomNav/>
    </div>
  )
}
