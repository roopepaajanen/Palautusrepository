import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const setGood = newValue => {
  console.log('value now', newValue)
  setGood(newValue)
}
const setNeutral = newValue => {
  console.log('value now', newValue)
  setNeutral(newValue)
}
const setBad = newValue => {
  console.log('value now', newValue)
  setBad(newValue)
}
const Statistics = (props) => {
  if(props.Allvalue===0){
    return(
    <div>No feedback given</div>
    )
  }
  else{
  return (
    <div>
      <p>
        Good {props.Goodvalue}
        </p> <p>
        Neutral {props.Neutralvalue}
        </p> <p>
        Bad {props.Badvalue}
        </p>
        <p>
        All {props.Allvalue}
        </p> <p>
        Average {props.Averagevalue}
        </p> <p>
        positive {props.Positivevalue.toFixed(2)}%
        </p>
    </div>
  )
  }
  
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <h2>Statistic</h2>
        <Statistics Goodvalue={good} 
        Neutralvalue={neutral} 
        Badvalue={bad} 
        Allvalue={good+neutral+bad}                     
        Averagevalue={(good-bad)/(good+bad+neutral)} 
        Positivevalue={(good/(good+bad+neutral))*100} /> 
    </div>
  )
}
export default App