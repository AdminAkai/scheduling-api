
const express = require('express')
const app = express()
const methodOverride = require('method-override')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const { userTrackerRouter } = require('./controllers/userscontroller.js')


app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use(methodOverride('_method'))

app.use(express.static(__dirname+"/public"))

app.set('view engine', 'hbs')

app.use('/', userTrackerRouter)

const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})
