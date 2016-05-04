var express = require('express');
var app = express();
var gradesJson = require('./studentsGrades.json');
var port=process.env.PORT||3000;



app.get("/",function(req,res){
    var msg="Error";
    res.send(msg);
});


app.get('/getAllStudent', function(req,res) { // Sending all students information
    res.json(gradesJson);
});

app.get('/getStudentGradeById/:student_id', function(req,res) {
    var studentId = req.params.student_id;
    var msg;
    if(studentId<0 || isNaN(studentId)){ //The isNaN() function returns true if the value is NaN (Not-a-Number), and false if not.
        msg={"Error": "illegal input"}
    }
    else{
      var arrSize = gradesJson.students.length;
      for(var i=0; i<arrSize; i++){
        if(gradesJson.students[i].studentId == studentId){
                msg = gradesJson.students[i];
                break;
      }
    }
  }
    res.send(msg); //sending the relevant information regarding specific student
});

app.get('/getStudentsByYear/:year', function(req,res) {
    var year = req.params.year;
    var msg;
    if(year<1 || year>5 || isNaN(year)){ //The isNaN() function returns true if the value is NaN (Not-a-Number), and false if not.
        msg={"Error": "illegal input"}
    }
    else{
      msg=[];
      var arrSize = gradesJson.students.length;
      for(var i=0; i<arrSize; i++){
        if(gradesJson.students[i].year == year){
                msg.push(gradesJson.students[i]);
               
      }
    }
  }
    res.send(msg); //sending relevant students sorting by year
});



app.listen(port);
console.log('listening on port' + port);