var jwt = require('jsonwebtoken');

module.exports = (app)=>{
    const User = app.models.user

    const config = app.libs.config

    const dbValidate = require('../../libs/validator/dbValidator')

    const userSchema = require('../../libs/validator/user/index')

    const otp = require('../../libs/otp')(app)

    const enocodeData = require('../../libs/encode')(app)


    const Create = async (req, res) =>{
        let {body} = req
      
        //set the database model dbvalidate(modelName)
        dbValidate.setModelName(User)

        console.log("Validating input details for creating a new user: " + JSON.stringify(body));
         const { value, error } = userSchema.validate(body); //this return error and value
         const valid = error == null;

         if(valid){
             console.log("Validation Passed")
            //check if email && phone exist
            console.log("Verifying if User details already exists.......")
            if (!(await dbValidate.FindPhone(body.phoneNumber) )){
                console.log("User not found, proceed to register")
                //save to database
                console.log("Saving details to database with details: " +JSON.stringify(body))
                const user = await new User(body)
                user.save()
                .then(resp => {
                    console.log("User Successfully Created with details: " +JSON.stringify(resp))
                    res.json({status:true, message:"User Successfully Created"})
                })
                .catch(error => {
                    console.log("Registration failed error: " +error)
                    res.status(400).json({status:false, error: 'Registration failed'})
                })

            }
            else {
                console.log("Phone number already exist")
                res.status(400).json({status:false, error:dbValidate.errors})
                dbValidate.errors = {}
            }
         }
         else{
            console.log(`Input validation error, with error message: ${JSON.stringify(error)}`);
            res.status(400).json({status: false, message: error.message });
         }


        
    }

    const Login = async(req, res) =>{
        let {phoneNumber, password} = req.body
        //set the database model dbvalidate(modelName)
        dbValidate.setModelName(User)
        console.log("Verifying if User details already exists.......")
        let data = await User.findOne({phoneNumber})
        if (Boolean(await dbValidate.FindPhone(phoneNumber))){
            console.log("Successfully verified")

            //verify password match
            console.log("Matching user password")
            await data.validatePassword(password)
            .then(async resp =>{
                console.log(resp)
                if (!resp){
                    res.status(400).json({status:false, message:'Password Incorrect'})
                }
                res.status(200).json({status:true, message:"Login Success", token:enocodeData(phoneNumber)})
            })
            .catch(error =>
                {
                    console.log(error)
                    res.status(400).json({status:false, message:'Password Incorrect'})
            })

        }
        else {
             //SEND USER OTP
             console.log("User does not exist")

             console.log("Sending OTP to" + phoneNumber)
             if (Boolean(otp.SendOtp(phoneNumber))){
                console.log("OTP sent to" + phoneNumber)
                res.status(400).json({status:false, message:'OTP Sent'})
             }
             else {
                res.status(400).json({status:false, message:'Cannot send OTP to this region'})
             }
        }
    }
       

    const List = (req, res) =>{
        User.find()
        .then(resp => {
            res.status(200).json({status:true, message:"Success", data:resp})
        })
        .catch(error => res.status(400).json({status:false, error: error.response.data.message}))
       
    }
    

    

    return {Create, Login, List}
}