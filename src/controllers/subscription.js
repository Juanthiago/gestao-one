import { createCheckoutSession, stripe } from '../config/stripe.js'
import fastify from 'fastify';
import prisma from '../config/database.js';

export const createCheckoutController = async (req, reply) => {
    const userId = req.headers['x-user-id'];
    
     const checkout = await createCheckoutSession(userId);
        return reply.send(checkout);
};

export const handleWebhook = async (req, reply) => {
    const event = req.body;

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log(`Checkout session completed ${session.id}`);
            break;

        default:
            console.log(`unhandled event type ${event.type}`);
            
    }

    reply.send({ received: true});
}