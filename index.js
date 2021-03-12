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


// (require("http").createServer(function(req, res) {
//     var md5 = require("blueimp-md5"),
//         url = require("url"),
//         query = url.parse(req.url).query;
//     res.writeHead(200, { " Content - Type": "text / plain" })

//     // compute and print the MD5 hash of the url query
//     res.end(md5(query))
// }).listen(8080, "localhost"))