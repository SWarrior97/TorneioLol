const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const path = require('path');
var cors = require('cors')
var ip = require("ip");

//load config
dotenv.config({path:'./config/config.env'})

//connect to db
connectDB();

const app = express()


app.use(cors())

//body parser
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

// Method override
app.use(
	methodOverride(function (req, res) {
	  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		// look in urlencoded POST bodies and delete it
		let method = req.body._method
		delete req.body._method
		return method
	  }
	})
  )

//logging
if(process.env.NODE_ENV === 'development'){
	app.use(morgan('dev'));
}

//Handlebars
app.engine('.hbs',exphbs({defaultLayout:'main',extname:'.hbs'}));
app.set('view engine','.hbs')

//Routes
app.use('/',require('./routes/index'))

//Static folder
app.use(express.static(path.join(__dirname,'public')))

const PORT = process.env.PORT || 3000

const HOSTNAME = ip.address();

app.listen(PORT,HOSTNAME,console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))