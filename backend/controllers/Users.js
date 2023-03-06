import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: { exclude: ["password", "refresh_token"] },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.json({ msg: "User created successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const id = user[0].id;
    const email = user[0].email;
    const name = user[0].name;
    const accessToken = jwt.sign(
      { id, email, name },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );
    const refreshToken = jwt.sign(
      { id, email, name },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    await Users.update({ refresh_token: refreshToken }, { where: { id: id } });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
    console.log("Logged in successfully")
  } catch (error) {
    res.status(404).json({ message: "Email not found" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.sendStatus(204);
  }
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user) {
    return res.sendStatus(204);
  }
  await Users.update({ refresh_token: null }, { where: { id: user[0].id } });
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully" });
};
