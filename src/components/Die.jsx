import React from 'react'

export default function Die(props) {

  const divs = []

  for (let i = 0; i < props.die; i++) {
    divs.push(<div key={i}></div> )
  }

  return (
    <button data-dot={props.die} className={`dice ${props.isHeld ? "held" : ''}`} onClick={props.onclick}>{ divs}</button>
  )
}
