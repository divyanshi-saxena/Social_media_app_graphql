const { model, Schema } = require("mongoose");

// we will handle the required attribute at graphql side only
const postSchema = new Schema({
  body: String,
  username: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users", // name of collection
  },
  createdAt: String,
});

module.exports = model("Post", postSchema);
