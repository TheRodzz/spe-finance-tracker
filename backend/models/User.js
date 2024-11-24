const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    username: {type: String, required:true, min : 4, unique:true},
    password: {type: String, required:true},
    name: {type: String, required:true},
    expenseTransactions : [{type: Schema.Types.ObjectId, ref: "ExpenseModel"}],
    incomeTransactions : [{type: Schema.Types.ObjectId, ref: "IncomeModel"}]
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;