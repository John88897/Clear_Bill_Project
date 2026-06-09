import { Router } from "express";
import { getAllMachines, getMachineById,createMachine, updateMachineById, delMachineById } from "../controller/machineController.js";
const machineRoutes = Router();

machineRoutes.get('/', getAllMachines);
machineRoutes.get('/:id', getMachineById);
machineRoutes.post('/', createMachine);
machineRoutes.put('/:id', updateMachineById);
machineRoutes.delete('/:id', delMachineById);

export default machineRoutes;