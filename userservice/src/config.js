import { config } from "dotenv";

config();

function getEnv(envName, defaultValue = undefined, converter = (x) => x) {
  let value = process.env[envName];
  if (value === undefined) {
    value = defaultValue;
  }
  return converter(value);
}

export default {
  NODE_ENV: getEnv("NODE_ENV", "dev"),
  PORT: getEnv("PORT", 3000, parseInt),
  DB_URI: getEnv("DB_URI", "sqlite:users.db"),
  DEFAULT_PAGE_SIZE: getEnv("DEFAULT_PAGE_SIZE", 20, parseInt),
  PASSWORD_SALT_ROUND: getEnv("PASSWORD_SALT_ROUND", 3, parseInt),
};
