//////////////////////////////////////////////////////////////////
// Require ///////////////////////////////////////////////////////
const express           = require("express"),
      mongoose          = require("mongoose"),
      bodyParser        = require("body-parser"),
      methodOverride    = require("method-override"),
      Student           = require("./models/Student"),
      DeletedStudent    = require("./models/DeletedStudent"),
      app               = express();
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// DATABASE CONNECTIVITY /////////////////////////////////////////
mongoose.set("strictQuery", true);
mongoose
    .connect("mongodb://127.0.0.1:27017/peak_solution_school")
    .then(()=>{
        let connectionMessage = "\nPeak solution school database connected successfully !".toUpperCase();
        console.log(connectionMessage);
    })
    .catch((err)=>{
        console.log("Error While Connecting To The Database : " + err);
    });
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// APP CONFIGURATION /////////////////////////////////////////////
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("partials"));
app.use(express.static(__dirname + "/public"));


//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// ROUTES ////////////////////////////////////////////////////////
// ROOT ROUTE | show list of top 20 students
app.get("/", function(req, res){
    let routeMessage = "\nRoot route hitted !".toUpperCase();
    console.log(routeMessage);
    res.render("landing");
});


//////////////////////////////////////////////////////////////////
// INDEX ROUTE | Display all students data in a table ////////////
app.get("/students", function(req, res){
    let routeMessage = "\napp.get(\"/students route hitted !".toUpperCase();
    console.log(routeMessage);

    Student.find({}, function(err, allStudents){
        if(err){
            let errorMessage = `\nError while finding all students data :ref => indexRoute app.get /students :  ${err}`;
            console.log(errorMessage);
            res.send(errorMessage);
        }
        else{
            res.render("student", {students: allStudents});
        }
    });
});

//////////////////////////////////////////////////////////////////
// NEW ROUTE | Display student admission for /////////////////////
app.get("/students/new", function(req, res){
    let routeMessage = "\napp.get(\"/students/new route hitted !".toUpperCase();
    console.log(routeMessage);
    res.render("student/new");
});

//////////////////////////////////////////////////////////////////
// CREATE ROUTE | Add student details in db //////////////////////
app.post("/students", function(req, res){
    let routeMessage = "\napp.post(\"/students route hitted !".toUpperCase();
    console.log(routeMessage);
    let newStudent = req.body.student;
    // console.log("I Am New Student : " + newStudent);
    Student.create(newStudent, function(err, addedStudent){
        if(err){
            let errorMessage = "\nError while adding new student : ref => createRoute app.post /students : ".toUpperCase() + err ;
            console.log(errorMessage);
            res.send(errorMessage);
        }
        else{
            console.log("\nNew Student Added Into Database : " + addedStudent);
            res.redirect("/students");
            // res.send("New Student Added !");
        }
    });
    

    // let student = req.body.student;
    // console.log(
    //     `\nDetails Of The Student :
    //     First Name : ${student.firstName}
    //     Last Name : ${student.lastName}
    //     Date Of Birth : ${student.dateOfBirth}
    //     Gender : ${student.gender}
    //     Email : ${student.email}
    //     Phone : ${student.phone}`
    // );

    // console.log(typeof(student.dateOfBirth));
    // console.log(typeof(student.gender));
    // console.log(typeof(student.email));
    // console.log(typeof(student.phone));
});


//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// EDIT ROUTE | Show Edit Form ///////////////////////////////////
app.get("/students/:id/edit", function(req, res){
    let routeMessage = "\napp.get(\"/students/:id/edit route hitted !".toUpperCase();
    console.log(routeMessage);
    Student.findById(req.params.id, function(err, foundStudent){
        if(err){
            let errorMessage = "\nError while finding the student by id : ref => editRoute app.get /students/:id/edit : ".toUpperCase() + err ;
            console.log(errorMessage);
            res.send(errorMessage);
        }
        else{
            console.log("Student Founded : " , foundStudent);
            res.render("student/edit", {student: foundStudent});
        }
    });
});

//////////////////////////////////////////////////////////////////
// UPDATE ROUTE | Update the students data in database ///////////
app.put("/students/:id", function(req, res){
    let routeMessage = "\napp.put(\"/students/:id route hitted !".toUpperCase();
    console.log(routeMessage);

    let student = req.body.student; // Updated data coming from the form
    Student.findByIdAndUpdate(req.params.id, student, function(err, updatedStudent){
        if(err){
            let errorMessage = "\nError while finding the student by id and updating : ref => updateRoute app.put /students/:id : ".toUpperCase() + err ;
            console.log(errorMessage);
            res.send(errorMessage);
        }
        else{
            console.log("Updated Student Data : ", updatedStudent);
            res.redirect("/students");
        }
    });
});

//////////////////////////////////////////////////////////////////
// DELETE ROUTE | Delete student record and //////////////////////
// save into another table ///////////////////////////////////////
app.delete("/students/:id", function(req, res){
    let routeMessage = "\napp.delete(\"/students/:id route hitted !".toUpperCase();
    console.log(routeMessage);

    Student.findByIdAndDelete(req.params.id, function(err, deletedStudent){
        if(err){
            let errorMessage = "\nError while finding the student by id and deleting : ref => deleteRoute app.delete /students/:id : ".toUpperCase() + err ;
            console.log(errorMessage);
            res.send(errorMessage);
        }
        else{
            console.log("Deleted Student Data : ", deletedStudent);
            saveDeletedRecord(deletedStudent);
            res.redirect("/students");
        }
    });
});

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// SEARCH ROUTE | Find a student by first name ///////////////////
app.get("/students/search", function(req, res){
    res.render("search"); // It will render the index.ejs file from search folder inside the views directory
});

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Function to store the record of deleted student ///////////////
function saveDeletedRecord(deletedStudent){
    const deletedStudentModel = new DeletedStudent({
        firstName : deletedStudent.firstName,
        lastName : deletedStudent.lastName,
        dateOfBirth : deletedStudent.dateOfBirth,
        gender : deletedStudent.gender,
        email : deletedStudent.email,
        phone : deletedStudent.phone
    });
    deletedStudentModel.save();
}

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// SERVER CONFIGURATION //////////////////////////////////////////
app.listen(3456, process.env.IP, function(){
    let serverMessage = "\nSchool Management System Running...".toUpperCase();
    console.log(serverMessage);
});
