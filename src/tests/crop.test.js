import mongoose from 'mongoose';
import testBase from './index';

describe('Crop Management', function () {
  const req = {
    cropType: 'crop1',
    season: 'crop season',
    acreage: '1000',
    expectedYields: '1000',
  };

  const user = {
    name: 'userman',
    username: 'userman111',
    email: 'userman@gmail.com',
    password: 'password',
  };
  let cropId;
  let Token;
  beforeAll(async () => {
    const auth = await testBase.post('/auth/signup').send(user);
    Token = auth.body.accessToken;
  }, 15000);
  beforeEach(async () => {
    const crop = await testBase
      .post('/crop/')
      .set('Authorization', Token)
      .send(req);
    const id = crop.body.crop._id;
    cropId = id;
  }, 15000);

  afterAll(async () => {
    mongoose.connection.close();
  }, 10000);

  it('it should return all registered crops', async () => {
    const response = await testBase.get('/crop/').send({});

    expect(response.status).toBe(200);

    expect(response.body).toEqual(expect.arrayContaining([]));
  }, 10000);

  it('Should return a crop when a user is logged in', async () => {
    const res = await testBase
      .get(`/crop/${cropId}`)
      .set('Authorization', Token)
      .send({});

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Crop Found!');
  }, 10000);
  it("Shouldn't return a crop if it doesn't exist", async () => {
    const res = await testBase
      .get(`/crop/642fe58fd2acc14754dee091`)
      .set('Authorization', Token)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Crop not found in the database');
  }, 10000);
  it("shouldn't add a crop when provided with empty fields", async () => {
    const res = await testBase
      .post('/crop/')
      .set('Authorization', Token)
      .send({});

    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Please fillout all the required Fields');
  }, 10000);

  it("Shouldn't update a crop that doesn't exist", async () => {
    const res = await testBase
      .put('/crop/c798ad4d-30b9-4592-a1e4-1cc89db595cd')
      .set('Authorization', Token)
      .send(req);
    expect(res.status).toBe(500);
    expect(res.body.Error).toBe('Crop Not Found');
  }, 10000);

  it('Should update a crop that exist', async () => {
    const res = await testBase
      .put(`/crop/${cropId}`)
      .set('Authorization', Token)
      .send(req);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Crop Updated!');
  }, 10000);

  it("Shouldn't delete a crop that doesn't exist", async () => {
    const res = await testBase
      .delete(`/crop/642fe58fd2acc14754dee091`)
      .set('Authorization', Token)
      .send(req);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('No crop Found');
  }, 10000);

  it('Should delete a crop that  exists', async () => {
    const res = await testBase
      .delete(`/crop/${cropId}`)
      .set('Authorization', Token)
      .send(req);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Crop deleted!');
  }, 10000);
});
