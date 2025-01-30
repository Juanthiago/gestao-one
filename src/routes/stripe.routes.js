import { createCheckoutController } from "../controllers/subscription.js";

const checkoutRoutes = (app, opts, done) => {
    app.post('/checkout', createCheckoutController);
    done();
};

export default checkoutRoutes;