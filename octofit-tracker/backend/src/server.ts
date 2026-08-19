import express from 'express';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

const users = [
  { id: 1, name: 'Ava Thompson', email: 'ava@example.com', team: 'Trailblazers' },
  { id: 2, name: 'Marcus Lee', email: 'marcus@example.com', team: 'Velocity' },
];

const teams = [
  { id: 1, name: 'Trailblazers', captain: 'Ava Thompson', points: 1200 },
  { id: 2, name: 'Velocity', captain: 'Marcus Lee', points: 1100 },
];

const activities = [
  { id: 1, userId: 1, type: 'Running', minutes: 42, date: '2026-08-01' },
  { id: 2, userId: 2, type: 'Strength', minutes: 35, date: '2026-08-02' },
];

const leaderboard = [
  { rank: 1, name: 'Ava Thompson', points: 1200 },
  { rank: 2, name: 'Marcus Lee', points: 1100 },
];

const workouts = [
  { id: 1, title: 'Sprint Intervals', difficulty: 'Intermediate', duration: 25 },
  { id: 2, title: 'Core Circuit', difficulty: 'Beginner', duration: 20 },
];

app.use(express.json());

app.get('/api', (_request, response) => {
  response.json({
    name: 'OctoFit Tracker API',
    baseUrl: apiBaseUrl,
    status: 'ok',
  });
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl: apiBaseUrl });
});

app.get('/api/users/', (_request, response) => {
  response.json({ baseUrl: apiBaseUrl, data: users });
});

app.post('/api/users/', (request, response) => {
  const payload = request.body ?? {};
  const nextUser = { id: Date.now(), ...payload };
  users.push(nextUser);
  response.status(201).json({ message: 'User created', data: nextUser });
});

app.get('/api/teams/', (_request, response) => {
  response.json({ baseUrl: apiBaseUrl, data: teams });
});

app.post('/api/teams/', (request, response) => {
  const payload = request.body ?? {};
  const nextTeam = { id: Date.now(), ...payload };
  teams.push(nextTeam);
  response.status(201).json({ message: 'Team created', data: nextTeam });
});

app.get('/api/activities/', (_request, response) => {
  response.json({ baseUrl: apiBaseUrl, data: activities });
});

app.post('/api/activities/', (request, response) => {
  const payload = request.body ?? {};
  const nextActivity = { id: Date.now(), ...payload };
  activities.push(nextActivity);
  response.status(201).json({ message: 'Activity logged', data: nextActivity });
});

app.get('/api/leaderboard/', (_request, response) => {
  response.json({ baseUrl: apiBaseUrl, data: leaderboard });
});

app.post('/api/leaderboard/', (request, response) => {
  const payload = request.body ?? {};
  const nextLeaderboardEntry = { rank: leaderboard.length + 1, ...payload };
  leaderboard.push(nextLeaderboardEntry);
  response.status(201).json({ message: 'Leaderboard updated', data: nextLeaderboardEntry });
});

app.get('/api/workouts/', (_request, response) => {
  response.json({ baseUrl: apiBaseUrl, data: workouts });
});

app.post('/api/workouts/', (request, response) => {
  const payload = request.body ?? {};
  const nextWorkout = { id: Date.now(), ...payload };
  workouts.push(nextWorkout);
  response.status(201).json({ message: 'Workout created', data: nextWorkout });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
