import express from 'express'
import {adminAddProduct, deleteProduct, updateProduct}  from '../controllers/adminProductControllers.js'
import uploadImage from '../middleware/uploadImage.js';
import { Login } from '../controllers/adminAuth.js';

const route=express.Router()
route.post('/Login',Login);
route.post('/products',uploadImage,adminAddProduct);
route.put('/products/:id',uploadImage,updateProduct);
route.delete('/products/:id',deleteProduct);

export default route