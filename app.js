window.addEventListener('load', ()=>{
    let long;
    let lat;

    let tempDesc = document.querySelector('.temperature-description');
    let tempDeggg = document.querySelector('.temperature-degree');
    let locationtimmezone = document.querySelector('.location-timezone');

    let temperature1 = document.querySelector('.temperature');
    const temperatureSpan= document.querySelector('.temperature span');
    
    

    if(navigator.geolocation){

     navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/610c67f1b9b6e378a5c571ecbd5f2019/${lat},${long}`;
            fetch(api)
            .then(data => {
                return data.json();
            })
            .then(data => {
               
                const {temperature , summary ,icon} = data.currently;
                // set DOM from API

                tempDeggg.textContent = Math.floor(temperature);
                tempDesc.textContent = summary;
                locationtimmezone.textContent = data.timezone;

                setIcons(icon, document.querySelector('.icon'));

                temperature1.addEventListener("click", () => { 
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";

                        let cel = (temperature - 32) * 5/9;
                        tempDeggg.textContent = Math.floor(cel);
            
                    }else{
                        temperatureSpan.textContent = "F";
                        tempDeggg.textContent = Math.floor(temperature);
                    }
                });
                
            })
        }); 
        
    } else{

        h1.textContent = "Something went wrong! OOPSIE"
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();

        return skycons.set(iconID, Skycons[currentIcon]);
    }

});

