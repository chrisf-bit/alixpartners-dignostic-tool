// Mentorships endpoint
app.get('/mentorships/:mentorId', async (req, res) => {
  const { mentorId } = req.params;
  try {
    const result = await pool.query('SELECT mentee_id FROM mentorships WHERE mentor_id = $1', [mentorId]);
    res.json(result.rows.map(r => r.mentee_id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Recommendations endpoint
app.get('/recommendations/:competency', async (req, res) => {
  const { competency } = req.params;
  try {
    const result = await pool.query('SELECT recommendation FROM recommendations WHERE competency = $1', [competency]);
    res.json(result.rows.map(r => r.recommendation));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// L&D dashboard endpoints
app.get('/dashboard/organisation', async (req, res) => {
  try {
    const users = await pool.query('SELECT COUNT(*) FROM users');
    const completed = await pool.query('SELECT COUNT(*) FROM competency_profiles');
    res.json({ totalUsers: parseInt(users.rows[0].count), completed: parseInt(completed.rows[0].count) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/dashboard/competency-distribution', async (req, res) => {
  try {
    const result = await pool.query('SELECT competencies FROM competency_profiles');
    // Aggregate distribution by competency and level
    const distribution = {};
    result.rows.forEach(row => {
      const competencies = row.competencies;
      if (competencies) {
        Object.entries(competencies).forEach(([key, value]) => {
          if (!distribution[key]) distribution[key] = { Strength: 0, Developing: 0, "Focus Area": 0 };
          distribution[key][value.level] = (distribution[key][value.level] || 0) + 1;
        });
      }
    });
    res.json(distribution);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Example: Create user
app.post('/admin/users', async (req, res) => {
  const { email, name, role, manager_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (id, email, name, role, manager_id) VALUES (gen_random_uuid(), $1, $2, $3, $4) RETURNING *',
      [email, name, role, manager_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example: Get all users
app.get('/admin/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Express app entry point
const express = require('express');
const app = express();

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('PostgreSQL connection error:', err));

app.use(express.json());


// Auth endpoints
app.post('/auth/magic-link', (req, res) => {
  // Send login email (magic link)
  res.send('Magic link sent');
});
app.get('/auth/verify', (req, res) => {
  // Verify token
  res.send('Token verified');
});

// Diagnostic endpoints
app.get('/diagnostic/questions', (req, res) => {
  // Sample diagnostic questions
  const questions = [
    {
      id: 'q1',
      section: 'Data Handling',
      type: 'multiple-choice',
      question: 'Which formula calculates the sum of a range?',
      options: ['SUM', 'AVERAGE', 'COUNT', 'IF'],
      answer: 'SUM',
    },
    {
      id: 'q2',
      section: 'Modeling',
      type: 'fill-in-the-blank',
      question: 'What Excel feature allows you to test different scenarios?',
      answer: 'Goal Seek',
    },
    // ...more questions
  ];
  res.json(questions);
});
app.post('/diagnostic/save', async (req, res) => {
  const { userId, progress } = req.body;
  if (!userId || !progress) return res.status(400).json({ error: 'Missing userId or progress' });
  try {
    await pool.query(
      'INSERT INTO diagnostic_sessions (id, user_id, progress) VALUES (gen_random_uuid(), $1, $2) ON CONFLICT (user_id) DO UPDATE SET progress = $2',
      [userId, JSON.stringify(progress)]
    );
    res.send('Progress saved');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// For file upload, would use multer or similar in production
app.post('/diagnostic/upload', (req, res) => {
  // Placeholder: process uploaded Excel file
  // TODO: Implement xlsx parsing and formula inspection
  res.send('Excel processed (placeholder)');
});
app.post('/diagnostic/complete', async (req, res) => {
  const { userId, competencies, strengths, focusAreas } = req.body;
  if (!userId || !competencies || !strengths || !focusAreas) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    await pool.query(
      'INSERT INTO competency_profiles (id, user_id, competencies, strengths, focus_areas) VALUES (gen_random_uuid(), $1, $2, $3, $4) ON CONFLICT (user_id) DO UPDATE SET competencies = $2, strengths = $3, focus_areas = $4',
      [userId, JSON.stringify(competencies), JSON.stringify(strengths), JSON.stringify(focusAreas)]
    );
    res.send('Results calculated and stored');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Profile endpoints
app.get('/profile/me', async (req, res) => {
  // For demo: get userId from query param
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });
  try {
    const result = await pool.query('SELECT * FROM competency_profiles WHERE user_id = $1', [userId]);
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/profile/:userId', (req, res) => {
  // Return user's profile (permissioned)
  res.json({});
});

// Team endpoints
app.get('/team/members', async (req, res) => {
  const { managerId } = req.query;
  if (!managerId) return res.status(400).json({ error: 'Missing managerId' });
  try {
    const result = await pool.query('SELECT * FROM users WHERE manager_id = $1', [managerId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/team/summary', async (req, res) => {
  const { managerId } = req.query;
  if (!managerId) return res.status(400).json({ error: 'Missing managerId' });
  try {
    // Aggregate team stats (e.g., completion, skill gaps)
    const members = await pool.query('SELECT id FROM users WHERE manager_id = $1', [managerId]);
    const memberIds = members.rows.map(m => m.id);
    const profiles = await pool.query('SELECT * FROM competency_profiles WHERE user_id = ANY($1)', [memberIds]);
    // Example summary: count completed, skill gaps
    const completed = profiles.rows.length;
    // ...additional aggregation logic here
    res.json({ completed, total: memberIds.length, profiles: profiles.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin endpoints
app.get('/admin/users', (req, res) => {
  // Return all users
  res.json([]);
});
app.get('/admin/export', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM competency_profiles');
    const rows = result.rows;
    // Convert to CSV
    const header = Object.keys(rows[0] || {}).join(',');
    const csv = [header].concat(rows.map(row => Object.values(row).join(','))).join('\n');
    res.header('Content-Type', 'text/csv');
    res.attachment('competency_profiles.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('AlixPartners Diagnostic Tool API');
});

module.exports = app;
