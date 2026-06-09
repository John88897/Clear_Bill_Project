import { machines } from "../models/data.js";
export const getAllMachines = (req, res) => {
    res.json(machines);
}
export const getMachineById = (req, res) =>{
    const id = Number(req.params.id);
    if(!id){
        return req.status(404).json({error: `Id must be provided!`})
    }
    const machineId = machines.find((m) => id === m.id)
    if(!machineId){
        return res.status(404).json({error: `cannot find the matching Id!`})
    }
    res.status(200).json(machineId);
}
export const createMachine = (req, res) => {
    const {name, category, ratePerHour, status} = req.body;
    if(!name || !category || !ratePerHour || !status){
        return res.status(404).json({error: `each field cannot be empty!`})
    }
    const newMechine = {
        id: (machines.length) + 1,
        name: name,
        category: category,
        ratePerHour:  ratePerHour,
        status: status
    }
    machines.push(newMechine);
    res.status(201).json(`succesfully added ${newMechine}`);
}
export const updateMachineById = (req,res) => {
    const id = Number(req.params.id);
    if(!id){
        return res.status(404).json({error: `id must be provided!`});
    }
    const {name, category, ratePerHour, status} = req.body;
    if(Object.keys(req.body).length === 0){
        return res.status(404).json({erorr: `atleast one field must be provided!`})
    }
    const update = machines.find((m) => id === m.id);
    if(!update){
        return res.status(404).json({eror: `machine with this id is not found!`})
    }
    Object.assign(update, req.body);
    res.status(200).json(`successfully updated!`);
}
export const delMachineById = (req, res)=>{
    const id = Number(req.params.id);
    if(!id){
        return res.status(404).json({error: `id must be provided!`})
    }
    const delMachine = machines.findIndex((m) => id === m.id);
    if(delMachine === -1){
        return res.status(404).json({error: `cannot find the matching id!`})
    }
    machines.splice(delMachine, 1);
    res.status(200).json(`succesfully deleted!`)
}
