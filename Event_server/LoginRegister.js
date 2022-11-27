const mongoDb = require('./MongoDB')

const register = (fname, sname, email, dob, pswd, mnumber) => {
    return mongoDb.User.findOne({ "Email": email })
        .then(data => {
            if (data) {
                return {
                    statusCode: 400,
                    status: false,
                    message: 'This email already registered'
                }
            }
            else {
                return mongoDb.Ucode.findOne({ "initialUcode": 1000 })
                    .then(code => {
                        ucode = code.finalUcode
                        const newUser = new mongoDb.User({
                            "User_Code": ucode,
                            "First_Name": fname,
                            "Second_Name": sname,
                            "Email": email,
                            "Data_Of_Birth": dob,
                            "Password": pswd,
                            "Mobile_Number": mnumber
                        })
                        newUser.save()
                        code.finalUcode++
                        code.save()
                        return {
                            statusCode: 200,
                            status: true,
                            ucode,

                        }
                    })


            }
        })
}

const login = (email, pswd) => {
    return mongoDb.User.findOne({ "Email": email, "Password": pswd })
        .then(result => {
            if (result) {
                return {
                    statusCode: 200,
                    status: true,
                    message: 'Loggin successfull',
                    ucode: result.User_Code
                }
            } else {
                return {
                    statusCode: 400,
                    status: false,
                    message: 'Loggin failed. Please check your Email and Password'
                }
            }
        })
}


module.exports = { register, login }