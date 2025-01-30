import { signToken } from '../config/jwt.js';
import prisma from '../config/database.js'
import bcrypt from 'bcrypt';

const isValidEmail = (email) => {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return emailRegex.test(email);
};

export const signup = async (req, reply) => {
    const { name, email, password, cpfCnpj, accountType } = req.body;

    try {
        if (!name ||!email || !password || !cpfCnpj || !accountType) {
            return reply.status(400).send({
                error: 'Todos os campos são obrigatórios.'
            });
        }; 
        
        if (!isValidEmail(email)) {
            return reply.status(400).send({
                error: 'Formato de email inválido. ',
            });
        };

        const existingUserEmail = await prisma.user.findUnique({ 
            where: { email },
        });

        if (existingUserEmail) {
            return reply.status(400).send({
                error: 'Este email já está em uso.',
            })
        }
        const existingUserDoc = await prisma.user.findUnique({
            where: { cpfCnpj }
        });

        if (existingUserDoc) {
            return reply.status(400).send({ 
                error: 'Este CPF/CNPJ já está cadastrado',
            });
        };

        if (password.length < 8) {
            return reply.status(400).send({
                error: 'A Senha deve ter no minimo 8 caracteres',
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);
       let user;
        try {
         user = await prisma.user.create({
            data: { 
                name,
                email, 
                password: hashedPassword, 
                cpfCnpj,
                accountType   
            },
        
        });
    } catch (dbError) {
        console.error('Erro ao criar usuário no banco de dados:', dbError);
        reply.status(500).send({
            error: 'Erro ao criar usuário no banco de dados por favor, tente novamente',
            message: dbError.message
        });
    }
        let token;
        try {
            token = signToken({ 
                id: user.id, 
                name: user.name,
                accountType: user.accountType 
            });
        } catch (tokenError) {
            return reply.status(204) ({
                success: true,
                message: 'Usuário criado com sucesso',
                warning: 'Não foi possivel gerar o token',
                user: {
                    id: user.id,
                    name: user.name,
                    accountType: user.accountType
                }
            });
        }

        return reply.status(201).send({
            success: true,
            message: 'Usuário criado com sucesso',
            user: {
                id: user.id,
                name: user.name,
                accountType: user.accountType
            },
            token
        })

    
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        
        if (error.code === 'P2002') {
            return reply.status(400).send({
                success: false,
                message: 'Usuário já existe com essas informações',
            });
        }

        return reply.status(500).send({ 
            success: false,
            error: 'Erro ao criar usuário. Por Favor, tente novamente.',
            details: process.env.NODE_ENV === 'development' ?  error.message : undefined
        });
    }
};


export const login = async (req,reply) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return reply.status(400).send({
                success: false,
                error: 'Email ou senha não informados',
            })
        }

        if (!invalidPasswordEmail(email, password)) {
            return reply.status(400).send({
                success: false,
                error: 'Email ou senha inválidos',
            })
        }

    } catch (error) {
        console.error('Erro ao fazer login: ', error);
        return reply.status(500).send({
            success: false,
            error: 'Erro ao fazer login. Por Favor, tente novamente.',
            details: process.env.NODE_ENV === 'development' ?  error.message : undefined
        });
    }
};
