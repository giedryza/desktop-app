const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// Load Routes
const users = require('./routes/api/users');

const app = express();

// Express body-parser Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on ${port}`));
