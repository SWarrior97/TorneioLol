const express = require('express')
const router = express.Router()
var path = require("path");
var cors = require('cors')
const User = require('../models/user')

const app = express()


app.use(cors())


// @desc   
// @route   GET /
router.post('/register',async (req,res) =>{
	 try{
		await User.create(req.body)
		res.send('Register confirm')
	}catch(err){
		console.log(err)
		res.render('error/500')
	}
})


router.get('/',(req,res) =>{
	res.send("hello")
})

module.exports = router
