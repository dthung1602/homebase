import { it, beforeEach, describe, expect } from "@jest/globals";
import { loadUserFixtures } from "./utils.js";
import request from "supertest";

/**
 * TODO  Config jest to work with es module
 * Right now this test won't run
 * https://jestjs.io/docs/ecmascript-modules
 */
describe("User API", () => {
  let app;

  beforeEach(async () => {
    await loadUserFixtures();
    app = import("../../src/app.js");
  });

  it("create user", async () => {
    const body = {
      email: "new@gmail.com",
      password: "password",
      name: "Josh",
      is_staff: false,
      is_superuser: false,
      permission_codes: "view_product,view_user",
    };
    const response = await request(app).post("/users").send(body);
    expect(response.status).toEqual(200);
    expect(response.body.email).toEqual("new@gmail.com");
    expect(response.body.is_staff).toEqual(true);
    expect(response.body.is_superuser).toEqual(true);
    expect(response.body.permission_codes).toEqual("view_product,view_user");
  });
});
