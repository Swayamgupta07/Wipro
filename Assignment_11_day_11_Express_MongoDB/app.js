require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/studentDb';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB successfully connected...'))
  .catch(err => {
    console.error('Database connection error:', err.message);
    process.exit(1);
  });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecretstudentmanagementkey',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 } 
}));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/students', studentRoutes);

app.get('/', (req, res) => {
  res.redirect('/students');
});

app.use((req, res) => {
  res.status(404).send('<div style="text-align: center; padding: 100px 20px; font-family: system-ui, -apple-system, sans-serif;"><h2>404: Page Not Found</h2><p style="color: #64748b; margin-bottom: 20px;">The page you are looking for does not exist.</p><a href="/students" style="padding: 12px 24px; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); color: white; text-decoration: none; border-radius: 12px; font-weight: 600; box-shadow: 0 4px 15px rgba(99,102,241,0.3);">Back to Directory</a></div>');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
