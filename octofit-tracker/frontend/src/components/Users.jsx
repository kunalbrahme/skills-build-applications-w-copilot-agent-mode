import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(usersEndpoint).then(setUsers).catch((problem) => setError(problem.message)) }, [])
  return <><div className="page-heading"><p className="eyebrow">THE COMMUNITY</p><h1>Meet the team.</h1><p className="intro">A little accountability goes a long way.</p></div>{error ? <p className="error-message">{error}</p> : <div className="user-list">{users.map((user) => <article className="user-row" key={user._id ?? user.id ?? user.email}><span className="avatar">{user.name?.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span><span><strong>{user.name}</strong><small>{user.email}</small></span><em>{user.team}</em></article>)}</div>}</>
}
