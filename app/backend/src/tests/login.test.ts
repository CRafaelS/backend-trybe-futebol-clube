import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';

import Users from '../database/models/UserModels';
import { User } from './mock';
import userMock from './mock/userMock'


chai.use(chaiHttp);

const { expect } = chai;

// Chamada sem o campo email; 
// chamada sem o campo password;
// caso de sucesso

describe('Teste da rota Login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let routesResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findAll")
      .resolves( userMock as Users[]);
  });

  after(()=>{
    (Users.findAll as sinon.SinonStub).restore();
  })

  describe('Testes para quando a requisição não tem email', () => {
    it('Tem o status 400'), async() => {
      routesResponse = await chai.request(app).post('/login').send(userMock[0]);
      expect(routesResponse).to.have.status(400);
    }
    it('Teste da mensagem de retorno é "email is required"', async() => {
      routesResponse = await chai.request(app).post('/login').send(userMock[0]);
      expect(routesResponse.body.mensagem).to.equal('All fields must be filled');
    });
  });

  describe('Teste para requisição sem o campo password', () => {
    it('Tem o status 400', async() => {
      routesResponse = await chai.request(app).post('/login').send(userMock[1]);
      expect(routesResponse).to.have.status(400);
    })
    it('Teste da mensagem de retorno é "password is required"', async() => {
      routesResponse = await chai.request(app).post('/login').send(userMock[1]);
      expect(routesResponse.body.mensagem).to.equal('All fields must be filled');
    });
  })

  describe('Teste para requisição com todos os campos', () => {
    it('Tem o status 200', async() => {
      routesResponse = await chai.request(app).post('/login').send(userMock[2]);
      expect(routesResponse).to.have.status(200);
    })
    it('Teste se o retorno tem uma propriedade token', async() => {
      routesResponse = await chai.request(app).post('/login').send(userMock[1]);
      expect(routesResponse.body).to.have.property('token');
    });
  })
});
