import { createCheckoutController } from "../controllers/subscription.controller.js";

const checkoutRoutes = (app, opts, done) => {
    app.post('/checkout', createCheckoutController);

    done();

};

export default checkoutRoutes;