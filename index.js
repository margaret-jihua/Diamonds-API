const express = require('express')
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/diamonds', require('./controllers/diamonds'))
app.use('/owners', require ('./controllers/owners'))

app.get('/', (req, res) => {
    res.send('Home of Mongo Diamond Server!')
})

app.listen(8000, () => {
    console.log('You are listening to localhost 8000');
})