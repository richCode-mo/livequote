if(process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express')
const path = require('path')
const monk = require('monk')
const bodyPharser = require('body-parser')
const mongodb = require('mongodb')
const app = express()


//Middlewars ========================================
app.use(bodyPharser.json())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))


// Views and Static setup =============================
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/public')))


// DB setup ====================================
const db = monk(process.env.DATABASE_URL)
db.then(() => {
    console.log("Connected")
})
const qoutes = db.get('qoute')




app.get('/', (req, res) => {
    res.render('index')
})





app.get('/qoutes', (req, res, next) => {
    //Get all Qoutes
    console.log(req.method + " " + req.url + " " + req.path)
    qoutes.find()
        .then((data) => {
            res.json(data)
        })


})





app.get('/allQoutes', (req, res) => {
    res.render('posts')
})







function isValidData(qoute) {
    return qoute.name && qoute.name.toString().trim() !== '' &&
        qoute.content && qoute.content.toString().trim() !== '';
}
app.post('/addQoutes', (req, res, next) => {
    //Add new Qoute
    console.log(req.body)
    if (isValidData(req.body)) {
        let date = new Date()
        let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
        console.log(formatted_date)
        console.log()
        const qoute = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: formatted_date
        }
        qoutes.insert(qoute)
            .then(createdMew => {
                res.redirect('/allQoutes')
            })
    } else {
        res.status(422)
        res.json({
            error: "Name and Content Are required !!"
        })
    }
})



app.listen(process.env.PORT || 8080)