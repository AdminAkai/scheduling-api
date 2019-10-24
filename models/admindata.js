const User = require("./usermodel.js")

const admin = {
    username: 'admin',
    password: 'admin',
    email: 'admin@gmail.com',
    isAdmin: true
}

// User.deleteMany()
//   .then(() => {
    User.create(admin)
// })