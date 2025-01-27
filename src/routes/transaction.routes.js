import {
    createTransaction,
    getAllTransaction,
    getAllTransactionSummary,
} from '../controllers/transaction.controller.js';

const transactionRoutes = (app, _opts, done) => {
    app.post('/transactions', createTransaction);
    app.get('/transactions', getAllTransaction);
    app.get('/transactions', getAllTransactionSummary);
    done()
};

export default transactionRoutes;