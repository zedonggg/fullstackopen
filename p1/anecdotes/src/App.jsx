import { useState } from 'react'

const Button = ({label, handler}) => {
  return (
    <button onClick={handler}>{label}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [counts, setCounts] = useState(new Array(anecdotes.length).fill(0))
  const [maxIndex, setMaxIndex] = useState(0)
  

  function setRandomNo() {
    const randNo = Math.floor(Math.random() * anecdotes.length)
    setSelected(randNo)
  }
  

  function vote() {
    const copy = [...counts]
    copy[selected] += 1
    if (copy[selected] > counts[maxIndex]) {
      setMaxIndex(selected)
    }
    setCounts(copy)
  }

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}<br></br>
        has {counts[selected]} votes<br></br>
        <Button label="vote" handler={vote} />
        <Button label="next anecdote" handler={setRandomNo} />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        {anecdotes[maxIndex]}<br></br>
        has {counts[maxIndex]} votes<br></br>
      </div>
    </>
  )
}

export default App
