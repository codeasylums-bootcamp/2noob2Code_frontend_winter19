window.addEventListener("load",() => {
    let latitude;
    let longitude;

let temperaturedegree = document.querySelector(".temperature-degree");
let temperaturedescription = document.querySelector(".temperature-description");
let timezone = document.querySelector(".timezone");
let temperaturevaluesection = document.querySelector(".temperaturevalue-section");
let temperaturespan = document.querySelector(".temperaturevalue-section span")

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            
            const api = `${proxy}https://api.darksky.net/forecast/afeae824f950dfc9cea8c3399f412ef9/${latitude},${longitude}` ;
            fetch(api)
            .then(response => {
                return response.json();
                })
            .then(data => {
                console.log(data);
                const {temperature,summary} = data.currently;
                temperaturedegree.textContent = temperature;
                temperaturedescription.textContent = summary;
                timezone.textContent = data.timezone;

                let celsius = ((temperature-32)*5)/9 ;

                temperaturevaluesection.addEventListener("click", () =>{
                    if(temperaturespan.textContent === "F"){
                        temperaturespan.textContent = "C";
                        temperaturedegree.textContent = Math.floor(celsius);
                    }else {
                        temperaturespan.textContent = "F";
                        temperaturedegree.textContent = temperature;
                    }
                });
    
                
            });      
            

        });



    }
});




