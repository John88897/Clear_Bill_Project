import { staff } from '../models/data.js'
import { pool } from '../dbConnection.js'
import fs from 'fs';

export const getAllStaffs = async (req, res) => {
    try {
        const [rows] = await pool.query("select * from staffs");
    } catch (err) {
        console.log(`There is an error in the StaffController` + err.message);
        return res.status(404).json({ error: err.message })
    }
}
export const getStaffById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json("Id must be provided!");
        }
        const [rows] = await pool.query("select * from staffs where staffID = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: `cannot find staff with this id: ${id}` })
        }
        return res.status(200).json(rows[0]);
    } catch (error) {
        console.log("There is an erorr in getStaffById: " , error.messgage)
        return res.status(404).json({error: error.message})
    }

}
export const createStaff = (req, res) => {
    const { name, role, departmentId, hourlyRate, shift } = req.body;
    if (!name || !role || !departmentId || !hourlyRate || !shift) {
        return res.stats(404).json({ error: `each field cannot be empty!` })
    }
    const newStaff = {
        id: (staff.length) + 1,
        name: name,
        role: role,
        departmentId: departmentId,
        hourlyRate: hourlyRate,
        shift: shift
    }
    staff.push(newStaff);
    res.status(201).json(`successfully added new staff!`)
}
export const updateStaff = (req, res) => {
    const id = Number(req.params.id);
    const { name, role, departmentId, hourlyRate, shift } = req.body;
    if (!id) {
        return res.status({ error: `id must be provided!` })
    }
    const updated = staff.find((s) => id === s.id);
    if (!updated) {
        return res.status(404).json({ error: `cannot find the matching id!` })
    }
    if (Object.keys(req.body).length === 0) {
        return res.status(404).json({ error: `atleast one field must be provided!` })
    }
    Object.assign(updated, req.body);
    res.status(200).json(`successfully updated!`)
}
export const delStaffById = (req, res) => {
    const id = Number(req.params.id);
    if (!id) {
        return res.status(404).json({ error: `id must be provided!` })
    }
    const delStaff = staff.findIndex((s) => s.id === id);
    if (delStaff === -1) {
        return res.status(404).json({ erorr: `cannot find the staff with this id!` })
    }
    res.status(200).json(`successfully remove staff!`)
    staff.splice(delStaff, 1);
}
