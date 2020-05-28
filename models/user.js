module.exports = (app) => {
    const db = app.libs.db
    const bcrypt = require("bcrypt")

    //create db instance of mongoose

    const UserSchema = new db.Schema({
        fullName : {
            type: String,
            trim: true
        },
        password: {
            type: String,
            trim: true
        },
        phoneNumber: {
            type: String,
            trim: true
        }
    },
    {
        timestamps :true
    })

    UserSchema.pre('save', async function save(next){
        var user = this

        // only hash the password if it has been modified (or is new)
        if (user.isModified('password')) {
            try {
                const hash = await bcrypt.hash(user.password, 10);
                user.password = hash;
                next();
                }
            catch (err) {
                return next(err)
            }

        }
       
        else return next()
            
    })

    UserSchema.methods.validatePassword = async function validatePassword(data) {
        console.log(data, this.password)
        return await bcrypt.compare(data, this.password);
      };
    

    const User = db.model('User', UserSchema)
    return User
}