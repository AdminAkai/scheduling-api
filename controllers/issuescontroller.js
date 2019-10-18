
const express = require('express')

const issueTrackerApi = require('../models/issuemodel.js')

const issueTrackerRouter = express.Router()

issueTrackerRouter.get('/issues', (req, res) => {
  issueTrackerApi.getAllIssues().then((issues) => {
    res.render('issues', {issues})
  })
})

issueTrackerRouter.get('/issues/issue/:id', (req, res) => {
  issueTrackerApi.getIssue(req.params.id).then((issue) => {
    res.render('issue', issue)
  })
})

issueTrackerRouter.get('/issues/new', (req, res) => {
  res.render('createissue')
})

issueTrackerRouter.get('/issues/edit/:id', (req, res) => {
  issueTrackerApi.getIssue(req.params.id).then((issue) => {
    res.render('editissue', issue)
  })
})

issueTrackerRouter.post('/issues/create', (req,res) => {
  issueTrackerApi.addNewIssue(req.body).then((newIssue) => {
    res.redirect(`/issues/issue/${newIssue._id}`)
  })
})

issueTrackerRouter.put('/issues/edit/:id', (req,res) => {
  issueTrackerApi.updateIssue(req.params.id, req.body).then((updatedIssue) => {
    res.redirect(`/issues/issue/${req.params.id}`)
  })
})

issueTrackerRouter.delete('/issues/delete/:id', (req,res) =>{
  issueTrackerApi.deleteIssue(req.params.id).then((deletedIssue) => {
    res.redirect('/issues')  
  })
})

module.exports = {
  issueTrackerRouter
}
