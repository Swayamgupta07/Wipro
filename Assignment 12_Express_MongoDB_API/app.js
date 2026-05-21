require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/studentApiDB';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB successfully connected...'))
  .catch(err => {
    console.error('Database connection error:', err.message);
    process.exit(1);
  });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  res.status(404).send('<h2>404 - Page Not Found</h2><a href="/students">Return to Home</a>');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
