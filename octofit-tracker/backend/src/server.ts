import express from 'express';
import { connectDatabase } from './config/database.js';
import { Activity } from './models/Activity.js';
import { Leaderboard } from './models/Leaderboard.js';
import { Team } from './models/Team.js';
import { User } from './models/User.js';
import { Workout } from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

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

app.get('/api/users/', async (_request, response) => {
  response.json({ baseUrl: apiBaseUrl, data: await User.find().lean() });
});

app.post('/api/users/', async (request, response) => {
  const user = await User.create(request.body ?? {});
  response.status(201).json({ message: 'User created', data: user });
});

app.get('/api/teams/', async (_request, response) => {
  response.json({ baseUrl: apiBaseUrl, data: await Team.find().lean() });
});

app.post('/api/teams/', async (request, response) => {
  const team = await Team.create(request.body ?? {});
  response.status(201).json({ message: 'Team created', data: team });
});

app.get('/api/activities/', async (_request, response) => {
  response.json({ baseUrl: apiBaseUrl, data: await Activity.find().lean() });
});

app.post('/api/activities/', async (request, response) => {
  const activity = await Activity.create(request.body ?? {});
  response.status(201).json({ message: 'Activity logged', data: activity });
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json({ baseUrl: apiBaseUrl, data: await Leaderboard.find().sort({ rank: 1 }).lean() });
});

app.post('/api/leaderboard/', async (request, response) => {
  const rank = (await Leaderboard.countDocuments()) + 1;
  const entry = await Leaderboard.create({ ...request.body, rank });
  response.status(201).json({ message: 'Leaderboard updated', data: entry });
});

app.get('/api/workouts/', async (_request, response) => {
  response.json({ baseUrl: apiBaseUrl, data: await Workout.find().lean() });
});

app.post('/api/workouts/', async (request, response) => {
  const workout = await Workout.create(request.body ?? {});
  response.status(201).json({ message: 'Workout created', data: workout });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit API listening on port ${port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  })
  .catch((error) => {
    console.error('Unable to start API:', error);
    process.exit(1);
  });
