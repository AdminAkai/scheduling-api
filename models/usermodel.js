const mongoose = require('./connection.js')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: { 
    type: Boolean,
    required: true,
  }
})

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
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
  scheduledBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }, 
  scheduledTo: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
})

const UserCollection = mongoose.model('Users', UserSchema)
const PersonCollection = mongoose.model('Person', PersonSchema)
const ScheduleCollection = mongoose.model('Schedule', SchedSchema)

//user model functions
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
  getAllSchedules,
  getSchedule,
  addNewSchedule,
  updateSchedule,
  deleteSchedule,
  getAllUsers,
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
