const { expect } = require("chai");
const request = require("supertest");
const app = require("../server");

describe("API Integration Demo", function () {
  it("loads the home page", async function () {
    const res = await request(app).get("/");
    expect(res.status).to.equal(200);
    expect(res.text).to.include("API Integration Demo");
  });

  it("returns users from the integrated REST API", async function () {
    const res = await request(app).get("/api/users");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("returns a user by ID", async function () {
    const res = await request(app).get("/api/users/1");
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("id", 1);
  });
});