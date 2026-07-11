const jwt = require("jsonwebtoken");
require('dotenv').config()

exports.verifyWebToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log("SECRET IN MIDDLEWARE:", process.env.ACCESS_TOKEN_SECRET);
    console.log("JWT ERROR:", err);
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  });
};
exports.verifyAdmin = (req, res, next) => {
  exports.verifyWebToken(req, res, () => {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Admin access only!" });
    }
    next();
  });
};
exports.verifyPatient = (req, res, next) => {
  exports.verifyWebToken(req, res, () => {
    if (req.user.role !== 'Patient') {
      return res.status(403).json({ message: 'Patient access only' })
    }
    next();
  }
  )
}
exports.verifyDoctor = (req, res, next) => {
  exports.verifyWebToken(req, res, () => {
    if (req.user.role !== 'Doctor') {
      return res.status(403).json({ message: 'Doctor access only' })
    }
    next();
  }
  )
}
exports.verifyReceptionist = (req, res, next) => {
  exports.verifyWebToken(req, res, () => {
    if (req.user.role !== 'Receptionist') {
      return res.status(403).json({ message: 'Receptionist access only' })
    }
    next();
  })
}




exports.verifyCashier = (req, res, next) => {
  exports.verifyWebToken(req, res, () => {
    if (req.user.role !== 'Cashier') {
      return res.status(403).json({ message: 'Cashier access only' })
    }
    next();
  }
  )
}