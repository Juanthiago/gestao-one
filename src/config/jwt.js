import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'xFvPDDkFYj1pDreWBz2Nj5JiTky8h5uzA0XiCF8ygmrvJyQf9kY9XenSc7pD2qxYSNzMg4CMJu3CmVCnjHWUjA==';

if (!secret) {
    throw new Error('JWT_SECRET is not defined');
}

export const signToken = (payload) => {
    try { 
       return jwt.sign(payload, secret, { 
        expiresIn: '1d',
        algorithm: 'HS256'
    });
    } catch (error) {
        console.error('Erro ao gerar token', error);
        throw new Error('Falha ao gerar token de autenticação');
    };
};
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token expirado');

        }
        throw new Error('Token inválido');
    }
};
