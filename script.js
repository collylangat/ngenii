function result() {

    let lat = document.getElementById('latitude').value;
    let lon = document.getElementById('longitude').value;

    if((lon>180|lon<-180|lon==0)){
        return(alert("Enter a valid longitude"));

    }

    if((lat>90|lat<-90|lat==0)){
        return(alert("Enter a valid latitude"));

    }

    let url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&hourly=temperature_2m,relativehumidity_2m,cloudcover_mid,windspeed_120m";

    
    //let url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relativehumidity_2m,cloudcover_mid,windspeed_120m";

    fetch(url)
    .then(data=>{
        if (!data.ok) {
            return Promise.reject()
        }
        return data.json();
    })
    .then(post=>{
        let time = post.hourly.time;
        let temp = post.hourly.temperature_2m;
        let windSpeed = post.hourly.windspeed_120m;
        let cloud = post.hourly.cloudcover_mid;
        let humility = post.hourly.relativehumidity_2m;


        //reduce to 6am to 6pm values
        time.splice(0,6);
        time.splice(13,time.length);

        temp.splice(0,6);
        temp.splice(13,temp.length);

        windSpeed.splice(0,6);
        windSpeed.splice(13,windSpeed.length);

        humility.splice(0,6);
        humility.splice(13,humility.length);

        cloud.splice(0,6);
        cloud.splice(13,cloud.length);

        let timeArray = [];

        for(let i=0;i<time.length;i++){
            let ne = time[i].slice(-5);
            timeArray.push(ne);
        }

        console.log(timeArray);

        
        //chart
        let myChart = document.getElementById('myChart').getContext('2d');
        let humilitChart = new Chart(myChart, {
        type:"line",
        data:{
            labels:timeArray,
            datasets:[
            {
                label:'Relative Humility',
                borderColor: 'blue',
                data:humility
            },
            {
                label:'Temperature(Celsius) ',
                borderColor: 'red',
                data:temp
            },
            {
                label:'Wind Speed(km/hr)',
                borderColor: 'green',
                data:windSpeed
            },
            {
                label:'Cloud Cover (%)',
                borderColor: 'yellow',
                data:cloud
            }
        ]
        },
        options:{
        }
        });
    })
    .catch((error) => {
        alert(error);
    });
}