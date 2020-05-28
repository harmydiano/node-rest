module.exports = class ValidationHandler{

    constructor(formField){
        console.log(formField)
        this.formField = formField
        this.fullname = '' || formField.fullName
        this.businesscatname = '' || formField.name
        this.businessName = '' || formField.businessName
        this.gen = '' || formField.gen
        this.phoneNumber = '' || formField.phoneNumber
        this.email = '' || formField.email
        this.location = '' || formField.location
        this.businessCategoryId = '' || formField.businessCategoryId
        this.isSalaryEarner = false || formField.isSalaryEarner
        this.validatedFormFields = {}
        this.errors = {}
    }

    ValidateAllBusinessData() {
        console.log('Validating Business Data', this.fullname, this.businessName)
        if (this.ValidateName(this.fullname, 'fullname') && this.ValidateName(this.businessName, 'businessname') && this.ValidateGender() ){
            if (this.ValidateNumber('phoneNumber') && this.ValidateEmail() || this.ValidateNumber('phoneNumber') || this.ValidateEmail()){

                this.validatedFormFields.location = this.location
                this.validatedFormFields.businessCategoryId = this.businessCategoryId

                return true
            }
            else{
                console.log("error: ",this.errors)
                return false
            }
        }
        else{
            console.log("error: ",this.errors)
            return false
        }
    }

    async ValidateAllUserData() {
        if (this.ValidateName(this.fullname, 'fullname') && this.ValidateGender()){
            if (this.ValidateNumber('phoneNumber') && this.ValidateEmail() || this.ValidateNumber('phoneNumber') || this.ValidateEmail()){

                this.validatedFormFields.isSalaryEarner = this.isSalaryEarner

                return true
            }
            else{
                console.log("error: ",this.errors)
                return false
            }
        }
        else{
            console.log("error: ",this.errors)
            return false
        }
    }

    ValidateNumber(type){
        var phoneNumber = String(this.phoneNumber)
        console.log(type)

        switch(type){
            case 'phoneNumber':
                if (phoneNumber !== ''){
                    console.log(phoneNumber.length, !isNaN(parseInt(phoneNumber)))
                    if (phoneNumber.length == 11 && !isNaN(parseInt(phoneNumber))){
                        this.validatedFormFields.phoneNumber = phoneNumber
                        return true
                    }
                    else{
                        this.errors.message = 'Error: Please supply a valid phoneNumber'
                            return false
                    }
                }
                else{
                    this.errors.message = 'Error: phoneNumber field cannot be empty'
                        return false
                }
                
        }
        
    }

    ValidateEmail() {
        if (this.email !== ''){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(String(this.email).toLowerCase())){
                this.validatedFormFields.email = this.email
                return true
            }
            else{
                this.errors.message = 'Error: Please supply a valid email'
                    return false
            }
        }
        else{
            this.errors.message = 'Error: Email field cannot be empty'
                return false
        }
        
    }

    ValidateGender() {
        let gen = String(this.gen)
        console.log(gen)
        if (gen !== '' && gen.length == 1){
            gen = gen.trim()
            this.validatedFormFields.gender = gen
            return true
        }
        else{
            return false
        }
    }

    ValidateName(name, type) {
        console.log('validating name', name)
        if (name !== '' ){
            name = name.trim()
            switch (type){
                case 'fullname':
                    this.validatedFormFields.fullName = name
                case 'businessname':
                    this.validatedFormFields.businessName = name
                case 'businesscat':
                    this.validatedFormFields.bcatname = name
            }
            return true
        }
        else if(typeof name === 'string'){
            this.errors.message = `Error: ${type} must be a string`
            return false
        }
        else{
            this.errors.message = `Error: ${type} cannot be empty`
            return false
        }

    }


}