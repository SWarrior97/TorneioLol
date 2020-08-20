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
		res.render('regist')
	}catch(err){
		console.log(err)
		res.render('error/500')
	}
})

router.get('/bracket',async (req,res) =>{
	const users = await User.find().lean()
	let matches = [];
	let randomNumber = [];

	let size = users.length;

	

	if(size % 2 != 0){
		//impar
		let randomOut = Math.floor(Math.random() * size/2);
		randomNumber.push(randomOut)

		for(let i=0;i<size/2;i++){
			if(i!= randomOut){
				let random = Math.floor(Math.random() * size);
				let random2 = Math.floor(Math.random() * size);

				while(randomNumber.includes(random)){
					random = Math.floor(Math.random() * size);
				}

				randomNumber.push(random)

				while(randomNumber.includes(random2)){
					random2 = Math.floor(Math.random() * size);
				}
				
				randomNumber.push(random2)

				matches.push({
					player1:users[random].summoner,
					player2:users[random2].summoner,
					winner:''
				})
			}
		}

		matches.push({
			player1:users[randomOut].summoner
		})
	}else{
		//par
		for(let i=0;i<size/2;i++){
			let random = Math.floor(Math.random() * size);
			let random2 = Math.floor(Math.random() * size);

			while(randomNumber.includes(random)){
				random = Math.floor(Math.random() * size);
			}

			randomNumber.push(random)

			while(randomNumber.includes(random2)){
				random2 = Math.floor(Math.random() * size);
			}
			
			randomNumber.push(random2)

			matches.push({
				player1:users[random].summoner,
				player2:users[random2].summoner,
				winner:''
			})
		}
	}

	size = matches.length;

	//console.log(matches)

	res.render('bracket',{
      layout:'bracket.hbs',
      matches
    })
})


router.get('/',(req,res) =>{
	res.render('main',{
      layout:'main.hbs'
    })

})

module.exports = router
