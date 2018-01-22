$(document).ready(function() {
	// Drop down menu
      $('select').material_select();

  // Feedback email validation 

  function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
  }

  function validate() {
    $("#result").text("");
    var email = $("#email").val();
    if (validateEmail(email)) {
      $("#result").text(email + " is valid :)");
      $("#result").css("color", "green");
    } else {
      $("#result").text(email + " is not valid :(");
      $("#result").css("color", "red");
    }
    return false;
  }

  $("#validate").bind("click", validate); 



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBj10oSnNz60osM5NOoS90QpaJlcJGU1lA",
    authDomain: "coffeeformdata.firebaseapp.com",
    databaseURL: "https://coffeeformdata.firebaseio.com",
    projectId: "coffeeformdata",
    storageBucket: "coffeeformdata.appspot.com",
    messagingSenderId: "27513446655"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();

    // Initial Values
    var name = "";
    var email = "";
    var feedback = "";

    // Capture Button Click
    $("#submit").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      name = $("#name").val().trim();
      email = $("#email").val().trim();
      feedback = $("#feedback").val().trim();

      // Code for handling the push
      database.ref().push({
        name: name,
        email: email,
        feedback: feedback,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });

    // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.name);
      console.log(sv.email);
      console.log(sv.feedback);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

//-----------------------------------------------------
// SEARCH MENU API
//-----------------------------------------------------

   // Initialize Firebase
var config = {
  apiKey: "AIzaSyCQBHZo_ekSLeRSliWPTcJcrvyhto8yyk0",
  authDomain: "findacup.firebaseapp.com",
  databaseURL: "https://findacup.firebaseio.com",
  projectId: "findacup",
  storageBucket: "findacup.appspot.com",
  messagingSenderId: "849669101282"
};

firebase.initializeApp(config);
var searchData = firebase.database();

// Global Var
  var local = "";
  var dist  = "";
  var amen  = "";
  var selectedAmen = [];
  var childData = "";
$("#submit").on("click", function(event) {
  event.preventDefault();
// Grabs user input
  local = $("#yourLocation").val().trim();
  dist  = $("#distance option:selected").val().trim();
  
  //Grab selected Materials to an array.
 select = $("#amenities"),
    ul = select.prev();
    
    ul.children('li').toArray().forEach(function (li, i) {
        if ($(li).hasClass('active')) {
          selectedAmen.push(select.children('option').toArray()[i].value);
        }
    });
      
    select.val(selectedAmen);

amen = selectedAmen;

console.log("distance is:", dist);
console.log("amenities is:", $("#amenities").val());
console.log("Amen is:", amen);

// Creates local "temporary" object for holding coffee data. 
  var newCoffee = {
    Location: local,
    Distance: dist,
    Amenities: amen,
  };
   
// Push to the database(firebase)
   searchData.ref().push(newCoffee); 

if ( select.value != "closed" ){
//Need code to set it to the closed selection. 
console.log("working");
}

searchData.ref().on("value", function(snapshot) {

      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().local);
      console.log(snapshot.val().dist);
      console.log(snapshot.val().amen);
      
    

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

});

=======

  // Email input validation 

  function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
  }

  function validate() {
    $("#result").text("");
    var email = $("#email").val();
    if (validateEmail(email)) {
      $("#result").text(email + " is valid :)");
      $("#result").css("color", "green");
    } else {
      $("#result").text(email + " is not valid :(");
      $("#result").css("color", "red");
    }
    return false;
  }

  $("#validate").bind("click", validate); 

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBj10oSnNz60osM5NOoS90QpaJlcJGU1lA",
    authDomain: "coffeeformdata.firebaseapp.com",
    databaseURL: "https://coffeeformdata.firebaseio.com",
    projectId: "coffeeformdata",
    storageBucket: "coffeeformdata.appspot.com",
    messagingSenderId: "27513446655"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();

    // Initial Values
    var name = "";
    var email = "";
    var validate = "";

    // Capture Button Click
    $("#submit").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      name = $("#name").val().trim();
      email = $("#email").val().trim();
      validate = $("#validate").val().trim();

      // Code for handling the push
      database.ref().push({
        name: name,
        email: email,
        validate: validate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    // Clear field after submitting feedback
  	$('#name, #email, #validate').val('');
  	return false;
    });



    // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.name);
      console.log(sv.email);
      console.log(sv.validate);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });



  
    });
