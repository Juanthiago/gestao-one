import prisma from '../config/database.js'

export const createProduct = (data) => prisma.product.create({ data });
export const getAllProduct = () => prisma.product.findMany();
export const updateProduct = (id, data) => prisma.product.update({ where: {id}, data});
export const deleteProduct = (id) => prisma.product.delete({ where: {id} });