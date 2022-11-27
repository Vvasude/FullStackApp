require('dotenv').config() //Env Variables

const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Open Server Connection on Port 3000
const cors = require('cors')
app.use(cors())
mongoose.connect('mongodb+srv://thibe:1234@cluster0.ggdklsg.mongodb.net/music', {useNewUrlParser: true}) 
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.listen(3000, () => console.log('Server Started on 3000'))

app.use(express.json()) //JSON data for backend

app.get("/", (req, res) => {
    return res.json('Hello World')
})