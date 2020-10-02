import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import './styles.css';

const Home = () => {
    const [location, setLocation] = useState(false);
    const [weather, setWeather] = useState(false);

    let getWeather = async (lat, long) => {
        let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
            params: {
                lat: lat,
                lon: long,
                appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
                lang: 'pt',
                units: 'metric'
            }
        });
        setWeather(res.data);
        console.log(res.data)
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            getWeather(position.coords.latitude, position.coords.longitude);
            setLocation(true);
        })
    }, []);

    if (!location) {
        return (
            <Fragment>
                <h1>Precisamos da sua permissão para encontrar sua localização!</h1>
            </Fragment>
        );
    }
    else {
        return (
            <Fragment>

                <div className="container">
                    <div className="head">
                        <h1>Clima em {weather.name}</h1>
                        <div className="p">
                            <div className="content">
                                <div className="subtitle">
                                    <img width='60px' height='auto' src={` http://openweathermap.org/img/wn/${weather['weather'][0]['icon']}.png`} alt="" />
                                    <h3 className={`${weather['weather'][0]['description']}`}>{weather['weather'][0]['description'].toUpperCase()}</h3>
                                </div>
                            </div>
                            <div className="datas">
                                <p>Temperatura atual </p><strong>{weather['main']['temp']}°C</strong>
                                <p>Sensação térmica: </p><strong>{weather['main']['feels_like']}°C</strong>
                                <p>Temperatura máxima: </p><strong>{weather['main']['temp_max']}°C</strong>
                                <p>Temperatura mínima: </p><strong>{weather['main']['temp_min']}°C</strong>
                                <p>Pressão: </p><strong>{weather['main']['pressure']} hpa</strong>
                                <p>Umidade do ar: </p><strong>{weather['main']['humidity']}%</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>

        );
    }
}

export default Home;