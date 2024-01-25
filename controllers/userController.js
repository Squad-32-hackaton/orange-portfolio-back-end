import User from "../models/userModel.js";

const users = [];

export function getUsers(req, res) {
    res.json(users);
}
export function addUser(req, res) {
    const { name, email } = req.body;
    const newUser = new User(Date.now(), name, email);
    users.push(newUser);
    res.status(201).json(newUser);
}
