import mongoose from 'mongoose';
import testBase from './index';

describe('Customer Management', function () {
  const req = {
    name: 'customer1',
    email: 'cust223@gmail.com',
    dateOfBirth: '10/1/2023',
  };

  const user = {
    name: 'userman',
    username: 'userman131',
    email: 'userman23@gmail.com',
    password: 'password',
  };
  let customerId;
  let Token;
  beforeAll(async () => {
    const auth = await testBase.post('/auth/signup').send(user);
    Token = auth.body.accessToken;

    const customer = await testBase
      .post('/customers/')
      .set('Authorization', Token)
      .send(req);
    const id = customer.body.customer.customerId;
    customerId = id;
  }, 15000);

  afterAll(async () => {
    mongoose.connection.close();
  }, 10000);

  it('it should return all registered customers', async () => {
    const response = await testBase
      .get('/customers/')
      .set('Authorization', Token)
      .send({});
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
  }, 10000);
  it('it shouldnt return all registered customers if not loggedin', async () => {
    const response = await testBase.get('/customers/').send({});
    expect(response.status).toBe(401);
    expect(response.body.msg).toEqual('Auth Denied!');
  }, 10000);

  it('Should return a customer when a user is logged in', async () => {
    const res = await testBase
      .get(`/customers/${customerId}`)
      .set('Authorization', Token)
      .send({});

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Customer Found');
  }, 10000);
  it("Shouldn't return a customer if they doesn't exist", async () => {
    const res = await testBase
      .get(`/customers/dd432d2f-8a7a-47ab-8de4-ee20909b2472`)
      .set('Authorization', Token)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toBe('Customer not Found');
  }, 10000);

  it("shouldn't add a customer when provided with empty fields", async () => {
    const res = await testBase
      .post('/customers/')
      .set('Authorization', Token)
      .send({});

    expect(res.status).toBe(422);
    expect(res.body.message).toBe('All fields required');
  }, 10000);

  it('should add a customer  with all fields', async () => {
    const res = await testBase
      .post('/customers/')
      .set('Authorization', Token)
      .send({
        name: 'breaker',
        email: 'brek@gmail.com',
        dateOfBirth: '1/10/2021',
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Customer Added');
  }, 10000);

  it('Should update a customer that exist', async () => {
    const res = await testBase
      .put(`/customers/${customerId}`)
      .set('Authorization', Token)
      .send(req);
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Customer Updated');
  }, 10000);

  it("Shouldn't delete a customer that doesn't exist", async () => {
    const res = await testBase
      .delete(`/customers/642fe58fd2acc14754dee091`)
      .set('Authorization', Token)
      .send(req);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('No customer found');
  }, 10000);

  it('Should delete a customer that  exists', async () => {
    const res = await testBase
      .delete(`/customers/${customerId}`)
      .set('Authorization', Token)
      .send(req);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Customer deleted!');
  }, 10000);
});
