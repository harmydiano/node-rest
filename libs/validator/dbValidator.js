 class DbValidatorHandler {

    constructor() {
        this.model = null
        this.errors = {}
        this.data = ''

    }

    setModelName(name){
        console.log(name)
        this.model = name
    }

    getModelName(){
        return this.model
    }

    async FindPhone(mobile) {
        const data = await this.getModelName().findOne({ phoneNumber: mobile })
            .catch((e) => {
                console.log(e.message)
            })
        if (data) {
            this.errors.message = 'Error: Phone Number Already Exist'
            this.data = data
            console.log("data found", this.errors.message)
            return true
        }
        else { 
            return false 
        }

    }

}
module.exports = new DbValidatorHandler()
