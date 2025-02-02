import { createCheckoutSession } from '../config/stripe.js';

export const createCheckoutController = async (req, reply) => {
    const userId = req.headers['x-user-id'];
    
    if (!userId) {
        return reply.status(500).send({
            error: 'ID do usuário não fornecido'
        });
    }
    try {
        const checkout = await createCheckoutSession(userId);
        return reply.status(200).send({ checkout });
    } catch (error) {
        console.error('Erro ao criar sessão de checkout:', error);
        return reply.status(500).send({ error: 'Erro ao efetuar pagamento', details: error.message});
    }
};

