// Backend for Clinic App

// Create server application using express

//1 import express

const express = require('express');

//4 import cors

const cors = require('cors');

// import logic
const logic = require('./services/logic')

//2 Create serverb application

const server = express()

//5 Use cors

server.use(cors({
    origin: 'http://localhost:4200'
}))
 //6  pass to json format
server.use(express.json())

//3Setup port for server application

server.listen(5000, () => {
    console.log('Server listening on port 5000');
})
 
//API call to resolve
server.get('/',(req,res)=>{
    res.send('Welcome to backend')
})
server.post('/',(req,res)=>{
    console.log('server post');
})

// API CALLS


//Register
server.post('/patientregister', (req, res) => {
    console.log('Inside register API CALL');
    console.log(req.body);
    //logic resolve register request
    logic.register(req.body.PatientName, req.body.Age, req.body.BloodGroup, req.body.Gender, req.body.Address,req.body.MobileNumber, req.body.EmailAddress).then((response) => {
      res.status(response.statusCode).json(response)
    })
  
  
  })
  //Login
server.post('/patient/patientlogin', (req, res) => {
    console.log("Inside Login Api Call");
    console.log(req.body);
    //logic resolve login request
    logic.login(req.body.PatientName, req.body.MobileNumber).then((response) => {
      res.status(response.statusCode).json(response)
    })
  })



  //adminlogin-localhost:5000/adminlogin

server.post('/admin/adminlogin',(req,res)=>{
    console.log('inside login Api call');
    console.log(req.body);
  
    //get email,pswd
    logic.admins(req.body.EmailAddress,req.body.Password).then((response)=>{
        //send result to client 
  res.status(response.statusCode).json(response)
  })
  })

//getting patient details
server.get('/home/patientprofile/:mobile',(req,res)=>{
  logic.getDetails(req.params.mobile).then((response)=>{
    res.status(response.statusCode).json(response)
  })
})



// To fetch details

server.get('/home/finddoctor',(req,res)=>{
  console.log('Inside api call to details')
  logic.viewDoctorDetails().then((response)=>{
    res.status(response.statusCode).json(response)
  })
})

// To store data in appointments

server.post('/home/appointments/:mobile', (req,res)=>{
  logic.AppointmentRequest(req.params.mobile,req.body.Name,req.body.Email,req.body.scheduleTime,req.body.scheduleDate,req.body.MobileNumber,req.body.Doctor).then((response)=>{
    res.status(response.statusCode).json(response)

  })
})


//request
server.get('/admin/getAppointments',(req,res)=>{
  logic.getAppointmentRequest().then((response)=>{
    res.status(response.statusCode).json(response)

  })
})

//confirming appointment
server.post('/admin/confirmappointment/:mobile',(req,res)=>{
  logic.storeAppointments(req.params.mobile,req.body.Name,req.body.Email,req.body.scheduleTime,req.body.scheduleDate,req.body.MobileNumber,req.body.Doctor).then((response)=>{
    res.status(response.statusCode).json(response)
  })
})

//Rejecting appointment
server.post('/admin/rejectappointment/:mobile',(req,res)=>{
  logic.rejectAppointments(req.params.mobile,req.body.Name,req.body.Email,req.body.scheduleTime,req.body.scheduleDate,req.body.MobileNumber,req.body.Doctor).then((response)=>{
    res.status(response.statusCode).json(response)
  })
})

//deleting user
server.delete('/user/deleteuser/:mobile',(req,res)=>{
  logic.deleteUser(req.params.mobile).then((response)=>{
    res.status(response.statusCode).json(response)
  })
})


//edit a particular user data fetching

server.get('/login/edit/:MobileNumber',(req,res)=>{
  console.log('Inside API call to View particular user data');
  logic.viewParticularUser(req.params.MobileNumber).then((response)=>{
      res.status(response.statusCode).json(response)
  })
})


//edit a user
server.put('/userEditbutton/:MobileNumber',(req,res)=>{
  console.log('edit a particular details');
  logic.editUser(req.body.PatientName,req.body.Age,req.body.BloodGroup,req.body.Gender, req.body.Address,req.params.MobileNumber, req.body.EmailAddress).then((response)=>{
      res.status(response.statusCode).json(response)
 })
})




