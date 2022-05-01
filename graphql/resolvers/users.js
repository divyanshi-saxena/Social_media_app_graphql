const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const User = require("../../models/User");
const { SECRET_KEY } = require("../../config");

module.exports = {
  /**
   * register(parent, args, context, info)
   * parent - gives what was the input from last step - it is used when we have multiple resolvers
   * args - given as input, can be destructured
   * context -
   * info - metadata info which we almost never need
   */
  Mutation: {
    register: async (
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) => {
      // TODO: Validate user data
      // TODO: Make sure user doesn't already exist
      const user = await User.findOne({ username });

      if (user) {
        /**
         * we can throw an error but we are using apollo errors
         * this errors object will be used at frontend to display errors
         */
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      // Hash password and create auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
