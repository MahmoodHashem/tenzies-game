import React from 'react'

export default function Die(props) {
  return (
    <button  className={`dice ${props.isHeld ? "held": ''}`}  onClick={props.onclick}>{props.die}</button>
  )
}
