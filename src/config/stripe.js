import Stripe from 'stripe';
import { config } from 'dotenv';
import fastify from 'fastify';
config();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51QnqbQC2wFqQudCvZJSNzCVO7XJCuUA0JcURJBWoeG5rkAJfK1L3o4XhSgLeO2pTh3GC9Df3H4qZ6ObseeUljocp00eWb1mtm2' ,{
    apiVersion: '2024-06-20', 
});

export const createCheckoutSession = async (userId) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], 
            mode: 'subscription', 
            client_reference_id: userId, 
            success_url: `http://localhost:4000/suceess.html?session_id={CHECKOUT_SESSION_ID}`, 
            cancel_url: 'http://localhost:4000/cancel.html', 
            line_items: [{
                price: 'price_1QnqglC2wFqQudCvjKfdw1pb', 
                quantity: 1,
            }],
        });

        return session;
    } catch (error) {
        console.error('Erro ao criar sessão de checkout:', error);
        throw error;
    }
};

