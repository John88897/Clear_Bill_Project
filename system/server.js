const express = require("express");
import express from 'express';
import categoryRoutes from './routes/categoryRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import machineRoutes from './routes/machineRoutes.js';
import medicineRoutes from './routes/medicineRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
// import categor
const port = 3000;
const app = express()

app.use(express.json());

app.use('/categories', categoryRoutes)
app.use('/departments', departmentRoutes)
app.use('/machines', machineRoutes)
app.use('/medicines', medicineRoutes)
app.use('/staffs', staffRoutes)
app.listen(port, () => {
      console.log(`🚀 Srver is running on http://localhost:${port}`);

})
