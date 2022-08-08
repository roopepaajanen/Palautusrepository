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
  return (
    <div>
      <p>
        {props.part1} {props.exercises1}
        </p> <p>
        {props.part2} {props.exercises2}
        </p> <p>
        {props.part3} {props.exercises3}
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

  return (
    <div>
      <Header course={course} />
      <Content part1={'Fundamentals of React'} exercises1={10} 
              part2={'Using props to pass data'} exercises2={7} 
              part3={'State of a component'} exercises3={14} />
      <Total total={10+7+14} />
    </div>
  )
}

export default App