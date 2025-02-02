import {
    createTransaction,
    getAllTransaction,
    getAllTransactionSummary,
} from '../controllers/transaction.controller.js';

const transactionRoutes = (app, opts, done) => {
    app.post('/transactions', createTransaction);
    app.get('/transactions', getAllTransaction);
    app.get('/transactions/summary', getAllTransactionSummary);
    
    done()
};

export default transactionRoutes;