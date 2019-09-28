import React from 'react'


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
    <b>Number of exercises {course.parts.reduce((a, b) => a + b.exercises, 0)}</b>
  )
}

export default Course