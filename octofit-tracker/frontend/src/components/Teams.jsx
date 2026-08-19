import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((problem) => setError(problem.message)) }, [])
  return <><div className="page-heading"><p className="eyebrow">YOUR CREW</p><h1>Stronger together.</h1><p className="intro">Find your people. Chase the next point.</p></div>{error ? <p className="error-message">{error}</p> : <div className="data-grid">{teams.map((team) => <article className="data-card team-card" key={team._id ?? team.id ?? team.name}><span className="card-kicker">TEAM</span><h2>{team.name}</h2><p>Captain: {team.captain}</p><strong>{team.points?.toLocaleString() ?? 0} <small>PTS</small></strong></article>)}</div>}</>
}
