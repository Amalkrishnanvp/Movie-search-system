const bcrypt = require("bcryptjs");
const saltRounds = 10;
const Admin = require("./models/admin");

module.exports = {
  // Function for new user sign up
  createAdmin: async () => {
    // new user's data
    const name = "admin";
    const email = "admin@gmail.com";
    const password = "admin123";

    try {
      // Check if the admin already created
      const adminCreated = await Admin.findOne({ name });

      if (adminCreated) {
        return { success: false, message: "Admin already created" };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Add admin with hashed password
      const adminData = {
        name,
        email,
        password: hashedPassword,
        role: "admin",
      };

      await Admin.insertOne(adminData);

      console.log("Admin created");
    } catch (error) {
      console.log("Error creating admin:", error);
    }
  },
};
