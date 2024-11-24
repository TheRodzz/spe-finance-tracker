const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = "adeioosi2392n#n1i1n@8n8";
const salt = bcrypt.genSaltSync(10);
const index = require("../app")
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

exports.profile =  async (req, res) => {
		const { token } = req.cookies;
		jwt.verify(token, secret, {}, (err, info) => {
			if (err){
				logger.error('Unable to fetch profile', err);
				throw err;
			}
			logger.info("Profile fetched successfully");
			res.json(info);
		});
}

exports.getUserInfo = async(req, res)=>{
	// const { token } = req.cookies;
	const {username} = req.params;
	console.log(username)
	const userDoc = await User.findOne({username}, "username name income expense");
	res.json(userDoc);
	logger.info("User info fetched successfully");
}

exports.updateInfo = async(req, res)=>{
	const {username, username1, name, password} = req.body;
	const updte = await User.findOneAndUpdate({username: username}, {
		username: username1,
		name: name,
		password: bcrypt.hashSync(password, salt)
	})
	res.json(updte);
	logger.info("User Information Updated")
}