module.exports = (app)=> {
    const dotenv = require('dotenv');
    dotenv.config();


    const redis = require('redis');
    const generateOTP = require('./generator/index')
    
    const redisPort = process.env.REDIS_PORT
    const redisHost = process.env.REDIS_HOST
    console.log('residhost' +redisHost)

    const redisClient = redis.createClient({port:redisPort, host:redisHost});

    const twilloClient = require('twilio')(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );

    redisClient.multi()
    .keys('*', function (err, replies) {
        // NOTE: code in this callback is NOT atomic
        // this only happens after the the .exec call finishes.

        console.log("MULTI got " + replies.length + " replies");

        replies.forEach(function (reply, index) {
            console.log("Reply " + index + ": " + reply.toString());
            redisClient.get(reply, function(err, data){
                    console.log(data);
            });
        });

    })
    .exec(function (err, replies) {});
    
    const User = app.models.user


    const SendOtp = (mobile) => {
        const uid = generateOTP('otp');
        let sender = process.env.TWILIO_PHONE_NUMBER
        let recipent = mobile
        let message = `Your OTP code is: ${uid}`

        //store userId to redis
        redisClient.setex(String(mobile), 3600, uid)
        //send mail

        let data = twilloClient.messages.create({from: sender, to: recipent,body: message})
        console.log(data)
        if(Boolean(data)){
            return true
        }
        else{
            return false
        }
    }

    const ValidateOtp = (req, res)=> {
        let mobile = req.params.mobile
        let otp = req.params.otp
        console.log("Validating inputs" + JSON.stringify(req.params))
        if (Boolean(mobile) && Boolean(otp)){
            console.log("Checking if OTP exists")
            redisClient.get(String(mobile), async ( error,result) =>{
                console.log(error)
                if (error == 'null') res.status(400).json({status:false, message:"Token Expired"})
                if (result == otp){
                    console.log("OTP validation OK")
                    //client.del(mobile)
                    res.status(200).json({status:true, message: 'OTP validated successfully' });
                }else{
                    console.log("OTP validation Failed")
                    console.log(result, otp)
                    res.status(400).json({status:false, message:"Token match failed"})
                }
            } )
        }
        else {
            res.status(400).json({status:false, error: "Please supply a valid id / otp"})
        }
    }
    return {SendOtp, ValidateOtp}
}