// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast
var searched
var userSearch 
var icon


var key = "168da4ba9cbcfa0cf03a671a6fe35d4c"

$("#moment").text(moment().format("MMM Do YYYY"))

$("#searchButton").on("click", weatherSearch)

$("document").ready(function() {
        userSearch = localStorage.getItem("prevSearch")
        weatherSearch
    })
// var getIcon = function(response, index) {
//     icon = response
//     console.log(forecast.list[index].weather[0].icon)
//     iconURL = `http://openweathermap.org/img/w${icon}.png`
// }

function weatherSearch(ev){


    ev.preventDefault()

    userSearch = $("input[type='search']").val()
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&units=imperial&appid=${key}`
    
    localStorage.setItem("prevSearch", userSearch)

    
    

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response)
          icon = response.weather[0].icon
          var iconURL = `http://openweathermap.org/img/w/${icon}.png`
          searched = $("#searched").children().length
        //   var weather = response.weather[0].main
        //   var weatherIcon = $("#weatherIcon")
          var latitude = response.coord.lat
          var longitude = response.coord.lon
          var queryUV = `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${key}` 
          $("#weatherIcon").html(`<img src='${iconURL}'></img>`)
          $("#temperature").text(Math.floor(response.main.temp))
          $("#cityName").text(response.name)
          $("#humidity").text(response.main.humidity)
          $("#wind").text(Math.floor(response.wind.speed))
          $("#searched").append(`<li>${response.name}</li>`)
          $("#searched").children("li").attr("class", "list-group-item")
            
            if (searched > 9) {
                $("#searched li:first-child").remove()
            }


            // if (weather === "Clear") {
            //     weatherIcon.html("<i class='far fa-sun'></i>")
            // }   else if (weather === "Clouds") {
            //     weatherIcon.html("<i class='fas fa-cloud'></i>")
            // }
          
          $.ajax({
            url:queryUV,
            method: "GET"
        }).then(function(uvResponse) {
            console.log()
            $("#uv").text(uvResponse.value)
            if (uvResponse.value < 3) {
                $("#uv").css("background-color", "green")
            } else if (uvResponse.value > 3 && uvResponse.value < 7) {
                $("#uv").css("background-color", "yellow")
            } else {
                $("#uv").css("background-color", "red")
            }
        })
        
            var queryForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${userSearch}&units=imperial&appid=${key}`
            $.ajax({
                url:queryForecast,
                method: "GET"
            }).then(function(response) {

                    // getIcon(response)
                    
                    var index = (-2)
                    $("#fiveDay").children("div").empty()
                    $("#fiveDay").children("div").each(function() {
                        
                        index += 8
                        console.log(index)
                        $(this).append("<h6>" + response.list[index].dt_txt + "</h6>")
                        $(this).append(`<img src='${iconURL}'></img>`)
                    })
                    

            
                
                console.log(forecast)
                console.log(forecast.list[4])
                
              

            })
                    
    
      })
    }

    

      
    
    
    
    
      
    
  
