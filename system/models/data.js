// hospital_billing.js

const categories = [
  { id: 1, name: "General Ward",   description: "Basic inpatient care",        baseCost: 1500  },
  { id: 2, name: "ICU",            description: "Intensive care unit",         baseCost: 8000  },
  { id: 3, name: "Emergency",      description: "Emergency room services",     baseCost: 3000  },
  { id: 4, name: "Surgery",        description: "Surgical procedures",         baseCost: 15000 },
  { id: 5, name: "Outpatient",     description: "OPD consultations",           baseCost: 500   },
  { id: 6, name: "Maternity",      description: "Delivery and prenatal care",  baseCost: 7000  },
  { id: 7, name: "Radiology",      description: "Imaging and scans",           baseCost: 2000  },
  { id: 8, name: "Laboratory",     description: "Blood and diagnostic tests",  baseCost: 800   },
];

const departments = [
  { id: 1,  name: "Surgery",    head: "Dr. Arjun Mehta",   floor: 3, totalStaff: 12 },
  { id: 2,  name: "Cardiology", head: "Dr. Priya Sharma",  floor: 4, totalStaff: 8  },
  { id: 3,  name: "Maternity",  head: "Dr. Sneha Patel",   floor: 2, totalStaff: 10 },
  { id: 4,  name: "Pediatrics", head: "Dr. Kiran Nair",    floor: 2, totalStaff: 7  },
  { id: 5,  name: "Emergency",  head: "Dr. Amit Joshi",    floor: 1, totalStaff: 15 },
  { id: 6,  name: "ICU",        head: "Nurse Kavitha R.",  floor: 5, totalStaff: 20 },
  { id: 7,  name: "General",    head: "Nurse Deepa Sinha", floor: 1, totalStaff: 18 },
  { id: 8,  name: "Laboratory", head: "Suresh Iyer",       floor: 0, totalStaff: 6  },
  { id: 9,  name: "Radiology",  head: "Meena Pillai",      floor: 0, totalStaff: 5  },
  { id: 10, name: "Admin",      head: "Arun Thomas",       floor: 0, totalStaff: 9  },
  { id: 11, name: "Pharmacy",   head: "Lakshmi Devi",      floor: 0, totalStaff: 7  },
  { id: 12, name: "Nephrology", head: "Dr. Neha Gupta",    floor: 4, totalStaff: 6  },
  { id: 13, name: "Rehab",      head: "Prakash Nair",      floor: 3, totalStaff: 8  },
  { id: 14, name: "Neurology",  head: "Dr. Vikram Bose",   floor: 5, totalStaff: 9  },
];

const machines = [
  { id: 1,  name: "MRI Scanner",        category: "Radiology",  ratePerHour: 2500,    status: "Active"      },
  { id: 2,  name: "CT Scan Machine",    category: "Radiology",  ratePerHour: 1800,    status: "Active"      },
  { id: 3,  name: "X-Ray Machine",      category: "Radiology",  ratePerHour: 400,  status: "Active"      },
  { id: 4,  name: "Ventilator",         category: "ICU",        ratePerHour: 3000,     status: "Active"      },
  { id: 5,  name: "ECG Machine",        category: "Cardiology", ratePerHour: 600,  status: "Active"      },
  { id: 6,  name: "Ultrasound Machine", category: "Radiology",  ratePerHour: 900,  status: "Active"      },
  { id: 7,  name: "Dialysis Machine",   category: "Nephrology", ratePerHour: 3500, status: "Active"      },
  { id: 8,  name: "Infusion Pump",      category: "General",    ratePerHour: 200,      status: "Active"      },
  { id: 9,  name: "Defibrillator",      category: "Emergency",  ratePerHour: 1500,     status: "Maintenance" },
  { id: 10, name: "Anesthesia Machine", category: "Surgery",    ratePerHour: 2000,    status: "Active"      },
  { id: 11, name: "Patient Monitor",    category: "ICU",        ratePerHour: 1000,     status: "Active"      },
  { id: 12, name: "Pulse Oximeter",     category: "General",    ratePerHour: 150,      status: "Active"      },
];

const medicines = [
  { id: 1,  name: "Paracetamol 500mg",     type: "Tablet",    pricePerUnit: 2,   stock: 5000, category: "Analgesic"         },
  { id: 2,  name: "Amoxicillin 250mg",     type: "Capsule",   pricePerUnit: 8,   stock: 3000, category: "Antibiotic"        },
  { id: 3,  name: "Ibuprofen 400mg",       type: "Tablet",    pricePerUnit: 5,   stock: 4000, category: "Anti-inflammatory" },
  { id: 4,  name: "Omeprazole 20mg",       type: "Capsule",   pricePerUnit: 10,  stock: 2000, category: "Antacid"           },
  { id: 5,  name: "Metformin 500mg",       type: "Tablet",    pricePerUnit: 6,   stock: 2500, category: "Antidiabetic"      },
  { id: 6,  name: "Amlodipine 5mg",        type: "Tablet",    pricePerUnit: 12,  stock: 1800, category: "Antihypertensive"  },
  { id: 7,  name: "Normal Saline 500ml",   type: "IV Fluid",  pricePerUnit: 80,  stock: 800,  category: "IV Fluid"          },
  { id: 8,  name: "Dextrose 5% 500ml",     type: "IV Fluid",  pricePerUnit: 90,  stock: 600,  category: "IV Fluid"          },
  { id: 9,  name: "Morphine 10mg/ml",      type: "Injection", pricePerUnit: 150, stock: 300,  category: "Opioid Analgesic"  },
  { id: 10, name: "Ceftriaxone 1g",        type: "Injection", pricePerUnit: 200, stock: 500,  category: "Antibiotic"        },
  { id: 11, name: "Atorvastatin 10mg",     type: "Tablet",    pricePerUnit: 15,  stock: 2000, category: "Statin"            },
  { id: 12, name: "Insulin Glargine 100U", type: "Injection", pricePerUnit: 850, stock: 200,  category: "Antidiabetic"      },
  { id: 13, name: "Azithromycin 500mg",    type: "Tablet",    pricePerUnit: 35,  stock: 1500, category: "Antibiotic"        },
  { id: 14, name: "Ondansetron 4mg",       type: "Tablet",    pricePerUnit: 18,  stock: 1200, category: "Antiemetic"        },
  { id: 15, name: "Heparin 5000U/ml",      type: "Injection", pricePerUnit: 300, stock: 400,  category: "Anticoagulant"     },
];

const staff = [
  { id: 1,  name: "Dr. Arjun Mehta",   role: "Chief Surgeon",       departmentId: 1,  hourlyRate: 2000, shift: "Morning"  },
  { id: 2,  name: "Dr. Priya Sharma",  role: "Cardiologist",        departmentId: 2,  hourlyRate: 1800, shift: "Morning"  },
  { id: 3,  name: "Dr. Rahul Verma",   role: "Anesthesiologist",    departmentId: 1,  hourlyRate: 1500, shift: "Rotating" },
  { id: 4,  name: "Dr. Sneha Patel",   role: "Gynecologist",        departmentId: 3,  hourlyRate: 1600, shift: "Morning"  },
  { id: 5,  name: "Dr. Kiran Nair",    role: "Pediatrician",        departmentId: 4,  hourlyRate: 1200, shift: "Morning"  },
  { id: 6,  name: "Dr. Amit Joshi",    role: "Emergency Physician", departmentId: 5,  hourlyRate: 1400, shift: "Night"    },
  { id: 7,  name: "Nurse Kavitha R.",  role: "Head Nurse",          departmentId: 6,  hourlyRate: 250,  shift: "Rotating" },
  { id: 8,  name: "Nurse Deepa Sinha", role: "Staff Nurse",         departmentId: 7,  hourlyRate: 180,  shift: "Morning"  },
  { id: 9,  name: "Nurse Ravi Kumar",  role: "Staff Nurse",         departmentId: 1,  hourlyRate: 180,  shift: "Night"    },
  { id: 10, name: "Suresh Iyer",       role: "Lab Technician",      departmentId: 8,  hourlyRate: 160,  shift: "Morning"  },
  { id: 11, name: "Meena Pillai",      role: "Radiographer",        departmentId: 9,  hourlyRate: 200,  shift: "Morning"  },
  { id: 12, name: "Arun Thomas",       role: "Billing Executive",   departmentId: 10, hourlyRate: 140,  shift: "Morning"  },
  { id: 13, name: "Lakshmi Devi",      role: "Pharmacist",          departmentId: 11, hourlyRate: 170,  shift: "Rotating" },
  { id: 14, name: "Dr. Neha Gupta",    role: "Nephrologist",        departmentId: 12, hourlyRate: 1700, shift: "Morning"  },
  { id: 15, name: "Prakash Nair",      role: "Physiotherapist",     departmentId: 13, hourlyRate: 190,  shift: "Morning"  },
  { id: 16, name: "Dr. Vikram Bose",   role: "Neurologist",         departmentId: 14, hourlyRate: 1900, shift: "Morning"  },
  { id: 17, name: "Nurse Anita Roy",   role: "Staff Nurse",         departmentId: 14, hourlyRate: 180,  shift: "Night"    },
];
export { categories, departments, machines, medicines, staff };