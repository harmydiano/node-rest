
const uuid = require("uuid");
const uid = uuid.v4();


const generateOTP =  (type) => { 
    const valueLength = type == 'otp' ? 4 : 8
    // Declare a digits variable  
    // which stores all digits 
    var digits = uid
    let OTP = ''; 
    let char = ''
    for (let i = 0; i < digits.length; i++ ) {
        if (OTP.length == valueLength) break
        char = digits[Math.floor(Math.random() * 10)];
        if (char !== '-'){
            OTP += char
        } 
    
    } 
    return OTP.toUpperCase(); 
}

module.exports = generateOTP

