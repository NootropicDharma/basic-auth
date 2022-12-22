const router = require("express").Router()

const User = require("../models/User.model")

const {isLoggedIn, isLoggedOut} = require("../middleware/route.guard")

// router.get("/userProfile/:id", (req, res, next)=>{

//     const {id} = req.params

//     User.findById(id)
//     .then(user=>{
//         res.render("users/user-profile", user)

//     })
//     .catch(err=>console.log(err))
// })





router.get("/userProfile", isLoggedIn, (req, res, next)=>{


    res.render('users/user-profile', { userInSession: req.session.currentUser });



})





























module.exports = router