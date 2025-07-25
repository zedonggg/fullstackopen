const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const now = Date()
  const a = 10
  const b = 20
  const age = 5
  console.log(now, a+b)

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="sdfsfs" age={age}/>
    </div>
  )
}

export default App
