//Mongodb connection with nodejs

//1 Connection library - mongoose -npm i mongoose

//import mongoose

const mongoose = require('mongoose')


//2 Define connection between mongoose and node
mongoose.connect('mongodb://localhost:27017/Clinic')

//3 Create a model and schema for storing data
const User = mongoose.model('User', {

    PatientName: String,
    Age: Number,
    BloodGroup: String,
    Gender: String,
    Address: String,
    MobileNumber: Number,
    EmailAddress: String,
    Appointments: [],
    Rejections: []
})
// schema for doctor details

const Doctordetail = mongoose.model('Doctordetail', {

    DoctorName: String,
    Department: String,
    Education: String,
    Image: String



})

// Schema for admin login 

const Admin= mongoose.model('Admin',{
    EmailAddress: String,
    Password: String
})

//appointment storing
const appointment=mongoose.model('appointment',{
    MobileNumber:String,
    Name:String,
    Email:String,
    scheduleTime:String,
    scheduleDate:String,
    MobileNumberOfBystander:String,
    Doctor:String
})
module.exports = {
    User,
    Doctordetail,
    Admin,
    appointment
}