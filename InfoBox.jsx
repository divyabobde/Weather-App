import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css";

// Icons
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

export default function InfoBox({ info }) {
    
    const HOT_URL = "https://images.unsplash.com/photo-1501973801540-537f08ccae7b";
    const COLD_URL = "https://images.unsplash.com/photo-1608889825207-7ea287d227ce";
    const RAIN_URL = "https://images.unsplash.com/photo-1527766833261-b09c3163a791";
    
    // Helper function to determine the visual mode
    // This ensures the Icon and the Image always match logic
    const getWeatherMode = () => {
        if (info.weather.toLowerCase().includes("rain")) return "RAIN";
        if (info.temp > 30) return "HOT";
        if (info.temp <= 15) return "COLD";
        return "MILD";
    };

    const mode = getWeatherMode();

    // Logic Map
    const config = {
        RAIN: {
            image: RAIN_URL,
            icon: <ThunderstormIcon style={{ fontSize: 24, color: "blue" }} />
        },
        HOT: {
            image: HOT_URL,
            icon: <WbSunnyIcon style={{ fontSize: 24, color: "orange" }} />
        },
        COLD: {
            image: COLD_URL,
            icon: <AcUnitIcon style={{ fontSize: 24, color: "skyblue" }} />
        },
        MILD: {
            // Using HOT_URL for mild, or you can find a specific "Nature" image
            image: HOT_URL, 
            icon: <WbSunnyIcon style={{ fontSize: 24, color: "goldenrod" }} />
        }
    };

    return (
        <div className="InfoBox">
            <div className='cardContainer'>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={config[mode].image}
                        alt="weather image"
                    />
                    <CardContent>
                        {/* City Name with Icon inline */}
                        <Typography gutterBottom variant="h5" component="div" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1}}>
                            {info.city} {config[mode].icon}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" component="div">
                            <p>Temperature: {info.temp}°C</p>
                            <p>Humidity: {info.humidity}%</p>
                            <p>Min Temp: {info.tempMin}°C</p>
                            <p>Max Temp: {info.tempMax}°C</p>
                            <p>The weather can be described as <i>{info.weather}</i></p>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}