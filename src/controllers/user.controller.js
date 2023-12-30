const userService = require("../services/user.service");
const mongoose = require("mongoose");

const create = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;
  if (!name || !username || !email || !password || !avatar || !background) {
    return res
      .status(400)
      .send({ message: "Submit all fields for registration!" });
  }

  const user = await userService.createService(req.body);

  if (!user) {
    return res.status(400).send({ message: "Error creating user" });
  }

  res.status(201).send({
    message: "User created successfully",
    user: {
      id: user._id,
      name: name,
      username: username,
      email: email,
      password: password,
      avatar: avatar,
      background: background,
    },
  });
};

const findAll = async (req, res) => {
  const users = await userService.findAllService();

  if (users.lenght === 0) {
    return res.status(400).send({ message: "No users registered" });
  }

  res.send(users);
};

const findById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid id" });
  }

  const user = await userService.findByIdService(id);

  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }

  res.send(user);
};

const update = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;
  if (!name && !username && !email && !password && !avatar && !background) {
    return res
      .status(400)
      .send({ message: "Submit at least one field to update" });
  }

  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid id" });
  }

  const user = await userService.findByIdService(id);
  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }

  await userService.updateService(
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
  );

  res.send({ message: "User successfully updated" });
};

module.exports = { create, findAll, findById, update };