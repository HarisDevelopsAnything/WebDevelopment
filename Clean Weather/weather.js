const getWeatherInfo = () => {
  // Replace 'YOUR_API_KEY' with your actual API key from weatherapi.com
  const apiKey = "854b369436fc4ea5a1a131144232407";
  const city = document.getElementById("cityInput").value; // Replace with the desired city
  //Cards to update
  const cityCard = document.getElementById("city-card");
  const tempCard = document.getElementById("temp-card");
  const humidCard = document.getElementById("humid-card");
  const weatherCard = document.getElementById("climate-card");
  const outfitCard = document.getElementById("outfit-card");
  const tipsCard = document.getElementById("tips-card");
  cityCard.innerText = city;
  // Construct the API URL
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  // Fetch weather data from the API
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Extract relevant weather information from the data
      const location = data.location.name;
      const temperature = data.current.temp_c;
      const condition = data.current.condition.text;
      const humidity = data.current.humidity;
      const statecode = data.location.region;
      const countrycode = data.location.country;
      cityCard.innerHTML = `${location}, ${statecode}, ${countrycode}`;
      tempCard.innerHTML = `${temperature}°C/${data.current.temp_f}°F`;
      weatherCard.innerHTML = condition;
      humidCard.innerHTML = `${humidity}%`;
      let recOutfit = "";
      alert(typeof temperature);
      if (parseInt(temperature) <= 0) {
        recOutfit = "Heavy sweaters";
        outfitCard.innerHTML = recOutfit;
      } else if (parseInt(temperature) > 0 && parseInt(temperature) <= 18) {
        recOutfit = "Sweaters";
        outfitCard.innerHTML = recOutfit;
      } else if (parseInt(temperature) > 18 && parseInt(temperature) <= 30) {
        recOutfit = "Normal clothes";
        outfitCard.innerHTML = recOutfit;
      } else if (parseInt(temperature) > 30 && parseInt(temperature) <= 35) {
        recOutfit = "Light clothes";
        outfitCard.innerHTML = recOutfit;
      } else {
        recOutfit = "Minimal clothing";
        outfitCard.innerHTML = recOutfit;
      }
      const dataTable = document.getElementById("weather-table");
      dataTable.classList.add("unhide");
      // Display the weather information
      console.log(`Weather in ${location}:`);
      console.log(`Temperature: ${temperature}°C`);
      console.log(`Condition: ${condition}`);
      // 7 day forecast attempt
      getSevenDay();
    })
    .catch((error) => {
      console.error("There was a problem fetching weather data:", error);
    });
};
const getSevenDay = () => {
  const apiKey = "854b369436fc4ea5a1a131144232407";
  const city = document.getElementById("cityInput").value; // Replace with the desired city
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Access the 7-day forecast data
      const forecast = data.forecast.forecastday;

      // Loop through the forecast data and display each day's weather
      forecast.forEach((dayData, index) => {
        const date = dayData.date;
        const condition = dayData.day.condition.text;
        const highTemperature = dayData.day.maxtemp_c;
        const lowTemperature = dayData.day.mintemp_c;

        console.log(`Day ${index + 1}: ${date}`);
        console.log(`Condition: ${condition}`);
        console.log(`High Temperature: ${highTemperature}°C`);
        console.log(`Low Temperature: ${lowTemperature}°C`);
        console.log("--------------------------");
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  async function weatherHeading() {
    defaultLength = document.getElementById("headingText").innerHTML.length;
    const phrases = [
      " reliable",
      " clean",
      " aesthetic",
      " open-source",
      " built with love",
      " useful",
      " stands out of the crowd",
      " built by a single man, instead of a company",
      " modern and intuitive",
      " easy",
      " understandable",
      " from weatherapi.com",
    ];
    phrase = 0;
    while (true) {
      await typeWriter(phrases[phrase]);
      await deTypeWriter(defaultLength);
      phrase++;
      if (phrase == phrases.length) phrase = 0;
    }
  }
  async function typeWriter(phrase) {
    heading = document.getElementById("headingText");
    for (let i = 0; i < phrase.length; i++) {
      heading.innerHTML += phrase.charAt(i);
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
  }
  async function deTypeWriter(len) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    heading = document.getElementById("headingText");
    for (let i = heading.innerHTML.length; i >= len; i--) {
      heading.innerHTML = heading.innerHTML.substring(0, i);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
};
