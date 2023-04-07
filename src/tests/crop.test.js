import mongoose, { set } from "mongoose";
import testBase from "./index";

describe("Crop Management", function () {
  const req = {
    cropType: "crop1",
    season: "crop season",
    Acreage: "1000",
    expectedYield: "1000",
  };

  const user = {
    name: "userman",
    username: "userman111",
    email: "userman@gmail.com",
    password: "password",
  };
  let cropId;
  beforeAll(async function () {
    const auth = await testBase.post("/auth/signup").send(user);
    const crop = await testBase
      .post("/crop/")
      .set("Authentication", auth.body.accessToken)
      .send(req);
    const id = crop.body.crop._id;
    cropId = id;
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it("it should return all registered crops", async () => {
    const response = await testBase.get("/crop/").send({});

    expect(response.status).toBe(200);

    expect(response.body).toEqual(expect.arrayContaining([]));
  });

  it("Should return a crop when a user is logged in", async () => {
    const login = await testBase.post("/auth/signin").send({
      email: "userman@gmail.com",
      password: "password",
    });
    const token = login.body.accessToken;
    // const newReq = await testBase
    //   .post(`/crop/`)
    //   .set("Authentication", token)
    //   .send(req);
    // const id = newReq.body.crop._id;
    const res = await testBase
      .get(`/crop/${cropId}`)
      .set("Authentication", token)
      .send({});

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Crop Found!");
  });
  it("Shouldn't return a crop if it doesn't exist", async () => {
    const login = await testBase.post("/auth/signin").send({
      email: "userman@gmail.com",
      password: "password",
    });
    const token = login.body.accessToken;
    const res = await testBase
      .get(`/crop/642fe58fd2acc14754dee091`)
      .set("Authentication", token)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Crop not found in the database");
  });
  it("shouldn't add a crop when provided with empty fields", async () => {
    const login = await testBase.post("/auth/signin").send({
      email: "userman@gmail.com",
      password: "password",
    });
    const token = login.body.accessToken;

    const res = await testBase
      .post("/crop/")
      .set("Authentication", token)
      .send({});

    expect(res.status).toBe(422);
    expect(res.body.message).toBe("Please fillout all the required Fields");
  });

  it("Shouldn't update a crop that doesn't exist", async () => {
    const login = await testBase.post("/auth/signin").send({
      email: "userman@gmail.com",
      password: "password",
    });
    const token = login.body.accessToken;

    const res = await testBase
      .put("/crop/642fe58fd2acc14754dee091")
      .set("Authentication", token)
      .send(req);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Crop Not found");
  });

  it("Should update a crop that exist", async () => {
    const login = await testBase.post("/auth/signin").send({
      email: "userman@gmail.com",
      password: "password",
    });
    const token = login.body.accessToken;
    const res = await testBase
      .put(`/crop/${cropId}`)
      .set("Authentication", token)
      .send(req);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Crop Updated!");
  });

  it("Shouldn't delete a crop that doesn't exist", async () => {
    const login = await testBase.post("/auth/signin").send({
      email: "userman@gmail.com",
      password: "password",
    });
    const token = login.body.accessToken;
    const res = await testBase
      .delete(`/crop/642fe58fd2acc14754dee091`)
      .set("Authentication", token)
      .send(req);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("No crop Found");
  });

  it("Should delete a crop that  exists", async () => {
    const login = await testBase.post("/auth/signin").send({
      email: "userman@gmail.com",
      password: "password",
    });
    const token = login.body.accessToken;
    const res = await testBase
      .delete(`/crop/${cropId}`)
      .set("Authentication", token)
      .send(req);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Crop deleted!");
  });
});
