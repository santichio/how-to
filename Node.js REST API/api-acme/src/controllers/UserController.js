const Controller = require('./Controller')
const UserServices = require('../services/UserServices.js')

const userServices = new UserServices()

class UserController extends Controller{
	constructor() {
		super(userServices)
	}
}

module.exports = UserController