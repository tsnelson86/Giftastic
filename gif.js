//Name array that stores all possible searches to the Giphy API.
var buttonChoices = ["The Simpsons", "Family Guy", "Starcraft", "Puppies", "Skydiving"];

//Function to display the appropriate gifs based on the button selected at the top of the page.

//Onclick event that identifies the value of the copy in the input field and creates a new button with that copy.
$("#submitbtn").on("click", function(event) {
  event.preventDefault();
  var newChoice = $("#add-gif").val().trim();
	if ($("#add-gif").val().trim() != "") {
		buttonChoices.push(newChoice);
		renderbtn();
		$("#add-gif").val("");
	}
	else {
		alert("Please add a value before submitting.");
	}

});

//Calls function to render button funtion to populate buttons when page first loads.
$(document).on("click", ".gifOption", displayGif);

//Calls function to animate Gif
$(document).on("click", ".gif", animateGif);

renderbtn();

//Function to display the proper gifs on a page based on the button pressed.
function displayGif () {
	var search = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + search + "&rating=pg&limit=10&ftm=json";
	$.ajax ({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		gifInfo = response.data;
		for (var i = 0; i < gifInfo.length; i++) {
			var div = $("<div class='gifstuff'>");
			var p = $("<p>");
			var image = "<img src='" + gifInfo[i].images.fixed_height_still.url + "' data-still='" + gifInfo[i].images.fixed_height_still.url + "' data-animate='" + gifInfo[i].images.fixed_height.url + "' data-state='still' class='gif'>";
			console.log(image);
			p = "Rating: " + gifInfo[i].rating;
			$("#giphy-view").prepend(div);
			$(div).append(p);
			$(div).append($("<br>"));
			$(div).append(image);
		}
	});
}

//Function that populates all buttons with data-name attribute content based on length of name array
function renderbtn () {
	$("#button-view").empty();
	for (var i = 0; i < buttonChoices.length; i++) {
		var newbtn = $("<button>");
		$("#button-view").append(newbtn);
		newbtn.addClass("gifOption").attr("data-name", buttonChoices[i]).text(buttonChoices[i]);
	}
}

function animateGif () {
  var state;
	state = $(this).attr("data-state");
	var dataAttr;

  if (state == "still") {
    $(this).attr("data-state", "animate");
    dataAttr = $(this).attr("data-animate");
    $(this).attr("src", dataAttr);
  } else {
    $(this).attr("data-state", "still");
    dataAttr = $(this).attr("data-still");
    $(this).attr("src", dataAttr);
  }
}