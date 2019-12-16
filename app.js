let temperaturedegree = document.querySelector(".card h1");
let temperaturedescription = document.querySelector(".weather-description");
let timezone = document.querySelector(".card h2");

let weatherCard=document.querySelector(".card");
let playButton=document.querySelector(".play-btn");
let searchBar=document.querySelector(".search-bar");

let input = document.querySelector('.searchTerm');
let button= document.querySelector('.searchButton');

function weatherlocator(longitude,latitude){
            
            const proxy = "https://cors-anywhere.herokuapp.com/";
            
            const api = `${proxy}https://api.darksky.net/forecast/0429912abc46e16c4eca4dd564d9200b/${latitude},${longitude}` ;
            fetch(api)
            .then(response => {
                return response.json();
                })
            .then(data => {
                console.log(data);
                const {temperature,summary,windSpeed,precipProbability} = data.currently;
                
                temperaturedescription.innerHTML = `${summary} <span>Wind ${windSpeed}km/h <span class="dot"> • </span>Precip ${precipProbability*100}%</span>`;
                timezone.textContent = data.timezone;

                let celsius = ((temperature-32)*5)/9 ;
                celsius=Math.floor(celsius);
                temperaturedegree.textContent = `${celsius}°`;
                let d = new Date();
                let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                let day=d.getDay();
                document.querySelector(".card-day").innerHTML = days[day];
                let shortdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

                for(let i= 0; i<5;i++)
                {
                    document.getElementById(`d${i+1}`).innerHTML=shortdays[(day+i)%7];
                    
                    let temph=data.daily.data[i].apparentTemperatureHigh;
                    let celsiush = ((temph-32)*5)/9 ;
                    celsiush=Math.floor(celsiush);
                    document.getElementById(`th${i+1}`).innerHTML = `${celsiush}°`;


                    let templ=data.daily.data[i].apparentTemperatureLow;
                    let celsiusl = ((templ-32)*5)/9 ;
                    celsiusl=Math.floor(celsiusl);
                    document.getElementById(`tl${i+1}`).innerHTML =`${celsiusl}°`;
                }
            });

            
        }
              




window.addEventListener("load",() => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            weatherlocator(position.coords.longitude,position.coords.latitude);
        });
    }
});


const PlayBtnDisappear = () => {
    playButton.style.display ="none";
    weatherCard.style.display="block";
    searchBar.style.display="block";

}
playButton.addEventListener("click",PlayBtnDisappear);




button.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("submitted");
    if(input.value != ""){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=50a7aa80fa492fa92e874d23ad061374`;
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => { console.log(data);

        input.value ="";
        weatherlocator(data.coord.lon,data.coord.lat);
        })
        .catch(err => alert("Wrong city name!"));
        }
});
