const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "adeioosi2392n#n1i1n@8n8";
const salt = bcrypt.genSaltSync(10);
const index = require("../app");
const winston = require("winston")
// Define a logger that logs messages to a file.
const logger = winston.createLogger({
	format: winston.format.combine(
	  winston.format.timestamp(),
	  winston.format.json()	
	),
	transports: [
	  new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
	  new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
	  new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }),
	  new winston.transports.File({ filename: 'logs/combined.log' }),
	],
  });

module.exports = {
	login: async(req, res) => {
		console.log("login call")
		const { username, password } = req.body;
		try {
			const UserDoc = await User.findOne({ username });
			const passOk = bcrypt.compareSync(password, UserDoc.password);
			if (passOk) {
			jwt.sign({ username, id: UserDoc._id }, secret, {}, (err, token) => {
				if (err) throw err;
				console.log("save cookie")
				res.cookie("token", token).json({
				id: UserDoc._id,
				username,
				});
			});
			logger.info('Successful Login');
			} else {
				logger.warn('Invalid credentials');
				res.status(401).json({message: "invalid credentials"});
			}
		} catch (e) {
			console.log(e);
			res.status(400).json(e);
			logger.error('Username doesn\'t exist');
		}
	},

	logout: async(req, res) => {
		logger.info('Successful Logout');
		res.cookie("token", "").json("ok");
	},

	register: async (req, res) => {
		const { username, password, name } = req.body;
		const all_usernames = await User.aggregate([
			{
				$match:{
					username: username
				}
			}
		]);
		// console.log(all_usernames);
		if(all_usernames.length == 0){
			try {
				const userDoc = await User.create({
				username,
				password: bcrypt.hashSync(password, salt),
				name,
				incomeTransactions: [],
				expenseTransactions: [],
				});
				logger.info('User created successfully');
				res.json({ requestData: { username, password } });
			} catch (e) {
				console.log(e);
				logger.error('Unkown Error');
				res.status(409).json(e);
			}
		}
		else{
			logger.warn('Create user aborted: Username already in use');
			res.status(409).json({message: "username in use"});
		}
	}
}