import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((problem) => setError(problem.message)) }, [])
  return <><div className="page-heading"><p className="eyebrow">WORKOUT LIBRARY</p><h1>Pick your push.</h1><p className="intro">Meet the session that fits your energy today.</p></div>{error ? <p className="error-message">{error}</p> : <div className="data-grid workout-grid">{workouts.map((workout) => <article className="data-card workout-card" key={workout._id ?? workout.id ?? workout.title}><span className="card-kicker">{workout.difficulty}</span><h2>{workout.title}</h2><strong>{workout.duration} <small>MIN</small></strong></article>)}</div>}</>
}
