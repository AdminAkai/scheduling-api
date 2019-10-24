
const express = require('express')
const userTrackerApi = require('../models/usermodel.js')

const userTrackerRouter = express.Router()

// login
userTrackerRouter.get('/', (req,res) => {
  res.render('login')
})


// user authentication
userTrackerRouter.post('/dashboard', (req, res) => {
  userTrackerApi.verifyAuth(req.body.username, req.body.password).then((currentUser) => {
    User = currentUser
    res.redirect(`/dashboard/${User._id}`)
  }).catch((err) => {
    console.error(err.message)
  }).then((resolved) => {
    res.redirect('/')
  })
})

// create schedule
userTrackerRouter.post('/schedule/create/:userid', (req,res) => {
  userTrackerApi.addNewSchedule(req.body).then((newSchedule) => {
    userTrackerApi.getUser(req.params.userid).then((currentUser) => {
      userTrackerApi.getUser(newSchedule.scheduledTo).then((scheduledUser) => {
        res.render('schedule', {newSchedule, currentUser, scheduledUser})
      })
    })
  })
})

// display dashboard depending on user
userTrackerRouter.get('/dashboard/:id', (req,res) => {
  userTrackerApi.getAllSchedules().then((allSchedules) => {
    userTrackerApi.getUserSchedules(req.params.id).then((currentDashboard) => {
      userTrackerApi.getUser(req.params.id).then((currentUser) => {
        if (currentUser.isAdmin) {
          res.render('allSchedules', {allSchedules, currentUser})
        } else {
          res.render('dashboard', {currentDashboard, currentUser})
        }
      })
    })
  })
})

// create user
userTrackerRouter.post('/users/create', (req,res) => {
  userTrackerApi.addNewUser(req.body).then((newuser) => {
    res.redirect('/')
  })
})

// edit user screen
userTrackerRouter.get('/users/edit/:id', (req, res) => {
  userTrackerApi.getUser(req.params.id).then((user) => {
    res.render('edituser', user)
  })
})

// edit user
userTrackerRouter.put('/users/edit/:id', (req,res) => {
  userTrackerApi.updateUser(req.params.id, req.body).then((updateduser) => {
    res.redirect(`/dashboard/${req.params.id}`)
  })
})

// delete user
userTrackerRouter.delete('/users/delete/:id', (req,res) => {
  userTrackerApi.deleteUser(req.params.id).then((deleteduser) => {
    res.redirect('/')  
  })
})

// display users  
userTrackerRouter.get('/dashboard/view-users/:id', (req,res) => {
  userTrackerApi.getAllUsers().then((allUsers) => {
    userTrackerApi.getUser(req.params.id).then((currentUser) => {
      res.render('allusers', {allUsers, currentUser})
    })
  })
})

// display dashboard depending on users
userTrackerRouter.get('/dashboard/myschedules/:id', (req,res) => {
  userTrackerApi.getAllSchedules().then((allSchedules) => {
    userTrackerApi.getUserSchedules(req.params.id).then((currentDashboard) => {
      userTrackerApi.getUser(req.params.id).then((currentUser) => {
          res.render('dashboard', {currentDashboard, currentUser})
      })
    })
  })
})

// create schedule screen
userTrackerRouter.get('/dashboard/create/:userid', (req,res) => {
  userTrackerApi.getUser(req.params.userid).then((currentUser) => {
    userTrackerApi.getAllUsers().then((allUsers) => {
      userTrackerApi.getAllJobs().then((allJobs) => {
        res.render('createschedule', {currentUser, allUsers, allJobs})
      })
    })
  })
})

// edit schedule screen
userTrackerRouter.get('/schedule/edit/:userid/:id', (req, res) => {
  userTrackerApi.getSchedule(req.params.id).then((schedule) => {
    userTrackerApi.getAllUsers().then((allUsers) => {
      userTrackerApi.getUser(req.params.userid).then((currentUser) => {
        res.render('editschedule', {schedule, allUsers, currentUser})
      })
    })
  })
})

// edit schedule
userTrackerRouter.put('/schedule/edit/:userid/:id', (req,res) => {
  userTrackerApi.updateSchedule(req.params.id, req.body).then((updateSchedule) => {
    userTrackerApi.getUser(req.params.userid).then((currentUser) => {
      res.redirect(`/dashboard/${req.params.userid}`)
    })
  })
})

// delete schedule
userTrackerRouter.delete('/schedule/delete/:userid/:id', (req,res) => {
  userTrackerApi.deleteSchedule(req.params.id).then((deletedSchedule) => {
      userTrackerApi.getUser(req.params.userid).then((currentUser) => {
        res.redirect(`/dashboard/${currentUser._id}`)
      })
  })
})

// display jobs  
userTrackerRouter.get('/dashboard/view-jobs/:id', (req,res) => {
  userTrackerApi.getAllJobs().then((allJobs) => {
    userTrackerApi.getUser(req.params.id).then((currentUser) => {
      res.render('alljobs', {allJobs, currentUser})
    })
  })
})

// create job screen
userTrackerRouter.get('/dashboard/create-job/:id', (req,res) => {
  userTrackerApi.getUser(req.params.id).then((currentUser) => {
    userTrackerApi.getAllUsers().then((allUsers) => {
      res.render('createjob', {currentUser, allUsers})
    })
  })
})

// create job
userTrackerRouter.post('/job/create/:userid', (req,res) => {
  userTrackerApi.addNewJob(req.body).then((newJob) => {
    userTrackerApi.getUser(req.params.userid).then((currentUser) => {
      res.render('job', {newJob, currentUser})
    })
  })
})

// edit job screen
userTrackerRouter.get('/job/edit/:userid/:id', (req, res) => {
  userTrackerApi.getJob(req.params.id).then((job) => {
    userTrackerApi.getUser(req.params.userid).then((currentUser) => {
      res.render('editjob', {job, currentUser})
    })
  })
})

// edit job
userTrackerRouter.put('/job/:userid/:id', (req,res) => {
  userTrackerApi.updateJob(req.params.id, req.body).then((updatejob) => {
    userTrackerApi.getUser(req.params.userid).then((currentUser) => {
      res.redirect(`/dashboard/view-jobs/${currentUser._id}`)
    })
  })
})

// delete job
userTrackerRouter.delete('/job/delete/:userid/:id', (req,res) => {
  userTrackerApi.deleteJob(req.params.id).then((deletedJob) => {
    userTrackerApi.getUser(req.params.userid).then((currentUser) => {
      res.redirect(`/dashboard/view-jobs/${currentUser._id}`)  
    })
  })
})

module.exports = {
  userTrackerRouter
}
