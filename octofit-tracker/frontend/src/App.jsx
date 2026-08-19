import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import logo from '../../../docs/octofitapp-small.png'

const navigation = [
  { label: 'Overview', to: '/' },
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Teams', to: '/teams' },
  { label: 'Users', to: '/users' },
  { label: 'Workouts', to: '/workouts' },
]

function Overview() {
  return (
    <section className="overview">
      <p className="eyebrow">OCTOFIT / COMMAND CENTER</p>
      <h1>Train together.<br /><span>Go further.</span></h1>
      <p className="intro">A live pulse of your teams, training minutes, and next challenge.</p>
      <div className="overview-links">
        <NavLink className="primary-action" to="/activities">Log an activity <span aria-hidden="true">-&gt;</span></NavLink>
        <NavLink className="text-action" to="/leaderboard">View the leaderboard</NavLink>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/" aria-label="OctoFit home">
          <img src={logo} alt="" />
          <span>octofit<span className="brand-mark">/</span>tracker</span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'}>{item.label}</NavLink>)}
        </nav>
        <div className="status-pill"><span /> API online</div>
      </header>
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
      <footer className="footer"><span>OCTOFIT TRACKER</span><span>BUILD YOUR BEST WEEK</span></footer>
    </div>
  )
}

export default App
