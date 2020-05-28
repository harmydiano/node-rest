var jwt = require('jsonwebtoken');
module.exports = (app) =>{
    const config = app.libs.config

    const enocodeData = (user) => {
        token = jwt.sign({userId:user}, config.secret, {
            expiresIn: '3650d'
        })
        return token
    }
    return enocodeData
}
