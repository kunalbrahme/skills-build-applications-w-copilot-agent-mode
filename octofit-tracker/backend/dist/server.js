"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_js_1 = require("./config/database.js");
const Activity_js_1 = require("./models/Activity.js");
const Leaderboard_js_1 = require("./models/Leaderboard.js");
const Team_js_1 = require("./models/Team.js");
const User_js_1 = require("./models/User.js");
const Workout_js_1 = require("./models/Workout.js");
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
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
    response.json({ baseUrl: apiBaseUrl, data: await User_js_1.User.find().lean() });
});
app.post('/api/users/', async (request, response) => {
    const user = await User_js_1.User.create(request.body ?? {});
    response.status(201).json({ message: 'User created', data: user });
});
app.get('/api/teams/', async (_request, response) => {
    response.json({ baseUrl: apiBaseUrl, data: await Team_js_1.Team.find().lean() });
});
app.post('/api/teams/', async (request, response) => {
    const team = await Team_js_1.Team.create(request.body ?? {});
    response.status(201).json({ message: 'Team created', data: team });
});
app.get('/api/activities/', async (_request, response) => {
    response.json({ baseUrl: apiBaseUrl, data: await Activity_js_1.Activity.find().lean() });
});
app.post('/api/activities/', async (request, response) => {
    const activity = await Activity_js_1.Activity.create(request.body ?? {});
    response.status(201).json({ message: 'Activity logged', data: activity });
});
app.get('/api/leaderboard/', async (_request, response) => {
    response.json({ baseUrl: apiBaseUrl, data: await Leaderboard_js_1.Leaderboard.find().sort({ rank: 1 }).lean() });
});
app.post('/api/leaderboard/', async (request, response) => {
    const rank = (await Leaderboard_js_1.Leaderboard.countDocuments()) + 1;
    const entry = await Leaderboard_js_1.Leaderboard.create({ ...request.body, rank });
    response.status(201).json({ message: 'Leaderboard updated', data: entry });
});
app.get('/api/workouts/', async (_request, response) => {
    response.json({ baseUrl: apiBaseUrl, data: await Workout_js_1.Workout.find().lean() });
});
app.post('/api/workouts/', async (request, response) => {
    const workout = await Workout_js_1.Workout.create(request.body ?? {});
    response.status(201).json({ message: 'Workout created', data: workout });
});
(0, database_js_1.connectDatabase)()
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
