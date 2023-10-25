import * as expressValidator from "express-validator";
import { ErrorFormatter, PaginationMixin } from "./mixins/index.js";
import UserService from "../user-service/index.js";

const { check } = expressValidator;

const createValidator = [
  check("email")
    .exists()
    .isEmail()
    .trim()
    .custom(async (email) => {
      if (await UserService.findByEmail(email)) {
        throw new Error("Email already used");
      }
    }),
  check("password").exists().isLength({ min: 8 }),
  check("name").exists().isString().trim(),
  check("is_staff").exists().isBoolean(),
  check("is_superuser").exists().isBoolean(),
  check("permission_codes").exists().isString(),
  ErrorFormatter,
];

const updateValidator = [
  check("password").optional().isString().isLength({ min: 8 }),
  check("name").optional().isString().trim(),
  check("is_staff").optional().isBoolean(),
  check("is_superuser").optional().isBoolean(),
  check("permission_codes").optional().isString(),
  ErrorFormatter,
];

const searchValidator = [...PaginationMixin, ErrorFormatter];

const authValidator = [check("email").exists().isEmail().trim(), check("password").exists()];

export default {
  createValidator,
  updateValidator,
  searchValidator,
  authValidator,
};
