const sequelize = require("../db")
const { DataTypes } = require("sequelize")

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  name: { type: DataTypes.STRING, allowNull: false },
})


const Profile = sequelize.define("profile", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  email: { type: DataTypes.STRING, unique: true },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  name: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: true },
})

const Post = sequelize.define("post", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  recommended: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  preview: { type: DataTypes.STRING, allowNull: false },
  tagId:  { type: DataTypes.STRING, allowNull: false },
})

const Tag = sequelize.define('tag', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false },
  userId: {type: DataTypes.INTEGER, allowNull: false},
  isVisible: { type: DataTypes.BOOLEAN, allowNull: false },
})

const PostTag = sequelize.define('postTag', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  postId: { type: DataTypes.INTEGER, allowNull: false },
  tagId: {type: DataTypes.INTEGER, allowNull: false},
})

const Comment = sequelize.define("comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  body: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: true },
  blogAuthorId: { type: DataTypes.INTEGER },
  postId: { type: DataTypes.INTEGER, allowNull: false },
  userEmail: { type: DataTypes.STRING, allowNull: false },
  isApproved: { type: DataTypes.BOOLEAN, allowNull: false },
})

const Like = sequelize.define("like", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  postId: { type: DataTypes.INTEGER, allowNull: false },
})

User.hasMany(Comment)
Comment.belongsTo(User)

User.hasOne(Profile)
Profile.belongsTo(User)

User.hasMany(Like)
Like.belongsTo(User)

Post.hasMany(Like)
Like.belongsTo(Post)

Post.hasMany(Comment)
Comment.belongsTo(Post)

// Tag.hasMany(Post)
// Post.belongsTo(Tag)

User.hasMany(Tag)
Tag.belongsTo(User)

module.exports = {
  User,
  Post,
  Comment,
  Like,
  Tag,
  Profile,
  PostTag
}
