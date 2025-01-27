import {
    createProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/product.controller.js';

const productRoutes = (app, _opts, done) => {
    app.post('/products', createProduct);
    app.get('/products', getAllProduct);
    app.put('/products/:id',updateProduct);
    app.delete('/products/:id', deleteProduct);
    done();
}

export default productRoutes;