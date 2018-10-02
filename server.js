const express = require('express');
const mongoose = require('mongoose');

// Load Routes
const users = require('./routes/api/users');

const app = express();

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

app.get('/', (req, res) => res.send('hello world'));

// Use Routes
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on ${port}`));
