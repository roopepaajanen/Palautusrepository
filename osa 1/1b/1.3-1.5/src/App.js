const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}
const Content = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.name1} {props.exercises1}
        </p> <p>
        {props.name2} {props.exercises2}
        </p> <p>
        {props.name3} {props.exercises3}
        </p>
    </div>
  )
}
const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.total}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
    <div>
      <Header course={course} />
      <Content name1={parts[0].name} exercises1={parts[0].exercises}
              name2={parts[1].name} exercises2={parts[1].exercises}
              name3={parts[2].name} exercises3={parts[2].exercises}/>
      <Total total={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  )
}


export default App