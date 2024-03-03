//Access db
const db = require('./db')
const { response } = require('express')


//// Logic for register
const register = (PatientName, Age, BloodGroup, Gender, Address, MobileNumber, EmailAddress) => {

    //Access to db model
    return db.User.findOne({ MobileNumber }).then((response) => {
        console.log(response);
        if (response) {
            return {
                statusCode: 401,
                message: "This Mobile Number is already Registerd"
            }
        } else {
            //set user data
            const newUser = new db.User({
                PatientName,
                Age,
                BloodGroup,
                Gender,
                Address,
                MobileNumber,
                EmailAddress

            })
            //save to mongo inside
            newUser.save()// to store the new user in the database


            //response send back to the client
            return {
                statusCode: 200,
                message: "Registration Successfull"
            }

        }
    })
}

// Logic for login
const login = (PatientName, MobileNumber) => {
    return db.User.findOne({ PatientName, MobileNumber }).then((response) => {
        if (response) {
            //if number and password are presented in db
            return {
                statusCode: 200,
                message: "Login Successful",
                currentUserMobileNumber:response.MobileNumber,
            }
        } else {
            return {
                statusCode: 401,
                message: "Invalid Login"
            }
        }
    })
}

//getting detailsof the user
const getDetails = (MobileNumber) => {
    return db.User.findOne({ MobileNumber }).then((response) => {
        return {
            statusCode: 200,
            message: 'found',
            response

        }
    })
}

//To store data in appointment ARRAY
const storeAppointments = (MobileNumber,Name,Email,scheduleTime,scheduleDate,MobileNumberOfBystander,Doctor) => {
    const body={
        Name,Email,scheduleDate,scheduleTime,MobileNumberOfBystander,Doctor
    }
    return db.User.findOne({ MobileNumber }).then((response) => {
        if (response) {
            response.Appointments.push(body)
            response.save()

           deleteRequest(MobileNumber)

            return {
                statusCode: 200,
                message: 'found',
                response

            }
        }
        else{
            return {
                statusCode: 401,
                message: "This Mobile Number is not found"
            }
        }
    })
}


//To dlete data in appointment ARRAY
const rejectAppointments = (MobileNumber,Name,Email,scheduleTime,scheduleDate,MobileNumberOfBystander,Doctor) => {
    const body={
        Name,Email,scheduleDate,scheduleTime,MobileNumberOfBystander,Doctor
    }
    return db.User.findOne({ MobileNumber }).then((response) => {
        if (response) {
            response.Rejections.push(body)
            response.save()

           deleteRequest(MobileNumber)

            return {
                statusCode: 200,
                message: 'found',
                response

            }
        }
        else{
            return {
                statusCode: 401,
                message: "This Mobile Number is not found"
            }
        }
    })
}

//deleterequests
const deleteRequest=(MobileNumber)=>{
    return db.appointment.deleteOne({MobileNumber}).then((response)=>{
        return{
            statusCode:200,
            messages:'Deleted'
        }        
    })
}


//to fetch doctor details 
const viewDoctorDetails = () => {
    return db.Doctordetail.find().then((response) => {
        console.log(response)
        if (response) {
            return {
                data: response,
                statusCode: 200,
                message: "Data fetched successully"

            }
        } else {
            return {
                statusCode: 401,
                message: 'failed to fetch data'
            }
        }
    })

}

// Logic for admin login
const admins = (EmailAddress,Password) => {
    return db.Admin.findOne({ EmailAddress, Password }).then((response) => {
        if (response) {
            //if mail and password are presented in db
            return {
                statusCode: 200,
                message: "Login Successful",

            }
        } else {
            return {
                statusCode: 401,
                message: "Invalid Login"
            }
        }
    })
}

//appointment request
const AppointmentRequest=(MobileNumber,Name,Email,scheduleTime,scheduleDate,MobileNumberOfBystander,Doctor)=>{

    const body={
        MobileNumber,Name,Email,scheduleTime,scheduleDate,MobileNumberOfBystander,Doctor
    }

    return db.appointment.insertMany(body).then((response)=>{
        return{
            statusCode:200,
            message:'uploaded'
        }
    })
    
}

//getting all details to the admin dashboard
const getAppointmentRequest=()=>{
    return db.appointment.find().then((response)=>{
        return{
            statusCode:200,
            message:'Found',
            response
        }
    })
}

//delete user
const deleteUser=(MobileNumber)=>{
    return db.User.deleteOne({MobileNumber}).then((response)=>{
        deleteRequest(MobileNumber)
        return{
            statusCode:200,
            message:'deleted',
        }
    })
}

//logout user



// edit particular user fetching
const viewParticularUser=(MobileNumber)=>{
    return db.User.findOne({MobileNumber}).then((response)=>{
        console.log(response);
        if(response){
            return{
                data:response,
                statusCode:200,
                message:"Got User Data"
            }
        }
        else{
            return{
                statusCode:401,
                message:"Fail to fetch user data"
            }
        }

    })
}


// //editing user
const editUser = ( PatientName, Age, BloodGroup, Gender, Address, MobileNumber, EmailAddress ) => {
    return db.User.findOne({ MobileNumber }).then((response) => {
      
        response.PatientName = PatientName
        response.Age= Age
        response.BloodGroup = BloodGroup
        response.Gender = Gender
        response.Address = Address
        response. MobileNumber = MobileNumber
        response.EmailAddress= EmailAddress
    //    response.Appointments=Appointments
        response.save()
        
        return {
            response,
            statusCode: 200,
            message: 'Edited'
        }
    })
}




module.exports = {
    register,
    login,
    getDetails,
    storeAppointments,
    rejectAppointments,
    viewDoctorDetails,
    admins,AppointmentRequest,getAppointmentRequest,deleteUser,viewParticularUser,editUser
}

