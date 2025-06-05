import { useState, useEffect } from "react";

import './watherStyles.css'

interface WeatherType {
    temperature: number;
    windspeed: number;
    time: string;
    is_day: number;
    weathercode: number;
}

type Error = string | boolean ;

const WeatherComponent = () => {
    const [weatherElement, setWeatehrElement] = useState<WeatherType | null>(null);
    const [error, setError] = useState<Error>(false);
    const [load, setLoad] = useState(true);

    const weatherCode = (cod: number) => {
        switch(cod) {
            case 0:
                return "Ясно";
            case 1:
            case 2:
            case 3:
                return "Переменная облачноть";
            case 45:
            case 48: 
                return "Туман";
            case 51: 
            case 53: 
            case 55: 
                return "Мелкий дождь";
            case 61:
            case 63: 
            case 65: 
                return "Дождь";
            case 71: 
            case 73: 
            case 75: 
                return "Снег";
            case 80: 
            case 81: 
            case 82:
                return "Ливни"
            default:
                return "Неопознанная погода"
        }
            
    }

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=55.7558&longitude=37.6176&current_weather=true&timezone=auto")

                if(!response.ok) {
                    throw new Error('Ошибка при загрузке');
                }

                const data = await response.json();
                setWeatehrElement(data.current_weather);
                
            } catch(err) {
                    if(err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError(false)
                    }
            } finally {
                setLoad(false)
            }
        };

        fetchWeather();
    }, [])

    if(error) return <p>{error}</p>
    if(load) return <p>Loading...</p>
    if(!weatherElement) return <p>Нет данных</p>

    const {temperature, windspeed, time, is_day, weathercode}: WeatherType = weatherElement;
    return (
        <div className="weather-card">
            <h2>Погода в Москве</h2>
            <p className="weather-temp">Температура: {temperature}</p>
            <p className="weather-info">Ветер {windspeed}</p>
            <p className="weather-info">Время: {time}</p>
            <p className="weather-highlight">{is_day ?  "Сейчас день" : "Сейчас ночь"}</p>
            <p className="weather-info">Код погоды: {weatherCode(weathercode)}</p>
             <div className="weather-footer">Источник: open-meteo.com</div>
        </div>
    )
}

export default WeatherComponent;