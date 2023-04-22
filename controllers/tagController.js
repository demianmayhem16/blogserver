const ApiError = require("../error/ApiError")
const db = require("../db")
const { Tag } = require("../models/models")

class TagController {
  async create(req, res, next) {
    try {
      let { user, name } = req.body
      const tagsWithNameMatch = await Tag.findAndCountAll({
        where: { userId: user.id, name: name },
      })

      if (tagsWithNameMatch.count) {
        throw new Error("tag names should be unique!")
      }
      const tag = await Tag.create({
        userId: user.id,
        name: name,
        isVisible: false,
      })
      return res.json(tag)
    } catch (e) {
      return res.json(e.message)
    }
  }

  async getAll(req, res) {
    const { user } = req.body
    const tags = await Tag.findAndCountAll({ where: { userId: user.id } })
    return res.json(tags)
  }

  async deleteOne(req, res) {
    const id = req.params.id
    const deletedTag = await Tag.destroy({ where: { id: id } })
    return res.json(id)
  }

  async makeVisible(req, res) {
    const { id } = req.params
    const tag = await Tag.findOne({ where: { id: id } })
    if (tag) {
      tag.isVisible = !tag.isVisible
      await tag.save()
    }
    return res.json(tag)
  }
}

module.exports = new TagController()
