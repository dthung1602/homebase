import { User } from "../../models/index.js";
import { NotFoundError } from "../../errors.js";

async function create(data) {
  const user = new User(data);
  user.setPassword(data.password);
  return user.save();
}

async function find(userId) {
  return User.findByPk(userId);
}

async function findByEmail(email) {
  return User.findOne({ where: { email } });
}

async function search(limit, offset) {
  // TODO add filtering & searching
  return User.findAll({ limit, offset });
}

async function update(userId, data) {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new NotFoundError();
  }
  if (data.hasOwnProperty("password")) {
    user.setPassword(data.password);
    delete data.password;
  }
  user.set(data);
  return user.save();
}

async function destroy(userId) {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new NotFoundError();
  }
  return user.destroy();
}

async function authenticate(email, password) {
  const user = await findByEmail(email);
  if (!user) {
    return null;
  }
  const authenticated = user.validatePassword(password);
  return authenticated ? user : null;
}

export default { create, find, findByEmail, search, update, destroy, authenticate };
