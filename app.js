const body = document.querySelector('.wrapper');
let city = document.querySelector('.weather__city');
let iconMain = document.querySelector('.weather__icon');
let degree = document.querySelector('.weather__degree');
let desc = document.querySelector('.weather__description');


let hourlyOne = document.querySelector('.hourly__one');
let hourlyTwo = document.querySelector('.hourly__two');
let hourlyThree = document.querySelector('.hourly__three');
let hourlyFour = document.querySelector('.hourly__four');

let descriptionOne = document.querySelector('.hourly__description-one');
let descriptionTwo = document.querySelector('.hourly__description-two');
let descriptionThree = document.querySelector('.hourly__description-three');
let descriptionFour = document.querySelector('.hourly__description-four');

let lon;
let lat

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(position => {
		lon = position.coords.longitude;
		lat = position.coords.latitude;

		const api = `https://api.openweathermap.org/data/2.5/onecall?lat=` + lat + `&lon=` + lon + `&units=metric&appid=9ad732309be2120e14844f679b5da3cd`

		fetch(api)
			.then(response => {
				return response.json();
			})
			.then(data => {
				const { description, icon } = data.hourly[0].weather[0]
				const name = data.timezone;
				const { temp } = data.hourly[0];

				const weatherIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;

				city.textContent = name;
				degree.textContent = temp;
				desc.textContent = description;
				iconMain.setAttribute('src', weatherIcon)

				if (description == 'rain' || description == 'thunderstorm' || description == 'shower rain') {
					body.style.background = "linear-gradient(rgba(0,0,0), rgba(0, 0, 0, 0.5)), url('img/rain.jpg')";
					body.style.backgroundPosition = "center";
					body.style.backgroundSize = "cover";
					body.style.backgroundRepeat = "no-repeat";
					body.style.color = "white";
				} else if (description == 'snow') {
					body.style.background = "linear-gradient(rgba(0,0,0), rgba(0, 0, 0, 0.5)), url('img/winter.jpg')";
					body.style.backgroundPosition = "center";
					body.style.backgroundSize = "cover";
					body.style.backgroundRepeat = "no-repeat";
					body.style.color = "white";
				} else {
					body.style.background = "linear-gradient(rgba(0, 0, 0, 0.17), rgba(0, 0, 0, 0.5)), url('img/sky.jpg')";
					body.style.backgroundPosition = "center";
					body.style.backgroundSize = "cover";
					body.style.backgroundRepeat = "no-repeat";
				}

				const descriptionInHour = data.hourly[1].weather[0].description;
				const timeOne = data.hourly[1].temp;

				hourlyOne.textContent = timeOne;
				descriptionOne.textContent = descriptionInHour;

				const descriptionInTwoHour = data.hourly[2].weather[0].description;
				const timeTwo = data.hourly[2].temp;

				hourlyTwo.textContent = timeTwo;
				descriptionTwo.textContent = descriptionInTwoHour;

				const descriptionInThreeHour = data.hourly[3].weather[0].description;
				const timeThree = data.hourly[3].temp;

				hourlyThree.textContent = timeThree;
				descriptionThree.textContent = descriptionInThreeHour;

				const descriptionInFourHour = data.hourly[4].weather[0].description;
				const timeFour = data.hourly[4].temp;

				hourlyFour.textContent = timeFour;
				descriptionFour.textContent = descriptionInFourHour;
			})
	})
}
