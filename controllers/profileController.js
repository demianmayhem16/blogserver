const ApiError = require('../error/ApiError');
const {Profile} = require('../models/models')


class ProfileController {
    async getUserProfile (req, res) {
        const {user} = req.body
        const profile = await Profile.findOne({
            where: { userId: user.id },
          })
        return res.json(profile)
    }

    async patchProfileImg(req, res, next) {
        const {user} = req.body
        const { img } = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, "..", "static", fileName))

        await Profile.update(
            { img: fileName },
            { where: { userId: user.id } }
          )
        const updatedProfile = await Profile.findOne({userId: user.id})
        return res.json(updatedProfile)
    }
}

module.exports = new ProfileController()
