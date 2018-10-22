const express = require('express')
const app = express()

app.use((req,res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-HTTP-Method-Override");
  	next();
})

module.exports = app