module.exports = (app) =>{
    const User = app.controllers.users.index
    const UserOtp = require('../libs/otp')(app)

    app.get('/',  (req, res) =>{
        res.status(200).send("Node Test API Gateway")
    })

    //verify bvn and authentication
    app.post('/api/auth/user/signup', User.Create)
    app.post('/api/auth/user/signin', User.Login)
    app.get('/api/auth/user', User.List)

    //validate otp 
    app.post('/api/user/otp/validate/:mobile/:otp', UserOtp.ValidateOtp)


   
}

