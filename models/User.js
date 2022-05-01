const { model, Schema } = require("mongoose");

// we will handle the required attribute at graphql side only
const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

module.exports = model("User", userSchema);
