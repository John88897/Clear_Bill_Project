const { User } = require("../models");
const jwt = require('jsonwebtoken')
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Wrong password" });
        }
        const token = jwt.sign(
            {id: user.user_id, role: user.role},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "1d"}
        )

        return res.json({
            message: "Login Success",
            token,
            user: {
                id: user.user_id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};