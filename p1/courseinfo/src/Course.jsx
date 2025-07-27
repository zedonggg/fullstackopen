const Course = ({courses}) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          <ul>
            {course.parts.map(part => (
              <li key={part.id}>{part.name} {part.exercises}</li>
            ))}
          </ul>
          <h2>{course.parts.reduce((x,y) => x + y.exercises, 0)}</h2>
        </div>
      ))}
    </div>
  )
}

export default Course
