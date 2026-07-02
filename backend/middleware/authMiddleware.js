const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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
exports.verifyPatient = ( req, res, next) => {
    exports.verifyWebToken(req, res, () => {
        if(req.user.role !== 'Patient'){
        return res.status(403).json({message: 'Patient access only'})
        }
        next();
    }
)
}