import prisma from '../config/database.js'

export const getDashboard = async (req, reply) => {
    
    const income = await prisma.transaction.aggregate({
        where: { type: 'income'},
        _sum: { amount: true}
    })

    const expense = await prisma.transaction.aggregate({
        where: { type: 'expense'},
        _sum: {amount: true},
    })

    const summary = {
        totalIncome: income._sum.amount || 0,
        totalExpense: expense._sum.amount || 0,
        balance: (income._sum.amount || 0 ) - (expense._sum.amount || 0),
    }

    const { userId, accountType } = req.user

    let user = null
    if (accountType === 'BUSINESS') {
        user = await prisma.businessAccount.findUnique({
            where: { id: userId },
            include: {
                product: true,
                stockMovement: true
            }
        })
        summary.user = user
    }

    reply.send(summary)
}