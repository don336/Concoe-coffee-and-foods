import mongoose from "mongoose";
import testBase from "./index";

describe("Crop Management", function () {
  beforeAll((done) => {
    done();
  });

  beforeEach(async function () {
    await createUsers();
  });

  afterEach(async function () {
    await deleteUsers();
  });

  afterAll(async () => {
    mongoose.connection.close();
  });
});
