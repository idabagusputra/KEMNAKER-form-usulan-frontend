import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No token provided!" });
    }
    const user = Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "No user found!" });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token!" });
      }
      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ message: "No Key" });
  }
};
