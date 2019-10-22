const mongoose = require('./connection.js')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: { 
    type: Boolean,
  }
})

const PersonSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  description: String
})



const SchedSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  dateScheduled: { 
    type: Date,
    required: true,
  },
  scheduledBy: mongoose.ObjectId,
  scheduledTo: mongoose.ObjectId,
})

const UserCollection = mongoose.model('Users', UserSchema)
const PersonCollection = mongoose.model('Person', PersonSchema)
const ScheduleCollection = mongoose.model('Schedule', SchedSchema)

const admin = {
  username: 'admin',
  password: 'admin',
  email: 'admin@gmail.com',
  isAdmin: true
}

UserCollection.create(admin)

//user model functions
const getAllUsers = () => {
  return UserCollection.find()
}

const getSpecificUser = (username) => {
  return UserCollection.find({username: username})
}

const getUser = (id) => {
  return UserCollection.findById({_id: id})
}

const addNewUser = (newUser) => {
  // if (newUser.username !== UserCollection.find()) {
    return UserCollection.create(newUser)
  // } else {
  //   return 0
  // }
}

const updateUser = (id, updatedUser) => {
  return UserCollection.updateOne({_id: id}, updatedUser)
} 

const deleteUser = (id) => {
  return UserCollection.deleteOne({_id: id})
}

const verifyAuth = (username, password) => {
  return UserCollection.findOne({username: username}).then((currentUser) => {
    if (password === currentUser.password) {
      return currentUser
    }
  })
}

//person model functions
const getAllPersons = () => {
  return PersonCollection.find()
}

const getPerson = (id) => {
  return PersonCollection.findById({_id: id})
}

const addNewPerson = (newPerson) => {
  return PersonCollection.create(newPerson)
}

const updatePerson = (id, updatedPerson) => {
  return PersonCollection.updateOne({_id: id}, updatedPerson)
} 

const deletePerson = (id) => {
  return PersonCollection.deleteOne({_id: id})
}

//schedule model functions
const getAllSchedules = () => {
  return ScheduleCollection.find()
}

const getUserSchedules = (id) => {
  return ScheduleCollection.find({scheduledTo: id})
}

const getSchedule = (id) => {
  return ScheduleCollection.findById({_id: id})
}

const addNewSchedule = (newSchedule) => {
  return ScheduleCollection.create(newSchedule)
}

const updateSchedule = (id, updatedSchedule) => {
  return ScheduleCollection.updateOne({_id: id}, updatedSchedule)
} 

const deleteSchedule = (id) => {
  return ScheduleCollection.deleteOne({_id: id})
}

module.exports = {
  verifyAuth,
  getAllSchedules,
  getUserSchedules,
  getSchedule,
  addNewSchedule,
  updateSchedule,
  deleteSchedule,
  getAllUsers,
  getSpecificUser,
  getUser,
  addNewUser,
  updateUser,
  deleteUser,
  getAllPersons,
  getPerson,
  addNewPerson,
  updatePerson,
  deletePerson
}
