const ExpenseSchema = require("../models/ExpenseModel")
const UserModel = require("../models/User")
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
let user1

exports.addExpense = async (req, res) => {
    const { username, title, amount, category, description, date}  = req.body
    console.log("Expense: ", username)
    const income = ExpenseSchema({
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
        user.expenseTransactions.push(income);
        await user.save()
        logger.info("Expense Successfully added")
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        logger.error("Server Error, Cannot Add Expense")
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getExpense = async (req, res) =>{
    try {
        console.log("USER1: ", user1)
        const incomes = user1.expenseTransactions
        const income_trans = await ExpenseSchema.find({
            _id: {$in: incomes}
        }).sort({createdAt: -1})
        logger.info(`Successfully retrieved list of Expenses`)
        res.status(200).json(income_trans)
    } catch (error) {
        logger.error('Server Error, Cannot retrieve list of Expense')
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            logger.info('Expense Deleted Successfully')
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            index.error.info('Server Error, Cannot Delete Expense')
            res.status(500).json({message: 'Server Error'})
        })
}