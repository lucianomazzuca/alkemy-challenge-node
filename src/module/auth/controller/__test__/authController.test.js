const chai = require("chai");

const { expect } = chai;
const sinon = require("sinon");
const AuthController = require("../authController");
const UserAlreadyExistsError = require("../../../../shared/error/user/UserAlreadyExistsError");
const createUserTest = require("../../../user/fixture/userFixture");

const mockAuthService = {
  register: sinon.stub(),
};

const authController = new AuthController(mockAuthService);

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
    expect(resMock.json.calledWith({ msg: "User already exists" })).to.be.true;
  });
});
