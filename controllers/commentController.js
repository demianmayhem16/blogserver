const ApiError = require("../error/ApiError")
const { Comment, Post } = require("../models/models")

class CommentController {
  async createAuthComment(req, res) {
    const { postId } = req.params
    const { user, body } = req.body

    const post = await Post.findOne({
      where: { id: postId },
    })

    const comment = await Comment.create({
      userId: user.id,
      blogAuthorId: post.userId,
      postId: post.id,
      body: body,
      name: user.name,
      userEmail: user.email,
      isApproved: false,
    })
    return res.json(comment)
  }
  async createPubComment(req, res) {
    const { postId } = req.params
    const { body, name, email } = req.body

    let userName
    if (name) {
      userName = name
    } else {
      userName = "anonymous guest"
    }

    let userEmail
    if (email) {
      userEmail = email
    } else {
      userEmail = "anonymous@gmail.com"
    }

    const post = await Post.findOne({
      where: { id: postId },
    })

    const comment = await Comment.create({
      postId: postId,
      blogAuthorId: post.userId,
      body: body,
      name: userName,
      userEmail: userEmail,
      isApproved: false,
    })
    return res.json(comment)
  }
  
  async getAllPostComments(req, res) {
    const { postId } = req.params
    const comments = await Comment.findAndCountAll({
      where: { postId: postId, isApproved: true },
    })
    return res.json(comments)
  }

  async getAllComments(req, res) {
    const { user } = req.body
    const comments = await Comment.findAndCountAll({
      where: { blogAuthorId: user.id },
    })
    return res.json(comments)
  }

  async getAllUserComments(req, res) {
    const { user } = req.body
    const comments = await Comment.findAndCountAll({
      where: { userId: user.id },
    })
    return res.json(comments)
  }

  async approveComment(req, res) {
    const { id } = req.params
    const comment = await Comment.findOne({ where: { id: id } })
    if (comment) {
      comment.isApproved = true
      await comment.save()
    }
    return res.json(comment)
  }

  async deleteComment(req, res) {
    const { id } = req.params
    await Comment.destroy({
      where: { id: id },
    })
    return res.json(id)
  }

  async deleteCommentByPostId(req, res) {
    const { postId } = req.params
    await Comment.destroy({
      where: { postId: postId },
    })
    return res.json(id)
  }
}

module.exports = new CommentController()
