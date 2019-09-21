import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <>
      {props.content.map(el => (
        <p>
          {el.part} {el.exercises}
        </p>
      ))}
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const part2 = 'Using props to pass data'
  const part3 = 'State of a component'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  const content = [
    { part: part1, exercises: exercises1 },
    { part: part2, exercises: exercises2 },
    { part: part3, exercises: exercises3 },
  ]

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))