import db from "../models/index.js";

export const getUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await db.User.create({ name, email });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
};
