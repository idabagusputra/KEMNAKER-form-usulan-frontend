import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "No token provided!" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized!" });
        }
        req.email = decoded.email;
        next();
    });
}