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

// var queryURL 
// var userSearch 
var key = "168da4ba9cbcfa0cf03a671a6fe35d4c"
var queryUV
var latitude
var longitude

$("#searchButton").on("click", function(ev) {

    ev.preventDefault()

    var userSearch = $("input[type='search']").val()
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&units=imperial&appid=${key}`
    

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response)
          console.log(response.coord.lat)
          
          latitude = response.coord.lat
          longitude = response.coord.lon
          queryUV = `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${key}` 
          $("#temperature").text(Math.floor(response.main.temp))
          $("#cityName").text(response.name)
          $("#humidity").text(response.main.humidity)
          $("#wind").text(Math.floor(response.wind.speed))
          
          $.ajax({
            url:queryUV,
            method: "GET"
        }).then(function(uvResponse) {
            console.log(uvResponse)
            $("#uv").text(uvResponse.value)
        })
            
    
      })
    
    
    
      
    
  

})