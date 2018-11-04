// date
var d = new Date();
document.getElementById("date").innerHTML = d.toUTCString();

//display current city 



function currentCity(){
    $.getJSON("https://ipinfo.io?token=7132bb4f140dca", callback);
    
    function callback(data) {
        lat = data.loc.split(',')[0];
        lon = data.loc.split(',')[1];

        
        neUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=b6907d289e10d714a6e88b30761fae22"
        console.log(neUrl);
        
    }
}

       
        //  weather1=json.list[0].main.temp;
        // document.getElementById('celsius').innerHTML = weather1;




    





document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('getMessage').onclick = function MM() {
        var name = document.getElementById("city").value;
        console.log(name);
        var api = 'https://openweathermap.org/data/2.5/find?q=';
        var city = name;
        var units = '&units=metric';
        var apikey = '&appid=b6907d289e10d714a6e88b30761fae22';
        var url = api + city + units + apikey;
        console.log(url);






        //'https://openweathermap.org/data/2.5/find?q=London&units=metric&appid=b6907d289e10d714a6e88b30761fae22';
        // https://openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22

        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.send();
        req.onload = function weather() {
            var json = JSON.parse(req.responseText);
            // show me the country
            var country = json.list[0].sys.country;
            document.getElementById('country').innerHTML = name + "," + country;

            //------------------------------------------------------//
            // Determine the latitude and longitude of the city
        


            // to show me the lat and lon to the city
            var lati = json.list[0].coord.lat;
            console.log(lati);
            var loni = json.list[0].coord.lon;
            console.log(loni);

            document.getElementById('latitude').innerHTML = "lat: " + lati;
            document.getElementById('longitude').innerHTML = "lon: " + loni;

            $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + lati + "&lon=" + loni + "&appid=059dcee9c15c93a942eb1f38b72876be", function (weatherData) {
                $.each(weatherData, function (j, b) { });
                console.log(weatherData);
                // fetch image and display weather and icon down below 
                tWeather = weatherData.main.temp;
                iconNumber = weatherData.weather[0].icon;
                //http://openweathermap.org/img/w/10d.png
                icon = ("http://openweathermap.org/img/w/" + iconNumber + ".png");

                $("#graphic").html('<img src="' + icon + '"/>');
                $('#description').html(weatherData.weather[0].description);
                $('#city').html(weatherData.name);
                // if clear skys
                // $(body).css("backg,url/img/1")
                $("#windSpeed").html("wind" + weatherData.wind.speed + "km/h");
                $("#pressure").html("pressure" + weatherData.main.pressure + "º");
                $("#humidity").html("Humidity:" + weatherData.main.humidity + "%");
                minF = Math.floor(weatherData.main.temp_min * 9 / 5 - 459.67);
                maxF = Math.floor(weatherData.main.temp_max * 9 / 5 - 459.67);

                // translate Kelvin to Celsius
                celsius = Math.floor(weatherData.main.temp - 273.15);

                minCelsius = Math.floor(weatherData.main.temp_min - 273.15);
                maxCelsius = Math.floor(weatherData.main.temp_max - 273.15);
                // translate Kelvin to Farenhait T(K) × 9/5 - 459.67
                farenheit = Math.floor(weatherData.main.temp * 9 / 5 - 459.67);

                // display celsius by default 
                $('#celsius').html(celsius + 'ºC');
                $("#min").html(minCelsius + 'ºC');
                $("#max").html(maxCelsius + 'ºC');



            }

            )
        };



    };

    //convert C to F and F to C
    var switchButton = document.querySelector('.switch-button');
    var switchBtnRight = document.querySelector('.switch-button-case.right');
    var switchBtnLeft = document.querySelector('.switch-button-case.left');
    var activeSwitch = document.querySelector('.active');

    function switchLeft() {
        switchBtnRight.classList.remove('active-case');
        switchBtnLeft.classList.add('active-case');
        activeSwitch.style.left = '0%';

        $('#farenheit').empty();
        $('#min').empty();
        $('#max').empty();
        $('#celsius').append(celsius + 'ºC');
        $("#min").append(minCelsius + 'ºC');
        $("#max").append(maxCelsius + 'ºC');
    }

    function switchRight() {
        switchBtnRight.classList.add('active-case');
        switchBtnLeft.classList.remove('active-case');
        activeSwitch.style.left = '50%';

        $('#celsius').empty();
        $('#min').empty();
        $('#max').empty();
        $('#farenheit').append(farenheit + 'ºF');
        $('#min').append(minF + "ºF");
        $('#max').append(maxF + "ºF");

    }

    switchBtnLeft.addEventListener('click', function () {
        $('#celsius').empty();
        switchLeft();

    }, false);

    switchBtnRight.addEventListener('click', function () {
        $('#farenheit').empty();
        switchRight();

    }, false);









});
 //function for updating weather data on every API call and updating units on every click
