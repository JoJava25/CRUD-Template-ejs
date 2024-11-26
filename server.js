require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()

const port = process.env.PORT || 4000

//Connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.eivrakx.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

//Middleware

//Enable CORS
app.use(cors())

//Serve static files
app.use(express.static('public'))

//Parse requests
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Set EJS as a templating engine
app.set('view engine', 'ejs')

//Routes
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/item', async (req, res) => {
    const items = await Item.find({})
    res.render('item', {items})
})

//Listen for port
app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`)
})