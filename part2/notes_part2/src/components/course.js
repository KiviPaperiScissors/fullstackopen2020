import React from 'react'

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.reduce((summa, part) =>
    summa + part.exercises, 0)

  return(
    <p>Number of exercises {sum}</p>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </>
)

export default Course
