import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({ text }) => (<h1>{text}</h1>)

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const GiveFeedback = ({ handleGood, handleNeutral, handleBad }) => {
  return (
    <div>
      <Title text='give feedback' />
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
    </div>
  )
}

const Statistic = ({ text, value, unit }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {unit ? unit : ''}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  return (
    <div>
      <Title text='statistics' />
      {
        total > 0 ?
          <table>
            <tbody>
              <Statistic text='good' value={good} />
              <Statistic text='neutral' value={neutral} />
              <Statistic text='bad' value={bad} />
              <Statistic text='average' value={(good * 1 + bad * -1) / total} />
              <Statistic text='positive' value={good / total} unit='%' />
            </tbody>
          </table> :
          <p>
            No feedback given
          </p>
      }
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <GiveFeedback
        handleGood={handleGood}
        handleNeutral={handleNeutral}
        handleBad={handleBad}
      />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)