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

const JobSchema = new mongoose.Schema({
  job: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  }
})



const SchedSchema = new mongoose.Schema({
  job: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateScheduled: { 
    type: Date,
    required: true,
  },
  scheduledBy: mongoose.Types.ObjectId,
  scheduledTo: mongoose.Types.ObjectId,
})

const UserCollection = mongoose.model('Users', UserSchema)
const JobCollection = mongoose.model('Job', JobSchema)
const ScheduleCollection = mongoose.model('Schedule', SchedSchema)

//user model functions
const getAllUsers = () => {
  return UserCollection.find()
}

const getAdmin = (admin) => {
  return UserCollection.findOne({isAdmin: admin})
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

//Job model functions
const getAllJobs = () => {
  return JobCollection.find()
}

const getJob = (id) => {
  return JobCollection.findById({_id: id})
}

const addNewJob = (newJob) => {
  return JobCollection.create(newJob)
}

const updateJob = (id, updatedJob) => {
  return JobCollection.updateOne({_id: id}, updatedJob)
} 

const deleteJob = (id) => {
  return JobCollection.deleteOne({_id: id})
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
  getAdmin,
  getUser,
  addNewUser,
  updateUser,
  deleteUser,
  getAllJobs,
  getJob,
  addNewJob,
  updateJob,
  deleteJob
}
