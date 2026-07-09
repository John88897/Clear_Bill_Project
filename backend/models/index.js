const User = require("./User");
const Patient = require("./Patient");
const Bill = require("./Bill");
const BillDetail = require("./BillDetail");
const Service = require("./Service");
const Payment = require("./Payment");

// User ↔ Patient
User.hasOne(Patient, {
    foreignKey: "user_id"
});

// Patient.hasMany(Service, { foreignKey: "patient_id", as: "services" });
// Service.belongsTo(Patient, { foreignKey: "patient_id", as: "patient" });

// User.hasMany(Service, { foreignKey: "doctor_id", as: "servicesAsDoctor" });
// Service.belongsTo(User, { foreignKey: "doctor_id", as: "doctor" })

// Patient ↔ Bills
Patient.hasMany(Bill, {
    foreignKey: "patient_id"
});

Bill.belongsTo(Patient, {
    foreignKey: "patient_id"
});

// Bill ↔ BillDetail
Bill.hasMany(BillDetail, {
    foreignKey: "bill_id"
});

BillDetail.belongsTo(Bill, {
    foreignKey: "bill_id"
});

// Service ↔ BillDetail
Service.hasMany(BillDetail, {
    foreignKey: "service_id"
});

BillDetail.belongsTo(Service, {
    foreignKey: "service_id"
});

// Bill ↔ Payment
Bill.hasMany(Payment, {
    foreignKey: "bill_id"
});

Payment.belongsTo(Bill, {
    foreignKey: "bill_id"
});

module.exports = {
    User,
    Patient,
    Bill,
    BillDetail,
    Service,
    Payment
};