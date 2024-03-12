const express = require('express')

const userRoute = require('./userRoutes.js')

module.exports = app => {
	app.use(
		express.json(),
		userRoute
	)
}