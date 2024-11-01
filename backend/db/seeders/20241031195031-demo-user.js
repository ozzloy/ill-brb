"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  // define your schema in options object
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          email: "demo@example.com",
          username: "Demo-lition",
          firstName: "greatest",
          lastName: "evah",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user1@example.com",
          username: "FakeUser1",
          firstName: "greatest",
          lastName: "evah",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "user2@example.com",
          username: "FakeUser2",
          firstName: "greatest",
          lastName: "evah",
          hashedPassword: bcrypt.hashSync("password3"),
        },
      ],
      { validate: true },
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {},
    );
  },
};
