const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const function_controller = require('./functions.js');

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.urlencoded({ extended: true })) //support url encoded bodies
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .post('/results', function_controller.math)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))