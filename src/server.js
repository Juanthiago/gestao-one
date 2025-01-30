import 'dotenv/config';
import app from './config/app.js';
import registerRoutes from './routes/auth.routes.js';
import checkoutRoutes from './routes/stripe.routes.js';

const startServer = async () => {
    try {
        const PORT = process.env.PORT || 4000;
        await app.listen({ port: PORT, host: '0.0.0.0' });
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

app.register(registerRoutes);
app.register(checkoutRoutes);

startServer();