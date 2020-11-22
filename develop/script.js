//Declare global variables
var searchList = []
var uniqueList = []
var searched
var userSearch = $("input[type='search']").val(localStorage.getItem("prevSearch"))
var key = "168da4ba9cbcfa0cf03a671a6fe35d4c"
var moment  = moment().format("MMM Do YYYY")
var queryURL 
var index
//Set jquery wrappers for initial functionality

$("document").ready(function() {

    queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem("prevSearch")}&units=imperial&appid=${key}`
    weatherSearch()          

})

//Moment js for printing date easily
$("#moment").text(moment)

//Event handler for clicking search button. Preventing default behavior of search form.
$("#searchButton").on("click", function(ev){
    
    ev.preventDefault()
    
    
    
        

    
    
    weatherSearch()
    
})

//This function runs when the search is initialized.  
function weatherSearch(){
    
    //Set search within query url to contents of search form
    userSearch = $("input[type='search']").val()       
    //Set to local storage to recall last search and post to page
    localStorage.setItem("prevSearch", userSearch) 

    searchList.push(userSearch.toLowerCase())
    uniqueList = [...new Set(searchList)]
    index = uniqueList[0]
    
    if (userSearch.toLowerCase() != index | $("#searched").children().text() != index ){
        console.log(userSearch.toLowerCase())
        var index = uniqueList.length
        localStorage.setItem("history", uniqueList)
        $("#searched").append("<li>" + uniqueList[index - 1].charAt(0).toUpperCase() + uniqueList[index - 1].slice(1) + "</li>") 
        $("#searched").children("li").attr("class", "list-group-item")
    } 

   
    queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&units=imperial&appid=${key}`
    
    
    
//First ajax call is to the general OpenWeather 1 day forecast
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          
        
        //These variables are used to set the weather icon for the current weather section
          var icon = response.weather[0].icon
          var iconURL = `http://openweathermap.org/img/w/${icon}.png`
        
        //This is used to limit the length of the recently searched section
          searched = $("#searched").children().length
        
        //The coordinate variables are used for the query to the OpenWeather UV api
          var latitude = response.coord.lat
          var longitude = response.coord.lon
          var queryUV = `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${key}` 
          
        //These jquery wrappers are plugging the data from the Openweather api into the existing html structure
          $("#weatherIcon").html(`<img src='${iconURL}'></img>`)
          $("#temperature").text(Math.floor(response.main.temp))
          $("#cityName").text(response.name)
          $("#humidity").text(response.main.humidity)
          $("#wind").text(Math.floor(response.wind.speed))
          
        
        //Populate list from array
        //Prevent duplicates


          
        //   $("#searched").append(`<li>${response.name}</li>`)
        //   $("#searched").children("li").attr("class", "list-group-item")
        //   $("#searched").children("li").on("click", function() {
        //     $("input[type='search']").val($(this).html())
        //     weatherSearch()
        //   })
            


            //     if ($(this).text() == searchList[i]) {
            //     $("input[type='search']").val($(this).html())
            //     weatherSearch()
                
            // }   else {
            //     $("#searched").append(`<li>${response.name}</li>`)
                
            //     weatherSearch()
             
              
            // }
            // }
             
            // if ($(this).val() != searchList[i]) {
            //     $("#searched").append(`<li>${response.name}</li>`)
            //     $("#searched").children("li").attr("class", "list-group-item")
                
            //         $("input[type='search']").val($(this).html())
            //         weatherSearch()
                    
            // }   else {
                // $("input[type='search']").val($(this).html())
                //     weatherSearch()
            // }                                 
     
    
          
             


          
            
        //Checking for amount of children of #searched, once it hits 10 it begins removing 
        //the first entry every time a search is done

            if (searched > 9) {
                $("#searched li:first-child").remove()
            }
        
        //This is the ajax call to the UV API
          $.ajax({
            url:queryUV,
            method: "GET"
        }).then(function(uvResponse) {
            
            //Determining the background color of the UV index entry
            $("#uv").text(uvResponse.value)
            if (uvResponse.value < 3) {
                $("#uv").css("background-color", "green")
            } else if (uvResponse.value > 3 && uvResponse.value < 7) {
                $("#uv").css("background-color", "yellow")
            } else {
                $("#uv").css("background-color", "red")
            }
        })
        
        //Here the call is made to the five day forecast API
            var queryForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${userSearch}&units=imperial&appid=${key}`
            $.ajax({
                url:queryForecast,
                method: "GET"
            }).then(function(response) {
                                
                var index = (-2)

                $("#fiveDay").children("div").empty()
                $("#fiveDay").children("div").each(function() {
                  
                    //Here the name of the weather icon file is pulled from the api and plugged into the url
                    index += 8
                    var forecastIcon = response.list[index].weather[0].icon
                    var forecastIconUrl = `http://openweathermap.org/img/w/${forecastIcon}.png`
                    
                    //Appending elements containing the relevant information to the five day forecast
                    $(this).append(`<p>${response.list[index].dt_txt}</p>`)
                    $(this).append(`<img src='${forecastIconUrl}'></img>`)
                    $(this).append(`<p class="mr-5">Temperature:${Math.round(response.list[index].main.temp)}`)
                    $(this).append(`<p>Humidity:${response.list[index].main.humidity}`)
                    $(this).addClass("border border-dark")
                    
                
                })
                })
                
                
                })

                
                }
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                

                                
