const mongoose = require('./connection.js')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: { 
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: Boolean
})

const UserCollection = mongoose.model('Users', UserSchema)

const getAllUsers = () => {
  return UserCollection.find()
}

const getUser = (id) => {
  return UserCollection.findById({_id: id})
}

const addNewUser = (newUser) => {
  return UserCollection.create(newUser)
}

const updateUser = (id, updatedUser) => {
  return UserCollection.updateOne({_id: id}, updatedUser)
} 

const deleteUser = (id) => {
  return UserCollection.deleteOne({_id: id})
}

module.exports = {
  getAllUsers,
  getUser,
  addNewUser,
  updateUser,
  deleteUser
}
