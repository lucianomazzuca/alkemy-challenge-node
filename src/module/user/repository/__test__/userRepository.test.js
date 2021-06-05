const chai = require("chai");

const { expect } = chai;
chai.use(require("chai-as-promised"));
const sequelizeInstance = require("../../../../config/sequelize");

const UserModel = require("../../model/userModel");
const UserRepository = require("../userRepository");

const createUserTest = require("../../fixture/userFixture");
const NotFoundError = require("../../../../shared/error/NotFoundError");

describe("User repository methods", () => {
  let userModel;
  let userRepository;

  beforeEach(async () => {
    await sequelizeInstance.drop();

    // Setup models
    userModel = UserModel.setup(sequelizeInstance);

    userRepository = new UserRepository(userModel);

    await sequelizeInstance.sync({ force: true });
  });

  describe("save method", () => {
    it("should add a new user to the db", async () => {
      const user = createUserTest();
      await userRepository.save(user);

      const userInDb = await userModel.findByPk(1);
      expect(userInDb.id).to.equal(1);
      expect(userInDb.name).to.equal(user.name);
    });

    it("should update an existing user in the db", async () => {
      const user = createUserTest();
      await userRepository.save(user);

      user.id = 1;
      user.name = "Test2";

      await userRepository.save(user);

      const userInDb = await userModel.findByPk(1);
      expect(userInDb.id).to.equal(1);
      expect(userInDb.name).to.equal("Test2");
    });
  });

  describe("getById method", () => {
    it("should return the first user in db", async () => {
      const user = createUserTest();
      await userRepository.save(user);

      const userInDb = await userRepository.getById(1);
      expect(userInDb.id).to.equal(1);
      expect(userInDb.name).to.equal(user.name);
    });

    it("should throw error when an user is not found", async () => {
      await expect(userRepository.getById(1)).to.be.rejectedWith(NotFoundError);
    });
  });

  describe("getByName method", () => {
    it("should return the first user in db", async () => {
      const user = createUserTest();
      await userRepository.save(user);

      const userInDb = await userRepository.getByName(user.name);
      expect(userInDb.id).to.equal(1);
      expect(userInDb.name).to.equal(user.name);
    });

    it("should return null if the user is not found", async () => {
      const userInDb = await userRepository.getByName('test');
      expect(userInDb).to.be.null;
    });
  });
});
