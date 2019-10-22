
const express = require('express')
const jwt = require('jsonwebtoken')

const userTrackerApi = require('../models/usermodel.js')

const userTrackerRouter = express.Router()

userTrackerRouter.get('/', (req,res) => {
  res.render('login')
})



userTrackerRouter.post('/users/create', (req,res) => {
  console.log(req.body)
  userTrackerApi.addNewUser(req.body).then((newuser) => {
    res.redirect('/')
  })
})

userTrackerRouter.get('/dashboard/:id', (req,res) => {
  userTrackerApi.getUserSchedules(req.params.id).then((currentDashboard) => {
    res.render('dashboard', currentDashboard)
  })
})

userTrackerRouter.get('/dashboard/admin/:id', (req,res) => {
  userTrackerApi.getUser(req.params.id).then((currentUser) => {
    console.log(currentUser)
    userTrackerApi.getAllUsers().then((allUsers) => {
      console.log(allUsers)
      res.render('createschedule', {currentUser, allUsers})
    })
  })
})

userTrackerRouter.post('/dashboard', (req, res) => {
  console.log(req.body)
  userTrackerApi.verifyAuth(req.body.username, req.body.password).then((currentUser) => {
    if (req.body.username === 'admin') {
      res.redirect(`/dashboard/admin/${currentUser._id}`)
    } else {
      res.redirect(`/dashboard/${currentUser._id}`)
    }
  })
})


userTrackerRouter.post('/schedule/create', (req,res) => {
  userTrackerApi.addNewSchedule(req.body).then((addNewSchedule) => {
    res.render('')
  })
})



// userTrackerRouter.get('/', (req, res) => {
//   res.render('users')
// })

// userTrackerRouter.get('/login', (req, res) => {
//     res.render('login')
// })

// userTrackerRouter.get('/users', (req, res) => {
//   userTrackerApi.getAllUsers().then((users) => {
//     res.render('users', {users})
//   })
// })

// userTrackerRouter.get('/users/user/:id', (req, res) => {
//   userTrackerApi.getUser(req.params.id).then((user) => {
//     res.render('user', user)
//   })
// })

// userTrackerRouter.get('/users/new', (req, res) => {
//   res.render('createuser')
// })

// userTrackerRouter.get('/users/edit/:id', (req, res) => {
//   userTrackerApi.getUser(req.params.id).then((user) => {
//     res.render('edituser', user)
//   })
// })

// userTrackerRouter.post('/users/create', (req,res) => {
//   userTrackerApi.addNewUser(req.body).then((newuser) => {
//     res.redirect(`/users/user/${newuser._id}`)
//   })
// })

// userTrackerRouter.put('/users/edit/:id', (req,res) => {
//   userTrackerApi.updateUser(req.params.id, req.body).then((updateduser) => {
//     res.redirect(`/users/user/${req.params.id}`)
//   })
// })

// userTrackerRouter.delete('/users/delete/:id', (req,res) =>{
//   userTrackerApi.deleteUser(req.params.id).then((deleteduser) => {
//     res.redirect('/users')  
//   })
// })

module.exports = {
  userTrackerRouter
}
