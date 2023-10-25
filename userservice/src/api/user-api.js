import { Router } from "@awaitjs/express";
import UserService from "../services/user-service/index.js";
import UserValidation from "../services/validation-service/user-validation.js";
import config from "../config.js";
import { NotFoundError } from "../errors.js";

const router = Router();

//-----------------------------------
//  Create new user
//-----------------------------------
router.postAsync("/", UserValidation.createValidator, async (req, res) => {
  const user = await UserService.create(req.body);
  res.json(serialize(user));
});

//-----------------------------------
//  Get user
//-----------------------------------
router.getAsync("/:id", async (req, res) => {
  const user = await UserService.find(parseInt(req.params.id));
  if (!user) {
    throw new NotFoundError();
  }
  res.json(serialize(user));
});

//-----------------------------------
//  Search users
//-----------------------------------
router.getAsync("/", UserValidation.searchValidator, async (req, res) => {
  const limit = req.query.perPage ?? config.DEFAULT_PAGE_SIZE;
  const page = req.query.page ?? 1;
  const offset = (page - 1) * limit;
  const users = await UserService.search(limit, offset);
  res.json(users.map(serialize));
});

//-----------------------------------
//  Edit user profile
//-----------------------------------
router.patchAsync("/:id", UserValidation.updateValidator, async (req, res) => {
  const user = await UserService.update(req.params.id, req.body);
  res.json(serialize(user));
});

//-----------------------------------
//  Delete user
//-----------------------------------
router.deleteAsync("/:id", async (req, res) => {
  await UserService.destroy(req.params.id);
  res.sendStatus(204);
});

//-----------------------------------
//  Authenticate user
//-----------------------------------
router.postAsync("/auth", UserValidation.authValidator, async (req, res) => {
  const user = await UserService.authenticate(req.body.email, req.body.password);
  res.json(serialize(user));
});

function serialize(user) {
  if (user) {
    user = JSON.parse(JSON.stringify(user));
    delete user.password;
  }
  return user;
}

export default router;
