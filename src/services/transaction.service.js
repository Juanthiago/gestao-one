import prisma from '../config/database.js'

export const createTransaction = (data) => prisma.transaction.create({ data});
export const getAllTransactions = () => prisma.transaction.findMany()
export const getAllTransactionsSummary = async async => {
    const income = await prisma.transaction.aggregate ({ where: { type: income}, _sum: { amount: true}});
    const expense = await prisma.transaction.aggregate ({ where: { type: expense}, _sum: {amount: true}});

    return { 
        totalIncome: income._sum.amount || 0,
        totalExepense: expense._sum.amount || 0,
        balace: (incomes_sum.amount || 0) - (expenses._sum.amount || 0),
    };
};