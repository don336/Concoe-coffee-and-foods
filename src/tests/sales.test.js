import mongoose from 'mongoose';
import testBase from './index';

describe('Sales Management', function () {
  const sale = {
    products: [
      {
        name: 'Robusta',
        quantity: 12,
        price: 1000000,
      },
    ],
  };

  const user = {
    name: 'userman',
    username: 'userman1290',
    email: 'userman230@gmail.com',
    password: 'password',
  };
  const cust = {
    firstname: 'John ',
    lastname: ' Doe',
    phone: '+25678690389',
    email: 'jdoe90000@gmail.com',
    dateOfBirth: '1/10/2012',
  };
  let customerId;
  let Token;
  let saleId;
  beforeAll(async () => {
    const auth = await testBase.post('/auth/signup').send(user);
    Token = auth.body.accessToken;

    const customer = await testBase
      .post('/customers/')
      .set('Authorization', Token)
      .send(cust);

    const id = customer.body.customer.customerId;
    customerId = id;

    const newsale = await testBase
      .post(`/sales/${customerId}`)
      .set('Authorization', Token)
      .send(sale);
    saleId = newsale.body.sale._id;
  }, 15000);

  afterAll(async () => {
    mongoose.connection.close();
  }, 10000);

  it('it should return all available sales for that customer', async () => {
    const response = await testBase
      .get(`/sales/`)
      .set('Authorization', Token)
      .send({});
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
  }, 10000);

  it('Should return a sale when a user is logged in', async () => {
    const res = await testBase
      .get(`/sales/${saleId}`)
      .set('Authorization', Token)
      .send({});

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Sale Found');
  }, 10000);
  it("Shouldn't return a sale if it doesn't exist", async () => {
    const res = await testBase
      .get(`/sales/64de23b901d9f549915075ad`)
      .set('Authorization', Token)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Sale not found');
  }, 10000);

  it("shouldn't add a sale when provided with empty fields", async () => {
    const res = await testBase
      .post(`/sales/${customerId}`)
      .set('Authorization', Token)
      .send({});

    expect(res.status).toBe(422);
    expect(res.body.message).toBe('All fields are required');
  }, 10000);

  it('should add a sales  with all fields', async () => {
    const res = await testBase
      .post(`/sales/${customerId}`)
      .set('Authorization', Token)
      .send({
        products: [
          {
            name: 'Arabica',
            price: 5000,
            quantity: 200,
          },
        ],
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Sale Added');
  }, 10000);

  it('Shouldnt update a sale with empty fields ', async () => {
    const res = await testBase
      .put(`/sales/${customerId}/${saleId}`)
      .set('Authorization', Token)
      .send();
    expect(res.status).toBe(409);
    expect(res.body.message).toBe('No valid update data');
  }, 10000);

  it('Should update a sale that exist', async () => {
    const res = await testBase
      .put(`/sales/${customerId}/${saleId}`)
      .set('Authorization', Token)
      .send(sale);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Sale Updated');
  }, 10000);

  it('Should delete a sale that  exists', async () => {
    const res = await testBase
      .delete(`/sales/${customerId}/${saleId}`)
      .set('Authorization', Token)
      .send({});
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Sale Deleted');
  }, 10000);
});
