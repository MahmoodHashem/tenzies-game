import { useEffect, useState } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti';

export default function App() {


  const [numbers, setNumbers] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false);
  const [rollCounts, setRollCounts] = useState(0)
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);






  useEffect(() => {
    const held = numbers.every(dice => {
      return dice.isHeld
    })
    const firstValue = numbers[0].value
    const isEqual = numbers.every(dice => dice.value === firstValue)
    if (held && isEqual) {
      setTenzies(true)
      setIsRunning(false);

    }

  }, [numbers])


  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000); // Update every second
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }

    // Cleanup interval on component unmount or when isRunning changes
    return () => clearInterval(interval);
  }, [isRunning]);



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
    setRollCounts(prev => prev + 1)
    setIsRunning(true);
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

  function reset() {
    setNumbers(allNewDice())
    setTenzies(false)
    setRollCounts(0)
    setIsRunning(true);
    setTime(0);

  }


  return (
    <main>

      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dices">
        {tenzies && <Confetti />}
        {
          numbers.map((die) => (
            <Die key={die.id} isHeld={die.isHeld} onclick={() => hold(die.id)} die={die.value} />
          ))
        }
      </div>

      <div className='roll-container' >
        <p> <b> {rollCounts}</b> Times Rolled </p>
        <button className='roll-dice' onClick={tenzies ? reset : rollDice}> {tenzies ? "New Game" : "Roll"}</button>
        <p>Timer <br /> {time} s</p> 
      </div>
    </main>
  )
}
