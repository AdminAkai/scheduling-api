
const express = require('express')
const userTrackerApi = require('../models/usermodel.js')

const userTrackerRouter = express.Router()

userTrackerRouter.get('/', (req,res) => {
  res.render('login')
})

// create user
userTrackerRouter.post('/users/create', (req,res) => {
  console.log(req.body)
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

userTrackerRouter.delete('/users/delete/:id', (req,res) => {
  userTrackerApi.deleteUser(req.params.id).then((deleteduser) => {
    res.redirect('/')  
  })
})

// user authentication
userTrackerRouter.post('/dashboard', (req, res) => {
  userTrackerApi.verifyAuth(req.body.username, req.body.password).then((currentUser) => {
    res.redirect(`/dashboard/${currentUser._id}`)
  })
})

// display dashboard depending on user
userTrackerRouter.get('/dashboard/:id', (req,res) => {
  userTrackerApi.getAllSchedules().then((allSchedules) => {
    userTrackerApi.getUserSchedules(req.params.id).then((currentDashboard) => {
      userTrackerApi.getUser(req.params.id).then((currentUser) => {
        console.log(`\nthese are current schedules: ${allSchedules}\n`)
        console.log(`\nthis is the current dashboard: ${currentDashboard}\n`)
        console.log(`\nthis is the current user: ${currentUser}\n`)
        if (currentUser.isAdmin) {
          res.render('allSchedules', {allSchedules, currentUser})
        } else {
          res.render('dashboard', {currentDashboard, currentUser})
        }
      })
    })
  })
})

// create schedule screen
userTrackerRouter.get('/dashboard/create/:id', (req,res) => {
  userTrackerApi.getUser(req.params.id).then((currentUser) => {
    userTrackerApi.getAllUsers().then((allUsers) => {
      userTrackerApi.getAllJobs().then((allJobs) => {
        console.log(`\nthis is the current user for create sched: ${currentUser}\n`)
        console.log(`\nthese are all users for create sched: ${allUsers}\n`)
        res.render('createschedule', {currentUser, allUsers, allJobs})
      })
    })
  })
})

// create schedule
userTrackerRouter.post('/schedule/create', (req,res) => {
  userTrackerApi.addNewSchedule(req.body).then((newSchedule) => {
    userTrackerApi.getAdmin(true).then((currentUser) => {
      res.render('schedule', {newSchedule, currentUser})
    })
  })
})

// delete schedule
userTrackerRouter.delete('/schedule/delete/:id', (req,res) => {
  userTrackerApi.deleteSchedule(req.params.id).then((deletedSchedule) => {
      userTrackerApi.getAdmin(true).then((currentUser) => {
        console.log(`\nrequest parameters for delete: ${req.params.id}\n`)
        console.log(`\nschedule that was deleted: ${deletedSchedule}\n`)
        console.log(`\ncurrent user that did deletion: ${currentUser}\n`)
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
      console.log(`\nthis is the current user for create sched: ${currentUser}\n`)
      console.log(`\nthese are all users for create sched: ${allUsers}\n`)
      res.render('createjob', {currentUser, allUsers})
    })
  })
})

// create job
userTrackerRouter.post('/job/create', (req,res) => {
  userTrackerApi.addNewJob(req.body).then((newJob) => {
    userTrackerApi.getAdmin(true).then((currentUser) => {
      res.render('job', {newJob, currentUser})
    })
  })
})

module.exports = {
  userTrackerRouter
}
