import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch((problem) => setError(problem.message)) }, [])
  return <><div className="page-heading"><p className="eyebrow">TEAM RANKINGS</p><h1>Make it count.</h1><p className="intro">The week belongs to whoever shows up.</p></div>{error ? <p className="error-message">{error}</p> : <div className="leaderboard-list">{entries.map((entry, index) => <article className={`rank-row rank-${index + 1}`} key={entry._id ?? entry.id ?? entry.rank}><span className="rank-number">{String(entry.rank ?? index + 1).padStart(2, '0')}</span><span className="rank-name">{entry.name}</span><strong>{entry.points?.toLocaleString() ?? 0}<small> PTS</small></strong></article>)}</div>}</>
}
