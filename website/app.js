/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=317d4d326c79f008003d4e985f9bcb98&units=imperial';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();


//Adding an event that will fire when user clicks the generate button
const genButton = document.getElementById('generate');
genButton.addEventListener('click', generateRespond);


function generateRespond(event) {
    const feelings = document.getElementById('feelings').value;
    const newZip = document.getElementById('zip').value;
    
    if(newZip) {
    getWeather(baseURL,newZip,apiKey)
    
    .then((data) => {
        postData('/add', {temperature: data.main.temp, date: newDate, userResponse: feelings} );
    })
    .then(updateUI)
}else{
    alert('Please enter zip code')
}

};


const getWeather = async (baseURL,zipCode,key) => {
    const res = await fetch(baseURL+zipCode+key);

try {

    const data = await res.json();
    return data;
} catch(error) {
    console.log('error', error);
}
};

const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newWeather = await res.json();
        return newWeather;
    }catch (error){
        console.log('error', error);
    }
}

const updateUI = async () => {
    const req = await fetch('/data');
    try{
        const newData = await req.json();
        console.log(newData);
        document.getElementById('date').innerHTML = 'Date: '+newData.date;
        document.getElementById('temp').innerHTML = 'Temperature: '+newData.temperature +'&deg F';
        document.getElementById('content').innerHTML = 'Your feelings: '+newData.userResponse;
    }catch(error) {
        console.log('error', error);
    }
}

