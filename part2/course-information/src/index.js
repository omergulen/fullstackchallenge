import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(el => (
        <Part key={el.id} name={el.name} exercises={el.exercises} />
      ))}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total course={course} />
    </div>
  )
}

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
)

const Total = ({ course }) => {
  return (
    <b>Number of exercises {course.parts.map(el => el.exercises).reduce((a, b) => a + b, 0)}</b>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const coursesRenderer = () => {
    return courses.map(course => <Course course={course} />)
  }

  return (
    <div>
      {coursesRenderer()}
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))