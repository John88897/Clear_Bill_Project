import { departments } from "../models/data.js";
import { pool } from "../config/dbConnection.js";
import fs from 'fs'

export const getAllDepartments = (req, res) =>{
    res.status(200).json(departments);
}
export const getDepartmentById = (req, res) => {
    const id = Number(req.params.id);
    if(!id){
        return res.status(404).json({error: `id cannot be empty!`})
    }
    const getId = departments.find((d) => id === d.id);
    res.status(200).json(getId);
}
export const createDepartment = (req, res) => {
    const {name, head,floor, totalStaff} = req.body;
    if(!name || !head || !floor || !totalStaff){
        return res.status(404).json({error: `all field must be provided!`})
    }
    const newDepartment = {
        'id' : (departments.length) + 1,
        name: name,
        head: head,
        floor: floor,
        totalStaff: totalStaff
    }
    departments.push(newDepartment);
    res.status(201).json(`succesfully added to department!`)
}
export const updateDepartmentById = (req, res) => {
    const id = Number(req.params.id);
    if(!id){
        return res.status(404).json({error: `id is not provided!`})
    }
    if(Object.keys(req.body).length === 0){
        return res.status(404).json({error: `atleast one field must be provided!`})
    }
    const updateDepartment = departments.find((c) => id === c.id);
    Object.assign(updateDepartment, req.body);
    res.status(200).json(`successfully updated Department!`)
}
export const delDepartmentById = (req, res) => {
    const id = Number(req.params.id);
    if(!id){
        return res.status(404).json({error: `id must be provided!`})
    }
    const delDepartment = departments.findIndex((d) => id === d.id);
    if(delDepartment === -1){
        return res.stat(404).json({error: `cannot find department with this id!`})
    }
    departments.splice(delDepartment, 1);
    res.status(200).json(`succesfully deleted department`);
} 