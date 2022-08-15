/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=562674457583c1acb4d4f565094d8ab3&units=metric';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

/** 
 * Create an event listener for the element with the id: "generate",
 *  with a callback function to execute when it is clicked.  
 */
 
// Let's select the element first ...
const myButton = document.getElementById('generate');
// Then add an event listener
myButton.addEventListener('click', doWork);

/* function called by my Event listener */
function doWork(e) {
    const myZip = document.getElementById('zip').value;
    const myFeeling = document.getElementById('feelings').value;
    getMyWeather(baseURL, myZip, apiKey)

        .then(function(data) {
            console.log(data);
            // Add The Data to POST request:
            postMyData('/addNewData', {date:d, temp: data.list[0].main.temp, content: myFeeling })
            updateEl();
        })
};
        



/* Function to GET web API Data */
const getMyWeather = async (baseURL, zipCode, key) => {

    const response = await fetch(baseURL + zipCode + key);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("There is an Error", error);
    }
}  

const postMyData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST',  
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header 
    // We can convert a JavaScript object into a string using the JavaScript method       // 
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      } catch(error) {
      console.log("error", error);
      }
  }

/* function to GET Project Data */

const updateEl = async () => {
    const request = await fetch('/all');
    try {
        const allMyData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allMyData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allMyData.temp}`;
        document.getElementById('content').innerHTML = `I feel like: ${allMyData.content}`;
       
    } catch(error) {
        console.log("There is an Error", error);
    }
};