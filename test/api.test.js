import app from '../server/';
import supertest from 'supertest';
import { expect, should } from 'chai';
import { regTestData } from './test.data';

const request = supertest.agent(app.listen());
should();

describe('POST /sign-up', () => {
  it('should be register new account', done=>{
    request
      .post('/sign-up')
      .send(regTestData)
      .expect(200, (_, res) => {
        // do something
      });
  });
});
