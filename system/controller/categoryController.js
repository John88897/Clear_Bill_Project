import { categories } from "../models/data.js"
import { pool } from "../config/dbConnection.js";
import fs from 'fs'

export const getAllcategory = (req, res) => {
res.status(200).json(categories);
}
export const getCategoryById = (req, res) => {
    const id = Number(req.params.id);
    const category =  categories.find((category) => category.id === id);
    if(!id){
        return res.status(404).json({error: `id cannot be empty!`})
    }
    res.status(200).json(category);
}
export const createCategory = (req, res) => {
    const {name, description, baseCost} = req.body;
    if(!name || !description || !baseCost){
        return res.status(404).json({error: `must enter all the fields!`})
    }
    const newCategory = {
        id : (categories.length+1) + 1,
        name: name,
        description: description,
        baseCost: baseCost
    }
    categories.push(newCategory);
    res.status(200).json(`successfully add new category!`);

}
export const updateCategoryById = (req, res) => {
    const searchId = Number(req.params.id);
    const {name, description, baseCose} = req.body
    if(!searchId){
        return res.status(404).json({error: `id must be provided!`})
    }
    if(Object.keys(req.body).length === 0){
        return res.status(404).json({error: `atleast one field must be provided!0`})
    }
    const updateCategory = categories.find((category) => searchId == category.id);
    if(!updateCategory){
        return res.status(404).json({error: `cannot find category with this id!!`})
    }
    Object.assign(updateCategory, req.body);
    res.status(200).json(`successfully updated!`)
}
export const delById = (req, res)=> {
    const id = Number(req.params.id);
    if(!id){
        return res.status(404).json({error: 'id cannot be empty!!'})
    }
    const findId = categories.findIndex((c) => id === c.id);
    if(findId === -1){
        return res.status(404).json({error: `cannot find the matching id!!!`})
    }
    categories.splice(findId, 1)
 res.status(204).json(`successfully delete`);
}
