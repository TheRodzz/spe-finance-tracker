const IncomeSchema= require("../models/IncomeModel")
const UserModel = require("../models/User")
const index = require('../app')
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
let user1

exports.addIncome = async (req, res) => {
    const {username, title, amount, category, description, date}  = req.body
    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            logger.warn("All fields are required")
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            logger.warn("Amount must be a positive number")
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }

        await income.save()
        const user = await UserModel.findOne({ username });
        user1 = user
        user.incomeTransactions.push(income);
        await user.save();
        console.log(user.incomeTransactions)
        logger.info("Income Successfully Added")
        res.status(200).json({message: 'Income Added'})

    } catch (error) {
        logger.error("Server Error, Cannot Add Income")
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getIncomes = async (req, res) =>{
    try {
        console.log("USER1: ", user1)
        const incomes = user1.incomeTransactions
        const income_trans = await IncomeSchema.find({
            _id: {$in: incomes}
        }).sort({createdAt: -1})
        logger.info("Successfully retrieved list of Incomes")
        res.status(200).json(income_trans)
    } catch (error) {
        logger.error("Server error, Cannot Retreive list of Incomes")
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            logger.info("Income Deleted Successfully")
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            logger.error("Server Error, Cannnot Delete Income")
            res.status(500).json({message: 'Server Error'})
        })
}