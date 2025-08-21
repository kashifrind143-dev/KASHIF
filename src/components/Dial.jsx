import React from 'react'

export default function Dial({ value=0, max=1, subtitle='' }){
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  const r = 120
  const c = 2 * Math.PI * r
  const dash = (pct/100)*c
  return (
    <div className="dial-wrap">
      <svg className="dial" width="280" height="280" viewBox="0 0 280 280">
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#58a6ff"/>
            <stop offset="100%" stopColor="#00d1ff"/>
          </linearGradient>
        </defs>
        <g className="dial-bg">
          <circle cx="140" cy="140" r="120" fill="none" strokeWidth="16"/>
        </g>
        <g className="dial-progress">
          <circle cx="140" cy="140" r="120" fill="none" strokeWidth="16" stroke="url(#grad)"
            strokeDasharray={c} strokeDashoffset={c-dash} strokeLinecap="round"/>
        </g>
      </svg>
      <div className="dial-text">
        <div className="dial-big">{value.toFixed(6)}</div>
        <div className="dial-sub">{subtitle}</div>
      </div>
    </div>
  )
}
