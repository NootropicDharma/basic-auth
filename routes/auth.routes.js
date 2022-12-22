const router = require("express").Router()


const User = require("../models/User.model")
const mongoose = require("mongoose")

const bcrypt = require("bcryptjs")

const {isLoggedIn, isLoggedOut} = require ("../middleware/route.guard.js")





// SIGN UP 

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


    //verify and make sure the info is complete 

    if(!email || !username|| !passwordHash){
        res.render("auth/signup", {errorMessage: 'Todos los campos deben estar rellenados.'})
        return
    }


    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    if (!regex.test(passwordHash)) {
        res
        .status(500)
        .render("auth/signup", {errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.'})
        return;
    }


    const saltRounds = 10

    const salt = bcrypt.genSaltSync(saltRounds)
    
    const hashPassword = bcrypt.hashSync(passwordHash, salt)


    req.body.passwordHash = hashPassword


    User.create(req.body)
    .then(()=>{
        // res.redirect(`/userProfile/${data.id}`)
        res.redirect("/")
    })
    .catch(err=> {
        if (err instanceof mongoose.Error.ValidationError){
            res.status(500).render("auth/signup",{ errorMessage: err.message})
        }
        else if (err.code === 11000){
            res.status(500).render("auth/signup", {
                errorMessage: "Username and email need to be unique. Either username or email is already being used" 
            })
        

        } else {
            next(err)
        }
    })

})



// LOGIN and creation of session where the user will be added to the object of the session to then be able to use anywhere in the app. we are not even accessing the info from our database but rather from our session which added the user info when we logged in 


router.get("/auth/login", (req, res, next)=>{


    res.render("auth/login")

})




//Middleware example that prevents you from logging in 




const mipaso2 = (req, res, next)=>{
    req.body.accesoAuthorizado = false
    next()
}

const mipaso3 = (req, res, next)=>{
    if(req.body.accesoAuthorizado){
        console.log("you are clear")
        next()
    } else {
        console.log("unathorized user")
        //next() by not adding next the function never goes next to the req, res, of the router.post therefore it will stop
        next()
    } 
}




router.post("/auth/login", mipaso2, mipaso3,  (req, res, next)=>{
    
    
    //verify if the email and password are valid
    const {email, password} = req.body

    
    
    User.findOne({email})
    .then(data=>{
        
        
        if(!data){
            res.render("auth/login", {errorMessage: "User doesn't exist"})
            return
        } else if (bcrypt.compareSync(password, data.passwordHash)) {
           // res.render("users/user-profile", data)
           req.session.currentUser = data;
            res.redirect('/userProfile');

        } else {
            res.render("auth/login", { errorMessage: "incorrect password"})
        }
        
        
  
    })
    .catch(err=>console.log(err))


    


})




//LOGOUT 

router.post("/auth/logout", (req, res, next)=>{
    req.session.destroy( err =>{
        if(err) next (err);
        res.redirect("/");

        
    });
});







module.exports = router