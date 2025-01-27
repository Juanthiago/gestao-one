import fastify from 'fastify';
import cors from '@fastify/cors';
import authRoutes from '../routes/auth.routes.js'
import productRoutes from '../routes/product.js'
import transactionRoutes from '../routes/transaction.routes.js'

const app = fastify({ logger: true });

await app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

app.get('/', async (request, reply) => {
  return { status: 'ok', message: 'API is running' }
});

app.register(authRoutes, { prefix: '/api/auth'});
app.register(productRoutes, { prefix: '/api/product'});

export default app;