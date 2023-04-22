const uuid = require("uuid")
const path = require("path")
const { Post, User, Comment } = require("../models/models")
const ApiError = require("../error/ApiError")

class PostController {
  async create(req, res, next) {
    try {
      let { title, body, user, preview, tagId } = req.body
      const { img } = req.files
      let fileName = uuid.v4() + ".jpg"
      img.mv(path.resolve(__dirname, "..", "static", fileName))

      let postTagId
      if (tagId) {
        postTagId = tagId
      }
      const post = await Post.create({
        title,
        body,
        img: fileName,
        preview: preview,
        userId: user.id,
        author: user.name,
        tagId: postTagId || null,
      })

      return res.json(post)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    let { limit, page } = req.query
    let { email } = req.query
    let userId
    if (email) {
      const user = await User.findOne({ where: { email } })
      userId = user.id
    } else {
      let { user } = req.body
      userId = user.id
    }
    page = page || 1
    limit = limit || 1000
    let offset = page * limit - limit
    let posts = await Post.findAndCountAll({
      where: { userId },
      limit,
      offset,
    })
    return res.json(posts)
  }

  async getOne(req, res) {
    const { id } = req.params
    const onePost = await Post.findOne({
      where: { id: id },
    })

    return res.json(onePost)
  }

  async toggleLike(req, res) {
    const { id } = req.params
    const post = await Post.findOne({ where: { id: id } })
    if (post) {
      post.like = !post.like
      await post.save()
    }
    return res.json()
  }

  async toggleRecommend(req, res) {
    const { id } = req.params
    const post = await Post.findOne({ where: { id: id } })
    if (post) {
      post.recommended = !post.recommended
      await post.save()
    }
    return res.json(post)
  }

  async deleteOne(req, res) {
    const id = req.params.id
    await Comment.destroy({
      where: { postId: id },
    })
    await Post.destroy({ where: { id: id } })
    return res.json(id)
  }
}

module.exports = new PostController()
