import { DataTypes } from "sequelize";
import sequelize from "./db.js";
import * as bcrypt from "bcrypt";

import config from "../config.js";

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_staff: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_superuser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    permission_codes: {
      /**
       * Permission ids in django webapp
       * Due to time constraint, we just store permission as an array like this
       * Future work: move permission & group from django to here
       */
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

User.prototype.setPassword = function (newPassword) {
  this.password = bcrypt.hashSync(newPassword, config.PASSWORD_SALT_ROUND);
};

User.prototype.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default User;
