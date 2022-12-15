const router = require("express").Router()

const User = require("../models/User.model")

const bcrypt = require("bcryptjs")


router.get("/auth/signup", (req, res, next)=>{

    res.render("auth/signup")

})


//we will receive info in req.body
//obtain password that is in req.body.passwordHash it will ALWAYS BE in req.body
// do the whole bcrypt 
// salt rounds 
//and hash     has and req.body.passwordHash
//modify req.body.passwordHash with the generated hash 
// save the req.body into our model USER and respectively into our database Mongodb







router.post("/auth/signup", (req, res, next)=>{

    
    const {username, email, passwordHash} = req.body

    const saltRounds = 10

    const salt = bcrypt.genSaltSync(saltRounds)
    
    const hashPassword = bcrypt.hashSync(passwordHash, salt)


    req.body.passwordHash = hashPassword


    


    User.create(req.body)
    .then(data=>{
        res.redirect(`/userProfile/${data.id}`)
    })
    .catch(err=>{console.log(err)})

})




















module.exports = router