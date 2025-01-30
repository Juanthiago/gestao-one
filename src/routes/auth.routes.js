import { signup, login } from '../controllers/auth.controller.js';

const authRoutes = (app,opts, done) => {
    app.post('/signup', signup);
    app.post('/login', login);
    done();
};

export default authRoutes;
