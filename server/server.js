const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const path = require('path');
var cors = require('cors')

//load config
dotenv.config({path:'./config/config.env'})

//connect to db
connectDB();

const app = express()


app.use(cors())

//body parser
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

//logging
if(process.env.NODE_ENV === 'development'){
	app.use(morgan('dev'));
}

//Routes
app.use('/',require('./routes/index'))

//Static folder
app.use(express.static(path.join(__dirname,'public')))

const PORT = process.env.PORT || 3000

const HOSTNAME = process.env.HOSTNAME

app.listen(PORT,HOSTNAME,console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))