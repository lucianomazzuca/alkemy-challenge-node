const chai = require("chai");

const { expect } = chai;
const sinon = require("sinon");

const AuthService = require("../authService");
const UserAlreadyExistsError = require("../../../../shared/error/user/UserAlreadyExistsError");

let mockBcrypt = {
  genSalt: sinon.stub(),
  hash: sinon.spy(),
};

const mockUserRepository = {};

const authService = new AuthService(mockUserRepository, mockBcrypt);

describe("Auth service methods", () => {
  describe("encryptPassword method", () => {
    it("Calls bcrypt's genSalt and hash methods, then returns a hashed password", async () => {
      const password = "12345";
      const salt = 10;
      const genSalt = "abc1234";
      const hash = 'hashedPassword';
      
      mockBcrypt.genSalt = sinon.stub().returns("10")
      mockBcrypt.hash = sinon.stub().returns(hash),

      mockBcrypt.genSalt.returns(genSalt);
      const result = await authService.encryptPassword(password);

      expect(mockBcrypt.genSalt.calledOnceWith(salt)).to.be.true;
      expect(mockBcrypt.hash.calledOnceWith(password, genSalt)).to.be.true;
      expect(result).to.equal(hash)
    });
  });
});
