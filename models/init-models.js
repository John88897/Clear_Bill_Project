var DataTypes = require("sequelize").DataTypes;
var _bill_details = require("./bill_details");
var _bills = require("./bills");
var _patients = require("./patients");
var _payments = require("./payments");
var _services = require("./services");
var _users = require("./users");

function initModels(sequelize) {
  var bill_details = _bill_details(sequelize, DataTypes);
  var bills = _bills(sequelize, DataTypes);
  var patients = _patients(sequelize, DataTypes);
  var payments = _payments(sequelize, DataTypes);
  var services = _services(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  bill_details.belongsTo(bills, { as: "bill", foreignKey: "bill_id"});
  bills.hasMany(bill_details, { as: "bill_details", foreignKey: "bill_id"});
  payments.belongsTo(bills, { as: "bill", foreignKey: "bill_id"});
  bills.hasMany(payments, { as: "payments", foreignKey: "bill_id"});
  bills.belongsTo(patients, { as: "patient", foreignKey: "patient_id"});
  patients.hasMany(bills, { as: "bills", foreignKey: "patient_id"});
  bill_details.belongsTo(services, { as: "service", foreignKey: "service_id"});
  services.hasMany(bill_details, { as: "bill_details", foreignKey: "service_id"});
  patients.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasOne(patients, { as: "patient", foreignKey: "user_id"});

  return {
    bill_details,
    bills,
    patients,
    payments,
    services,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
