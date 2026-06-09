import express from 'express';
import { Router } from 'express';
import { getAllcategory, getCategoryById, createCategory, updateCategoryById, delById } from '../controller/categoryController.js';
const categoryRoutes = express.Router();
categoryRoutes.get('/', getAllcategory);
categoryRoutes.get('/:id', getCategoryById);
categoryRoutes.post('/', createCategory);
categoryRoutes.put('/:id', updateCategoryById);
categoryRoutes.delete('/:id', delById);

export default categoryRoutes;