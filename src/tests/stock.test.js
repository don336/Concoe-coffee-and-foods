import mongoose from 'mongoose';
import testBase from './index';

describe('Stock Management', function () {
  const req = {
    name: 'stock 1',
    quantity: '1000',
    unit: 'tonnes',
    price: '10000000',
  };

  const user = {
    name: 'userman',
    username: 'userman1378',
    email: 'userman273@gmail.com',
    password: 'password',
  };
  let stockId;
  let Token;
  beforeAll(async () => {
    const auth = await testBase.post('/auth/signup').send(user);
    Token = auth.body.accessToken;

    const stock = await testBase
      .post('/stock/')
      .set('Authorization', Token)
      .send(req);
    const id = stock.body.newstock._id;
    stockId = id;
  }, 15000);

  afterAll(async () => {
    mongoose.connection.close();
  }, 10000);

  it('it should return all Stock', async () => {
    const response = await testBase
      .get('/stock/')
      .set('Authorization', Token)
      .send({});
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
  }, 10000);
  it('it shouldnt return stock if not loggedin', async () => {
    const response = await testBase.get(`/stock/${stockId}`).send({});
    expect(response.status).toBe(401);
    expect(response.body.msg).toEqual('Auth Denied!');
  }, 10000);

  it('Should return stock when a user is logged in', async () => {
    const res = await testBase
      .get(`/stock/${stockId}`)
      .set('Authorization', Token)
      .send({});

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Stock Found');
  }, 10000);
  it("Shouldn't return a stock if it doesn't exist", async () => {
    const res = await testBase
      .get(`/stock/64df447ab8f8800cf2137df9`)
      .set('Authorization', Token)
      .send({});

    expect(res.status).toBe(500);
    expect(res.body.Error).toBe('Stock not found');
  }, 10000);

  it("shouldn't add stock when provided with empty fields", async () => {
    const res = await testBase
      .post('/stock/')
      .set('Authorization', Token)
      .send({});

    expect(res.status).toBe(500);
    expect(res.body.Error).toBe('All fields required');
  }, 10000);

  it('should add Stock with all fields', async () => {
    const res = await testBase
      .post('/stock/')
      .set('Authorization', Token)
      .send({
        name: 'breaker',
        quantity: '100',
        price: '10000000000',
        unit: 'kgs',
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Stock Added');
  }, 10000);

  it('Should update Stock that exist', async () => {
    const res = await testBase
      .put(`/stock/${stockId}`)
      .set('Authorization', Token)
      .send(req);
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Stock Updated');
  }, 10000);

  it("Shouldn't delete stock that doesn't exist", async () => {
    const res = await testBase
      .delete(`/stock/642fe58fd2acc14754dee091`)
      .set('Authorization', Token)
      .send(req);
    expect(res.status).toBe(500);
    expect(res.body.Error).toBe('Stock not found');
  }, 10000);

  it('Should delete stock that  exists', async () => {
    const res = await testBase
      .delete(`/stock/${stockId}`)
      .set('Authorization', Token)
      .send(req);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Stock deleted');
  }, 10000);
});
