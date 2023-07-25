import mongoose from 'mongoose';
import testBase from './index';
import { createUsers, deleteUsers } from './testData/userData';

describe('User Auth', function () {
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

  it('should not register when required fields are empty', async () => {
    const res = await testBase.post('/auth/signup').send();
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Please fillout the required fields');
  }, 10000);
  it('should not register an already taken Email', async () => {
    const res = await testBase.post('/auth/signup').send({
      name: 'Paul K',
      username: 'User1',
      email: 'user1@gmail.com',
      password: '12345678',
    });
    expect(res.status).toBe(409);
    expect(res.body.message).toBe('Email has been taken');
  });

  it('should not register an already taken username', async () => {
    const res = await testBase.post('/auth/signup').send({
      name: 'Paul K',
      username: 'User1',
      email: 'user190@gmail.com',
      password: '12345678',
    });

    expect(res.status).toBe(409);
    expect(res.body.message).toBe('Username has been taken');
  });
  it('should register a user with a unique username and email', async () => {
    const res = await testBase.post('/auth/signup').send({
      name: 'Paul K',
      username: 'User191',
      email: 'user191@gmail.com',
      password: '12345678',
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User Registered!');
  });
  it('should not signin when required fields are empty', async () => {
    const res = await testBase.post('/auth/signin').send();
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Please fillout all necessary fields');
  });
  it("shouldn't signIn a user with a none existing email", async () => {
    const res = await testBase.post('/auth/signin').send({
      email: 'user1000@gmail.com',
      password: '12345678',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      'User not found please register and try again'
    );
  });
  it('shouldnot signIn a user with an incorrect password', async () => {
    const res = await testBase.post('/auth/signin').send({
      email: 'user1@gmail.com',
      password: '123456780',
    });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Please Check Password and try again');
  });
  it('should signIn a user with an exisitng email and password', async () => {
    const res = await testBase.post('/auth/signin').send({
      email: 'user1@gmail.com',
      password: '12345678',
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("You're logged in");
  });
});
