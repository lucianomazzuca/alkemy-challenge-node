const chai = require("chai");
chai.use(require("chai-as-promised"));

const { expect } = chai;
const sinon = require("sinon");

const AuthService = require("../authService");
const UserAlreadyExistsError = require("../../../../shared/error/user/UserAlreadyExistsError");

const mockBcrypt = {
  genSalt: sinon.stub(),
  hash: sinon.stub().returns("hash"),
};

const mockUserRepository = {
  getByName: sinon.stub().returns(null),
  save: sinon.stub(),
};

const authService = new AuthService(mockUserRepository, mockBcrypt);

describe("Auth service methods", () => {
  describe("encryptPassword method", () => {
    it("Calls bcrypt's genSalt and hash methods, then returns a hashed password", async () => {
      const password = "12345";
      const salt = 10;
      const genSalt = "abc1234";
      const hash = "hashedPassword";

      mockBcrypt.genSalt = sinon.stub().returns("10");
      mockBcrypt.hash = sinon.stub().returns(hash);

      mockBcrypt.genSalt.returns(genSalt);
      const result = await authService.encryptPassword(password);

      expect(mockBcrypt.genSalt.calledOnceWith(salt)).to.be.true;
      expect(mockBcrypt.hash.calledOnceWith(password, genSalt)).to.be.true;
      expect(result).to.equal(hash);
    });
  });

  describe("register method", () => {
    it("Checks if the user is registered, encrypts the password and calls repository's save method", async () => {
      const user = {
        name: "test",
        password: "12345",
      };
      await authService.register(user);

      expect(mockUserRepository.getByName.calledOnceWith(user.name)).to.be.true;
      expect(mockUserRepository.save.calledOnceWith(user)).to.be.true;
    });

    it("throws error when service's getByName returns an user", async () => {
      const user = {
        name: "test",
        password: "12345",
      };

      mockUserRepository.getByName.returns(user);

      await expect(authService.register(user)).to.be.rejectedWith(
        UserAlreadyExistsError
      );
    });
  });
});
