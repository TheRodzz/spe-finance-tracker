import {dashboard, expenses, transactions, trend, upd, upd1} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/history",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/income",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/expenses",
    },
    {
        id: 5,
        title: "Update Information",
        icon: upd1,
        link: "/updateInfo",
    },
]