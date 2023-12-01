export default class WeatherAPITools {
    constructor(json) {
        this.json = json;
    }

    getLocationDetails() {
        const obj = this.json.location;
        return [
            obj.name, obj.region, obj.country,
            obj.lat.toString(), obj.lon.toString(), obj.localtime
        ];
    }

    getCurrentWeather() {
        const obj = this.json.current;
        return [obj.temp_f.toString(), obj.condition.text];
    }

    getMinMaxTemp() {
        const obj = this.json.forecast.forecastday[0].day;
        return [obj.mintemp_f.toString(), obj.maxtemp_f.toString()];
    }

    getHourlyForecast() {
        const currentEpoch = Date.now() / 1000;
        const forecastArray = this.json.forecast.forecastday[0].hour;
        const weatherArray = [];

        forecastArray.forEach(currentHour => {
            if (currentHour.time_epoch < currentEpoch) {
                return;
            }

            const hourEpoch = currentHour.time_epoch;
            const temp = currentHour.temp_f;
            const conditionText = currentHour.condition.text;
            const windMph = currentHour.wind_mph;
            const humidity = currentHour.humidity;
            const chanceOfRain = currentHour.chance_of_rain;
            const chanceOfSnow = currentHour.chance_of_snow;
            const uvIndex = currentHour.uv;

            const hourObj = {
                hourEpoch, temp, conditionText, windMph,
                humidity, chanceOfRain, chanceOfSnow, uvIndex
            };

            weatherArray.push(hourObj);
        });

        return weatherArray;
    }
}
