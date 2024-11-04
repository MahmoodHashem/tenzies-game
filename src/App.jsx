import React, { useState } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'

export default function App() {

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      const randomNumber = {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
      newDice.push(randomNumber)
    }

    return newDice
  }

  function rollDice() {
    setNumbers(prev => prev.map(die => {
      return die.isHeld ? die : {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
    }))
  }

  function hold(id) {

    setNumbers(prev => prev.map(dice => {
      if (dice.id === id) {
        return { ...dice, isHeld: !dice.isHeld }
      } else {
        return dice
      }
    }))
  }

  const [numbers, setNumbers] = useState(allNewDice())


  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dices">
        {
          numbers.map((die, i) => (
            <Die key={die.id} isHeld={die.isHeld} onclick={() => hold(die.id)} die={die.value} />
          ))
        }
      </div>
      <button className='roll-dice' onClick={rollDice}>Roll</button>
    </main>
  )
}
