import {medicines} from '../models/data.js'

export const getAllMedicines = (req, res) => {
     res.status(200).json(medicines);
}
export const getMedicineById = (req, res) =>{
    const id = Number(req.params.id);
    if(!id){
        return res.status(404).json({error: `id cannot be empty!`})
    }
    const findMed = medicines.find((h) => id === h.id);
    if(!findMed){
        return res.status(404).json({error: `cannot find the bill with this id!`})
    }
    res.status(200).json(findMed);
}
export const createMedicine = (req, res)=>{
    const {name, type, pricePerUnit, stock, category} = req.body;
    if(!name || !type || !pricePerUnit || !stock || !category){
        return res.status(404).json({error: `all fields must be provided!`})
    }
    const newMed = {
        id : (medicines.length) + 1,
        name: name,
        type: type,
        pricePerUnit: pricePerUnit,
        stock: stock,
        category: category
    }
    medicines.push(newMed);
    res.status(201).json(`successfully added new medicine!!`)
}
export const updateMedicine = (req, res)=>{
    const id = Number(req.params.id);
    if(!id){
        return res.status(404).json({error: `id cannot be empty!`})
    }
    const {name, type, pricePerUnit, stock, category} = req.body;
const update = medicines.find((m) => id === m.id);
if(!update){
    return res.status(404).json({error: `cannot find the matching id!`})
}
    if(Object.keys(req.body).length === 0){
        return res.status(404).json({error: `atleast one field must be provided!`})
}
    Object.assign(update, req.body);
    res.status(200).json(`successfully updated medicine!`);
}
export const delMedicine = (req, res) =>{
    const id = Number(req.params.id);
    if(!id){
        return res.status(404).json({error: `id cannot be empty!`})
    }
    const delMed = medicines.findIndex((m) => id === m.id);
    if(delMed === -1){
        return res.status(404).json({error: `cannot find the matching id!`})
    }
    medicines.splice(delMed, 1);
    res.status(200).json(`successfully deleted the medicine!`)
}