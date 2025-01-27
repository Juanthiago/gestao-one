import { signup } from '../controllers/auth.controller.js';

const authRoutes = (app, opts, done) => {
    app.post('/signup', signup);
    done();
};

export default authRoutes;
