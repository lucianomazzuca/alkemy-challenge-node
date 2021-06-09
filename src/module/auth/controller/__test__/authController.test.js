const chai = require("chai");

const { expect } = chai;
const sinon = require("sinon");
const AuthController = require("../authController");
const UserAlreadyExistsError = require("../../../../shared/error/user/UserAlreadyExistsError");
const createUserTest = require("../../../user/fixture/userFixture");

const mockUser = createUserTest();
const mockAuthService = {
  register: sinon.stub(),
  checkPassword: sinon.stub().returns(true),
  generateJwt: sinon.stub()
};

const mockUserRepository = {
  getByMail: sinon.stub().returns(mockUser),
};

const authController = new AuthController(mockAuthService, mockUserRepository);

const reqMock = {
  body: createUserTest(),
};

const nextMock = sinon.mock();

const resMock = {
  json: sinon.stub(),
  sendStatus: sinon.spy(),
  status: sinon.spy(() => resMock),
};

describe("Auth controller methods", () => {
  afterEach(() => {
    sinon.reset();
  });

  describe("register method", () => {
    it("register calls service's register method and responds with a code 201", async () => {
      await authController.register(reqMock, resMock, nextMock);

      expect(mockAuthService.register.calledOnce).to.be.true;
      expect(resMock.status.calledOnce).to.be.true;
      expect(resMock.status.calledWith(201)).to.be.true;
    });

    it("register sends an error 400 when receives an error UserAlreadyExists from service", async () => {
      mockAuthService.register
        .onFirstCall()
        .throws(() => new UserAlreadyExistsError(`User already exists`));

      await authController.register(reqMock, resMock, nextMock);

      expect(resMock.status.calledOnce).to.be.true;
      expect(resMock.status.calledWith(400)).to.be.true;
      expect(resMock.json.calledOnce).to.be.true;
      expect(resMock.json.calledWith({ error: "User already exists" })).to.be
        .true;
    });
  });

  describe("login method", () => {
    it("calls service's getByEmail, checkPassword, and generateJwt methods, then sends a token", async () => {
      const user = createUserTest();
      const userHash = {
        name: user.name,
        password: 'hash'
      }

      mockUserRepository.getByMail.returns(userHash);
      mockAuthService.generateJwt.returns('jwt');

      await authController.login(reqMock, resMock, nextMock);

      expect(mockUserRepository.getByMail.calledOnceWith(user.mail)).to.be.true;
      expect(mockAuthService.checkPassword.calledOnceWith(user.password, userHash.password)).to.be.true;
      expect(mockAuthService.generateJwt.calledOnceWith(user.mail)).to.be.true;
      expect(resMock.status.calledOnceWith(200)).to.be.true;
      expect(resMock.json.calledOnceWith({ token: 'jwt'})).to.be.true;
    })
  })
});
