import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const activitiesEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(activitiesEndpoint).then(setActivities).catch((problem) => setError(problem.message))
  }, [])

  return <DataPage eyebrow="ACTIVITY LOG" title="Keep moving." description="Every minute adds momentum.">
    {error ? <ErrorMessage message={error} /> : <div className="data-grid activity-grid">{activities.map((activity) => <article className="data-card" key={activity._id ?? activity.id}><span className="card-kicker">{activity.type}</span><strong>{activity.minutes} <small>MIN</small></strong><time>{formatDate(activity.date)}</time></article>)}</div>}
  </DataPage>
}

export default Activities

function formatDate(value) { return value ? new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Date pending' }
function DataPage({ eyebrow, title, description, children }) { return <><div className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="intro">{description}</p></div>{children}</> }
function ErrorMessage({ message }) { return <p className="error-message" role="alert">{message}</p> }
