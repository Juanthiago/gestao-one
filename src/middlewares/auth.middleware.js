import { verifyToken } from "../config/jwt.js";

export const authenticate = async (req, reply) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return reply.status(401).send({ error: 'Token não fornecido.' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);
        req.user = decoded;

    } catch (error) {
        reply.status(401).send({ error: 'Token inválido.' });
    }
};
