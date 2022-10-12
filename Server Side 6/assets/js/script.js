var apiKey = 
var city = ""
var currentConditions = 
var currentDate = moment().format("MM/DD/YYYY");


$(document).ready(function() {
  $("#searchBtn").on("click", function(event) {
    var userInput = $("#searchVal").val()
    console.log(userInput)
    getWeather(userInput)
  
  })
})

  if (searchedArr.length > 0) {
    getWeather(searchedArr[searchedArr.length - 1]);
}
  for (var i = 0; i < searchedArr.length; i++) {
    createRow(searchedArr[i]);
}

function createRow(text) {
    var listItem = $("<li>").addClass("list-group-item").text(text);
    $(".list").append(listItem);


function getWeather(cityName) {
  

  if (cityName !== "") {
    apiCall = currentConditions + apiKey + "&q=" + cityName

  } else {
    apiCall = currentConditions + apiKey + "&q=" + city

  }

  $.ajax({
    url: apiCall,
    method: "GET"

  }).then(function(response) {
    console.log(response)
    
    var humid = response.main.humidity;
    var wind = response.wind.speed
    var currentWeather= response.main.temp
    var lon = response.coord.lon;
    var lat = response.coord.lat;
    var uvIndex = $("<p>").addClass("card-text").text("UV Index: ")

            $.ajax({
                type: "GET",
                url:`https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}` 


            }).then(function (response) {
                console.log(response);

      
                var uvResponse = response.value;
                var btn = $("<span>").addClass("btn btn-sm").text(uvResponse);


                if (uvResponse < 3) {
                    btn.addClass("btn-success");
                } else if (uvResponse < 7) {
                    btn.addClass("btn-warning");
                } else {
                    btn.addClass("btn-danger");
                }

                
                $("#today").append(uvIndex.append(btn));

            });
  
      }
    })
  })
}