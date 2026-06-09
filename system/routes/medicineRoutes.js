import { Router } from "express";
import { getAllMedicines, getMedicineById, createMedicine, updateMedicine, delMedicine } from "../controller/medicineController.js";
const medicineRoutes = Router();

medicineRoutes.get('/', getAllMedicines);
medicineRoutes.get('/:id', getMedicineById);
medicineRoutes.post('/', createMedicine);
medicineRoutes.put('/:id', updateMedicine);
medicineRoutes.delete('/:id', delMedicine);

export default medicineRoutes;