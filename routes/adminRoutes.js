import express from 'express'
import {adminAddProduct}  from '../controllers/adminProductControllers.js'

const route=express.Router()
route.post('products',adminAddProduct);

export default route