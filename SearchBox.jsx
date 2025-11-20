import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {

    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "834c253caffcbca93e5c3b407f61ba77"; 

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(
                `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
            );

            let data = await response.json();
            console.log("API Response:", data);

            if (data.cod !== 200) {       // <--- FIX (invalid city)
                setError(true);
                return null;
            }

            let result = {
                city: data.name,
                temp: data.main.temp,
                tempMin: data.main.temp_min,
                tempMax: data.main.temp_max,
                humidity: data.main.humidity,
                weather: data.weather[0].description,
            };

            setError(false);
            return result;

        } catch (error) {
            setError(true);
            return null;
        }
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = async (evt) => {
        evt.preventDefault();
        let newinfo = await getWeatherInfo();   // <--- FIXED (no city param)
        if (newinfo) updateInfo(newinfo);
        setCity("");
    };

    return (
        <div className='searchbox'>
            <form onSubmit={handleSubmit} >
                <TextField
                    id="city"
                    label="City Name"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                />
                <br /><br /><br />

                <Button variant="contained" endIcon={<SendIcon />} type='submit'>
                    Search
                </Button>

                {error && <p style={{ color: "red" }}>No such place exists</p>}
            </form>
        </div>
    );
}
