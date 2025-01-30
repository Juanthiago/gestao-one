import Stripe from 'stripe';
import { config } from 'dotenv';
config();

console.log('Stripe Secret Key', process.env.STRIPE_SECRET_KEY);

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '11.0.0', 
});

export const createCheckoutSession = async (userId) => {
    try {
       const sessions =  stripe.checkout.sessions.create({
            payment_method_types: ['card', 'pix'],
            mode: 'subscription',
            client_reference_id: userId,
            success_url: 'http://localhost:4000/sucess.html',
            cancel_url: 'http://localhost:4000/cancel.html',
            line_items: [{
                price: process.env.NEX_PRO_PRICE_ID,
                quantity: 1
            }]
            
        }) 
        return {
            url: sessions.url
        }  
    } catch (error) {
        return reply.status(400).send({
            error: 'Erro ao efutar pagamento'
        })

    }
}    
export const handleProcessWebhookCheckout = () => {}
export const handleProcessWebhookUpadateSubscription = () => {}