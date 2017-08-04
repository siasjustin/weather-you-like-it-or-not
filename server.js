const express 		= require('express');
const app 			  = express();
const router 		  = express.Router();
const mongoose 		= require('mongoose');
const bodyParser 	= require('body-parser');

const routes = require('./routes'), { faqs, login, zips, mailer } = routes;
const dbUrl = "mongo db url goes here";
app.use(express.static('public'))

   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: true }))

 //  .use('/api', faqs)


   .get('/*', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
    // return res.sendFile(resolve(__dirname, 'public', 'index.html'))
});

const server = app.listen(8083, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

//db config
// mongoose.connect('[conect url here]', (err) => { if (err) { throw err; } });
// var db = mongoose.connection;
// db.on('error', console.log.bind(console, 'connection error:'));
// db.once('open', function() {
// 	console.log('DB is now connected! Test deploy from 2nd user');
// })




