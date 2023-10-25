import { User } from "../../src/models/index.js";
import userFixture from "./fixtures/user-fixture.js";

export const loadUserFixtures = async () => {
  await User.truncate();
  return Promise.all(userFixture.map((f) => User.create(f)));
};
