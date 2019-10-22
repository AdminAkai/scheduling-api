
const express = require('express')
const userTrackerApi = require('../models/usermodel.js')

const userTrackerRouter = express.Router()

userTrackerRouter.get('/', (req,res) => {
  res.render('login')
})

userTrackerRouter.post('/dashboard', (req, res) => {
  userTrackerApi.verifyAuth(req.body.username, req.body.password).then((currentUser) => {
    // if (req.body.username === 'admin') {
    //   res.redirect(`/dashboard/admin/${currentUser._id}`)
    // } else {
      res.redirect(`/dashboard/${currentUser._id}`)
    // }
  })
})

userTrackerRouter.get('/dashboard/:id', (req,res) => {
  userTrackerApi.getUserSchedules(req.params.id).then((currentDashboard) => {
    userTrackerApi.getAllSchedules().then((allSchedules) => {
      userTrackerApi.getUser(req.params.id).then((currentUser) => {
        if (currentUser.username === 'admin') {
          res.render('allSchedules', {allSchedules, currentUser})
        }
        res.render('dashboard', currentDashboard)
      })
    })
  })
})

userTrackerRouter.get('/dashboard/admin/create-schedule/:id', (req,res) => {
  userTrackerApi.getUser(req.params.id).then((currentUser) => {
    console.log(currentUser)
    userTrackerApi.getAllUsers().then((allUsers) => {
      console.log(allUsers)
      res.render('createschedule', {currentUser, allUsers})
    })
  })
})

userTrackerRouter.post('/schedule/create', (req,res) => {
  userTrackerApi.addNewSchedule(req.body).then((newSchedule) => {
    res.render('schedule', newSchedule)
  })
})

// userTrackerRouter.post('/users/create', (req,res) => {
//   console.log(req.body)
//   userTrackerApi.addNewUser(req.body).then((newuser) => {
//     res.redirect('/')
//   })
// })

// userTrackerRouter.get('/dashboard/:id', (req,res) => {
//   userTrackerApi.getUserSchedules(req.params.id).then((currentDashboard) => {
//     console.log(currentDashboard)
//     res.render('dashboard', currentDashboard)
//   })
// })

// userTrackerRouter.get('/dashboard/admin/:id', (req,res) => {
//   userTrackerApi.getAllSchedules().then((currentDashboard) => {
//     userTrackerApi.getUser(req.params.id).then((currentUser) => {
//       res.render('allSchedules', {currentDashboard, currentUser})
//     })
//   })
// })

// userTrackerRouter.get('/dashboard/admin/create-schedule/:id', (req,res) => {
//   userTrackerApi.getUser(req.params.id).then((currentUser) => {
//     console.log(currentUser)
//     userTrackerApi.getAllUsers().then((allUsers) => {
//       console.log(allUsers)
//       res.render('createschedule', {currentUser, allUsers})
//     })
//   })
// })

// userTrackerRouter.get('/dashboard/admin/single-schedule/:id', (req,res) => {
//   userTrackerApi.getUser(req.params.id).then((currentUser) => {
//     console.log(currentUser)
//     userTrackerApi.getAllUsers().then((allUsers) => {
//       console.log(allUsers)
//       res.render('createschedule', {currentUser, allUsers})
//     })
//   })
// })

// userTrackerRouter.post('/dashboard', (req, res) => {
//   console.log(req.body)
//   userTrackerApi.verifyAuth(req.body.username, req.body.password).then((currentUser) => {
//     if (req.body.username === 'admin') {
//       res.redirect(`/dashboard/admin/${currentUser._id}`)
//     } else {
//       res.redirect(`/dashboard/${currentUser._id}`)
//     }
//   })
// })


// userTrackerRouter.post('/schedule/create', (req,res) => {
//   userTrackerApi.addNewSchedule(req.body).then((newSchedule) => {
//     res.render('schedule', newSchedule)
//   })
// })

// userTrackerRouter.get('/users/edit/:id', (req, res) => {
//   userTrackerApi.getUser(req.params.id).then((user) => {
//     res.render('edituser', user)
//   })
// })

// userTrackerRouter.put('/users/edit/:id', (req,res) => {
//   userTrackerApi.updateUser(req.params.id, req.body).then((updateduser) => {
//     res.redirect(`/users/user/${req.params.id}`)
//   })
// })

// userTrackerRouter.get('/schedule/:id', (req, res) => {
//   userTrackerApi.getSchedule(req.params.id).then((schedule) => {
//     userTrackerApi.getAllUsers().then((allUsers) => {
//       res.render('editschedule', {schedule, allUsers})
//     })
//   })
// })

// userTrackerRouter.put('/schedule/edit/:id', (req,res) => {
//   userTrackerApi.updateSchedule(req.params.id, req.body).then((updatedSchedule) => {
//     userTrackerApi.getSpecificUser('admin').then((admin) => {
//       res.redirect(`/dashboard/admin/${admin._id}`)
//     })
//   })
// })

// userTrackerRouter.delete('/users/delete/:id', (req,res) => {
//   userTrackerApi.deleteUser(req.params.id).then((deleteduser) => {
//     res.redirect('/users')  
//   })
// })

// userTrackerRouter.delete('/schedule/delete/:id', (req,res) => {
//   userTrackerApi.deleteSchedule(req.params.id).then((deletedschedule) => {
//     userTrackerApi.getAllSchedules().then((allSchedules) => {
//       userTrackerApi.getSpecificUser('admin').then((currentUser) => {
//         res.render('allSchedules', {allSchedules, currentUser})
//       })
//     })        
//   })
// })
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
