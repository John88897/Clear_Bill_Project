 require("dotenv").config();
const {sequelize} = require("./config/db");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const billRoutes = require("./routes/billRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const receptionistRoutes = require("./routes/receptionistRoutes")
const cashierRoutes = require("./routes/cashierRoutes")
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes")
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/receptionists", receptionistRoutes);
app.use("/api/cashiers", cashierRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctors", doctorRoutes )
app.get("/", (req, res) => {
  res.send("ClearBill Backend API is running!");
});
sequelize.authenticate()
.then(() => {
    console.log("Database Connected");
})
.catch(err => {
    console.error("Database Error:", err);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});


