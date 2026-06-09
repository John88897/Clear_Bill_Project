import { Router } from "express";
import { getAllStaffs, getStaffById, createStaff, updateStaff, delStaffById } from "../controller/staffController.js";
const staffRoutes = Router();

staffRoutes.get('/', getAllStaffs);
staffRoutes.get('/:id', getStaffById);
staffRoutes.post('/', createStaff);
staffRoutes.put('/:id', updateStaff);
staffRoutes.delete('/:id', delStaffById);

export default staffRoutes;