const Admin = require("../models/admin");

module.exports = {
  createAdmin: async (params) => {
    const adminData = {
      name: "admin",
      email: "admin@gmail.com",
      password: "admin",
      role: "admin",
    };
    const admin = await Admin.insertOne(adminData);
  },
};
