import prisma from "../config/database.js";

export const createTransaction = async (req, reply) => {
    const { type, amount, category, description} = req.body;

    try {
        const transaction = await prisma.$transaction.create({
            data: {type, amount, category, description},
        });
        reply.status(201).send(transaction);
    } catch (err) {
        reply.status(500).send({ error: 'Erro ao criar transação'});
    }
};

export const createTypeAccount = async (req, reply) => {
    const {type, amount, category, description} = req.body;

    if (!accountType) {
        return reply.status(400).send({
            error: 'Tipo de conta não informado'
        });
    };

    const user = await prisma.user.findUnique({
        where: { id: userId},
        iclude: {
            personalFinance: true,
            businessAccount: true
        }
    });

    if (!accountType === 'PERSONAL') {
        if (!user.personalFinance) {
            return reply.status(404).send({
                error: 'Conta pessoal não encontrada'
            });
        }
        transaction = await prisma.personalFinance.create({
            data: {
                type,
                amount,
                category,
                description,
                personalFinance: {
                    connect: { id: user.personalFinance.id }
                } 
            }
        });

        await prisma.personalFinance.update({
            where: { id: user.personalFinance.id},
            data: {
                balance: {
                    increment: type === 'INCOME' ? amount : -amount
                }
            }
        });
    } else if (accountType === 'BUSINESS') {
        
    }
};

export const getAllTransaction = async (req, reply) => {
    try {
        const transactions = await prisma.transaction.findMany();
        reply.send(transactions);
    } catch (err) {
        reply.status(500).send({ error: 'Erro ao buscar a transação'})
    }
};

export const getAllTransactionSummary = async (req, reply) => {
    try {
        const income = await prisma.income.aggregate({
            where: { type: 'income'},
            _sum: { amount: true}
        });
        const expense = await prisma.expense.aggregate({
            where: { type: 'expense'},
            _sum: {amount: true},
        });
        const summary = {
            totalIncome: incomes._sum.amount || 0,
            totalExpense: expenses._sum.amount || 0,
            balace: (incomes._sum.amount || 0 ) - (expenses._sum.amount || 0),
        };

        reply.send(summary)
    } catch (err) {
        reply.status(500).send({ error: 'Erro ao calcular resumo finaceiro'})
    }
};