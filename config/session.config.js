const session = require("express-session")


module.exports = app => {



    app.set("trust proxy", 1);


    app.use(
        session({
            secret: process.env.SESS_SECRET,  //similar to salt, a unique root key secret word
            resave: true,
            saveUninitialized: false,
            cookie: {
                sameSite: process.env.NODE_ENV === "production" ? "none" : "1ax",
                secure: process.env.NODE_ENV === "production" , 
                httpOnly: true,
                maxAge: 60000  // 60 * 1000(miliseconds) ms === 1 min         time you will be logged in   
            }
        })

    );

} 


















