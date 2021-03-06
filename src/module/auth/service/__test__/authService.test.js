const chai = require("chai");
chai.use(require("chai-as-promised"));

const { expect } = chai;
const sinon = require("sinon");

const AuthService = require("../authService");
const UserAlreadyExistsError = require("../../../../shared/error/user/UserAlreadyExistsError");
const UserWrongCredentialsErrror = require("../../../../shared/error/user/UserWrongCredentialsError");

const mockBcrypt = {
  genSalt: sinon.stub(),
  hash: sinon.stub().returns("hash"),
  compare: sinon.stub(),
};

const mockUserRepository = {
  getByMail: sinon.stub().returns(null),
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
        mail: "test",
        password: "12345",
      };

      mockUserRepository.getByMail.returns(null)
      
      await authService.register(user);

      expect(mockUserRepository.getByMail.calledOnceWith(user.mail)).to.be.true;
      expect(mockUserRepository.save.calledOnceWith(user)).to.be.true;
    });

    it("throws error when service's getByEmail returns an user", async () => {
      const user = {
        mail: "test",
        password: "12345",
      };

      mockUserRepository.getByMail.returns(user);

      await expect(authService.register(user)).to.be.rejectedWith(
        UserAlreadyExistsError
      );
    });
  });

  describe("checkPassword method", () => {
    it("calls bcrypt compare method and returns true", async () => {
      mockBcrypt.compare.returns(true);

      const result = await authService.checkPassword("password", "hash");

      expect(mockBcrypt.compare.calledOnceWith("password", "hash")).to.be.true;
      expect(result).to.be.true;
    });

    it("throw error when bcrypt's compare method returns false", async () => {
      mockBcrypt.compare.returns(false);

      await expect(authService.checkPassword("password", "hash")).to.be.rejectedWith(UserWrongCredentialsErrror);
    });
  });
});
