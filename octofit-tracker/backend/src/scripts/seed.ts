import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Ava Thompson', email: 'ava@example.com', team: 'Trailblazers' },
      { name: 'Marcus Lee', email: 'marcus@example.com', team: 'Velocity' },
      { name: 'Priya Shah', email: 'Trailblazers', team: 'Trailblazers' },
    ]);
    await Team.create([
      { name: 'Trailblazers', captain: 'Ava Thompson', points: 1850 },
      { name: 'Velocity', captain: 'Marcus Lee', points: 1620 },
    ]);
    await Activity.create([
      { userId: users[0]._id, type: 'Running', minutes: 42, date: new Date('2026-08-01') },
      { userId: users[1]._id, type: 'Strength', minutes: 35, date: new Date('2026-08-02') },
      { userId: users[2]._id, type: 'Cycling', minutes: 55, date: new Date('2026-08-03') },
    ]);
    await Leaderboard.create([
      { rank: 1, name: 'Trailblazers', points: 1850 },
      { rank: 2, name: 'Velocity', points: 1620 },
    ]);
    await Workout.create([
      { title: 'Sprint Intervals', difficulty: 'Intermediate', duration: 25 },
      { title: 'Core Circuit', difficulty: 'Beginner', duration: 20 },
      { title: 'Power Endurance', difficulty: 'Advanced', duration: 40 },
    ]);

    console.log('Database seeding complete');
    await disconnectDatabase();
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedDatabase();
