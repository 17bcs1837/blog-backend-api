const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const formidable = require('formidable');
require('dotenv').config();


// Express App
const app = express();

//Middlewares
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(cookieParser());

//Database Connection
mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log("Connected to Database"))
.catch(err => {
    console.log("DB Connection Error: ", err.message);
})

//Routes
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// Error Controller
const { unauthorizedError } = require('./controllers/auth');

app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use(unauthorizedError);

app.listen(5000);