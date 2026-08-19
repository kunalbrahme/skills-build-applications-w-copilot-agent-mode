"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_js_1 = require("../config/database.js");
const Activity_js_1 = require("../models/Activity.js");
const Leaderboard_js_1 = require("../models/Leaderboard.js");
const Team_js_1 = require("../models/Team.js");
const User_js_1 = require("../models/User.js");
const Workout_js_1 = require("../models/Workout.js");
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await (0, database_js_1.connectDatabase)();
        await Promise.all([
            Activity_js_1.Activity.deleteMany({}),
            Leaderboard_js_1.Leaderboard.deleteMany({}),
            Team_js_1.Team.deleteMany({}),
            User_js_1.User.deleteMany({}),
            Workout_js_1.Workout.deleteMany({}),
        ]);
        const users = await User_js_1.User.create([
            { name: 'Ava Thompson', email: 'ava@example.com', team: 'Trailblazers' },
            { name: 'Marcus Lee', email: 'marcus@example.com', team: 'Velocity' },
            { name: 'Priya Shah', email: 'Trailblazers', team: 'Trailblazers' },
        ]);
        await Team_js_1.Team.create([
            { name: 'Trailblazers', captain: 'Ava Thompson', points: 1850 },
            { name: 'Velocity', captain: 'Marcus Lee', points: 1620 },
        ]);
        await Activity_js_1.Activity.create([
            { userId: users[0]._id, type: 'Running', minutes: 42, date: new Date('2026-08-01') },
            { userId: users[1]._id, type: 'Strength', minutes: 35, date: new Date('2026-08-02') },
            { userId: users[2]._id, type: 'Cycling', minutes: 55, date: new Date('2026-08-03') },
        ]);
        await Leaderboard_js_1.Leaderboard.create([
            { rank: 1, name: 'Trailblazers', points: 1850 },
            { rank: 2, name: 'Velocity', points: 1620 },
        ]);
        await Workout_js_1.Workout.create([
            { title: 'Sprint Intervals', difficulty: 'Intermediate', duration: 25 },
            { title: 'Core Circuit', difficulty: 'Beginner', duration: 20 },
            { title: 'Power Endurance', difficulty: 'Advanced', duration: 40 },
        ]);
        console.log('Database seeding complete');
        await (0, database_js_1.disconnectDatabase)();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        await mongoose_1.default.disconnect();
        process.exit(1);
    }
}
seedDatabase();
