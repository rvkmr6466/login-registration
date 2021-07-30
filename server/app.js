const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/user');

//Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log("MongoDB is connected!")
    })
    .catch(err => {
        console.log("Error:", err)
    });

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.use('/api/user', userRoutes);

module.exports = app;