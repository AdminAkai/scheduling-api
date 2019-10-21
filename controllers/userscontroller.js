
const express = require('express')
const jwt = require('jsonwebtoken')

const userTrackerApi = require('../models/usermodel.js')

const userTrackerRouter = express.Router()

userTrackerRouter.get('/', (req, res) => {
  res.render('users')
})


userTrackerRouter.get('/login', (req, res) => {
    res.render('login')
})

userTrackerRouter.get('/users', (req, res) => {
  userTrackerApi.getAllUsers().then((users) => {
    res.render('users', {users})
  })
})

userTrackerRouter.get('/users/user/:id', (req, res) => {
  userTrackerApi.getUser(req.params.id).then((user) => {
    res.render('user', user)
  })
})

userTrackerRouter.get('/users/new', (req, res) => {
  res.render('createuser')
})

userTrackerRouter.get('/users/edit/:id', (req, res) => {
  userTrackerApi.getUser(req.params.id).then((user) => {
    res.render('edituser', user)
  })
})

userTrackerRouter.post('/users/create', (req,res) => {
  userTrackerApi.addNewUser(req.body).then((newuser) => {
    res.redirect(`/users/user/${newuser._id}`)
  })
})

userTrackerRouter.put('/users/edit/:id', (req,res) => {
  userTrackerApi.updateUser(req.params.id, req.body).then((updateduser) => {
    res.redirect(`/users/user/${req.params.id}`)
  })
})

userTrackerRouter.delete('/users/delete/:id', (req,res) =>{
  userTrackerApi.deleteUser(req.params.id).then((deleteduser) => {
    res.redirect('/users')  
  })
})

module.exports = {
  userTrackerRouter
}
