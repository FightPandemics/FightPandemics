const httpErrors = require("http-errors");

const {
  getPostsSchema,
  getPostByIdSchema,
  createPostSchema,
  deletePostSchema,
  likeUnlikePostSchema,
  updatePostSchema,
  addCommentSchema,
} = require("./schema/posts");

/*
 * /api/posts
 */
async function routes(app) {
  const { mongo } = app;
  const Comment = mongo.model("Comment");
  const Post = mongo.model("Post");

  // /posts

  app.get(
    "/",
    { preValidation: [app.authenticate], schema: getPostsSchema },
    async (req, reply) => {
      const { authorId } = req.params;
      const filter = authorId ? { authorId: req.params.authorId } : {};
      const sortedPosts = await Post.find(filter).sort({ date: -1 });
      return reply.send(sortedPosts);
    },
  );

  app.post(
    "/",
    { preValidation: [app.authenticate], schema: createPostSchema },
    async (req) => {
      // todo add logged in user from jwt
      req.body.authorId = ""; // req.user.id;
      return new Post(req.body).save();
    },
  );

  // /posts/postId

  app.get(
    "/:postId",
    { preValidation: [app.authenticate], schema: getPostByIdSchema },
    async (req, reply) => {
      const post = await Post.findById(req.params.postId);
      if (post === null) {
        return reply.send(new httpErrors.NotFound());
      }
      return post;
    },
  );

  app.delete(
    "/:postId",
    { preValidation: [app.authenticate], schema: deletePostSchema },
    async (req) => {
      // todo: make sure user can only delete their own posts
      return Post.findByIdAndRemove(req.params.postId);
    },
  );

  app.patch(
    "/:postId",
    { preValidation: [app.authenticate], schema: updatePostSchema },
    async (req, reply) => {
      // todo: make sure user can only update their own post
      const post = await Post.findById(req.params.postId);
      if (post === null) {
        return reply.send(new httpErrors.NotFound());
      }
      Object.keys(req.body).forEach((key) => {
        if (post[key] && post[key] !== req.body[key]) {
          post[key] = req.body[key];
        }
      });
      return post.save();
    },
  );

  app.post(
    "/:postId/comments",
    { preValidation: [app.authenticate], schema: addCommentSchema },
    async (req) => {
      const { body, params } = req;
      const { postId } = params;
      // todo: get user id from JWT
      //  check if user is authorized to comment (depending on visibility for that post)
      const commentProps = {
        ...body,
        authorId: "", // req.user.id
        postId,
      };
      const newComment = await new Comment(commentProps).save();
      const updatedPost = await Comment.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: newComment } },
        { new: true },
      );
      return updatedPost;
    },
  );

  app.put(
    "/:postId/likes/:userId",
    { preValidation: [app.authenticate], schema: likeUnlikePostSchema },
    async (req) => {
      const { postId, userId } = req.params;
      // todo: get user id from JWT
      //  check if userId is the same as param, and if authorized to like (based on visibility)
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId, likes: { $ne: userId } },
        { $inc: { likesCount: 1 }, $push: { likes: userId } },
        { new: true },
      );
      if (!updatedPost) {
        return new httpErrors.BadRequest();
      }

      return {
        likes: updatedPost.likes,
        likesCount: updatedPost.likesCount,
      };
    },
  );

  app.delete(
    "/:postId/likes/:userId",
    { preValidation: [app.authenticate], schema: likeUnlikePostSchema },
    async (req) => {
      const { postId, userId } = req.params;
      // todo: get user id from JWT
      //  check if userId is the same as param, and if authorized to like (based on visibility)
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId, likes: userId },
        { $inc: { likesCount: -1 }, $pull: { likes: userId } },
        { new: true },
      );
      if (!updatedPost) {
        return new httpErrors.BadRequest();
      }

      return {
        likes: updatedPost.likes,
        likesCount: updatedPost.likesCount,
      };
    },
  );
}

module.exports = routes;
