const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");

module.exports = {
  /**
   * MODIFIERS - name of type "Post" as per typedef
   * if we do stuff here to change any of the fields, each time any mutation or query happens that return a post,
   * it will go through this Post modifier and apply these modiifications
   * WHICH IS PRETTY COOL
   */
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  // Subscription: {
  //   ...postsResolvers.Subscription,
  // },
};
