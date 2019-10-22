
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
    jwt.sign({newuser: newuser}, 'secretkey', (err, token) => {
      // res.redirect('/')
      console.log(newuser)
      console.log(token)
      res.redirect('/')
    })
  })
})

userTrackerRouter.get('/dashboard/:id', (req,res) => {
  userTrackerApi.getUserSchedules(req.params.id).then((currentDashboard) => {
    res.render('currentschedule', currentDashboard)
  })
})

userTrackerRouter.post('/dashboard', (req, res) => {
  console.log(req.body)
  // verifyToken(req.headers).then((token) => {
  //   jwt.verify(token, 'secretkey', (err, authData) => {
  //     if (err) {
  //         res.sendStatus(403)
  //     } else {
  //         res.render('dashboard')
  //     }
  //   })  
  // })
  userTrackerApi.verifyAuth(req.body.username, req.body.password).then((currentUser) => {
    res.redirect(`/dashboard/${currentUser._id}`)
  })
})

//format of token
//authorization: bearer <Access-token>

//Verify token
function verifyToken(req,res,next) {
  // get auth header value
  const bearerHeader = req.headers['authorization']
  // check if bearer is undefined
  if (typeof(bearerHeader) !== 'undefined') {
      // split at the space
      const bearer = bearerHeader.split(' ')
      // get token from array
      const bearerToken = bearer[1]
      // set token
      req.token = bearerToken
      // next middleware
      // next()
      return req.token
  } else {
      // forbidden
      res.sendStatus(403)
  }
}


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
