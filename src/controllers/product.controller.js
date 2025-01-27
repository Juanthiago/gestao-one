import prisma from '../config/database.js';

export const createProduct = async (req, reply) => {
    const { name, quantity, unitPrice, businessId } = req.body;

    try {
        const product = await prisma.product.create({ 
        data: { 
            name, 
            quantity, 
            unitPrice, 
            BusinessAccount: {
                connect: {
                    id: businessId
                }
            }
         },
         include: {
            BusinessAccount: true
         }
        });
        reply.status(201).send({
            success: true,
            message: 'Produto criado com sucesso',
            product
       });


    } catch (errProduct) {
        console.error('Erro ao criar o produto', errProduct);

        reply.status(500).send({ 
            error: 'Erro ao criar o produto',
            message: errProduct.message 
        }); 
    }
};

export const getAllProduct = async (req, reply) => {
    try {
        const products = await prisma.product.findMany();
        reply.send(products);
    } catch (err) {
        reply.status(500).send({ error: 'Erro ao buscar os produtos' });
    }
};

export const updateProduct = async (req, reply) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        const product = await prisma.product.update({
            where: { id: parseInt(id) }, 
            data: { quantity },
        });
        reply.send(product);
    } catch (err) {
        reply.status(404).send({ error: 'Produto não encontrado' });
    }
};

export const deleteProduct = async (req, reply) => {
    const { id } = req.params;

    try {
        await prisma.product.delete({
            where: { id: parseInt(id) },
        });
        reply.send({ message: 'Produto deletado com sucesso' });
    } catch (err) {
        reply.status(404).send({ error: 'Produto não encontrado' });
    }
};
