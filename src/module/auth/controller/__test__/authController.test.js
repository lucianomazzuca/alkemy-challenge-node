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
  generateJwt: sinon.stub().returns('jwt')
};

const mockUserRepository = {
  getByName: sinon.stub().returns(mockUser),
};

const authController = new AuthController(mockAuthService, mockUserRepository);

const reqMock = {
  body: createUserTest(),
};

const nextMock = sinon.mock();

const resMock = {
  json: sinon.spy(),
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
    it("calls service's getByName, checkPassword, and generateJwt methods, then sends a token", async () => {
      const user = createUserTest();

      const result = await authController.login(reqMock, resMock, nextMock);

      expect(mockUserRepository.getByName.calledOnceWith(user.name)).to.be.true;
      expect(mockAuthService.checkPassword.calledOnce).to.be.true;
    })
  })
});
