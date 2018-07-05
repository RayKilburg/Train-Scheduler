// Initialize Firebase
var config = {
  apiKey: "AIzaSyCWrja_KSacy6oqxeKKcHDNumnpgnaqawI",
  authDomain: "train-fd043.firebaseapp.com",
  databaseURL: "https://train-fd043.firebaseio.com",
  projectId: "train-fd043",
  storageBucket: "train-fd043.appspot.com",
  messagingSenderId: "961269915737"
};
firebase.initializeApp(config);

var database = firebase.database();
console.log("frkoko");

function myTimer() {
  var time = new Date();
  $("#current-time").text(time.toLocaleTimeString());
}

var frequency = 0;
var firstTrain = 0;

//button for adding employess
$("#add-train-btn").on("click", function(event) {
  //stops old events from showing up
  event.preventDefault();

  //grab a user input
  var trainName = $("#train-name")
    .val()
    .trim();
  var destination = $("#destination")
    .val()
    .trim();
  firstTrain = moment(
    $("#first-train")
      .val()
      .trim(),
    "HH:mm"
  ).format("HH:mm");
  frequency = parseInt(
    $("#frequency")
      .val()
      .trim()
  ); firstTrain = moment(
    $("#first-train")
      .val()
      .trim(),
    "HH:mm"
  ).format("HH:mm");
  frequency = parseInt(
    $("#frequency")
      .val()
      .trim()
  );

  console.log(firstTrain);
  // console.log(typeof firstTrain);

  //local objects
  var firstTrainConverted = moment(firstTrain, "hh:mm");
  console.log(firstTrainConverted);
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log(diffTime);
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);
  var minutesTillTrain = frequency - tRemainder;
  console.log(minutesTillTrain);

  var nextTrain = moment().add(minutesTillTrain, "minutes");
  var nextTrain2 = moment().add(2, "minutes");
  console.log("num1" + nextTrain);
  nextTrain = moment(nextTrain).format("HH:mm");
  console.log("num1" + nextTrain);

  var newTrain = {
    //name?
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    nextTrain: nextTrain,
    minutesTillTrain: minutesTillTrain
  };

  //uploads employee data to the database
  database.ref().push(newTrain);

  //alert
  alert("New Train Added");

  //clear all of the text boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");
});

//creat firebase adding employee
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  //store data into a variable
  console.log(childSnapshot.val());
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;
  var nextTrain = childSnapshot.val().nextTrain;
  var minutesTillTrain = childSnapshot.val().minutesTillTrain;

  //add each trains data into the table
  $("#employee-table").append(
 
    "<tr><td>" +
      trainName +
      "</td><td>" +
      destination +
      "</td><td>" +
      frequency +
      "</td><td>" +
      nextTrain +
      "</td><td>" +
      minutesTillTrain +
      "</td><tr>"
  );
});
