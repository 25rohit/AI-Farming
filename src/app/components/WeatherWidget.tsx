import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export default function WeatherWidget({ language }: { language: string }) {
  const [location, setLocation] = useState('Delhi');
  const [forecast, setForecast] = useState<any>(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8bff1720/weather/${location}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const data = await response.json();
      setForecast(data);
    } catch (error) {
      console.error('Weather fetch failed:', error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('Rain')) return <CloudRain className="w-6 h-6" />;
    if (condition.includes('Cloud')) return <Cloud className="w-6 h-6" />;
    return <Sun className="w-6 h-6" />;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-3">
        <Sun className="w-8 h-8 text-yellow-600" />
        Weather Forecast
      </h2>

      <Card>
        <CardHeader><CardTitle>Location</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Enter Location</Label>
            <div className="flex gap-2">
              <Input value={location} onChange={(e) => setLocation(e.target.value)} />
              <Button onClick={fetchWeather}>Update</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {forecast && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {forecast.forecast?.map((day: any, idx: number) => (
            <Card key={idx} className="text-center">
              <CardContent className="p-4">
                <p className="text-sm font-semibold mb-2">{day.day}</p>
                <div className="flex justify-center mb-2 text-blue-600">
                  {getWeatherIcon(day.condition)}
                </div>
                <p className="text-2xl font-bold mb-1">{day.temp}°C</p>
                <p className="text-xs text-gray-600">{day.condition}</p>
                <div className="mt-3 space-y-1 text-xs text-gray-600">
                  <div className="flex items-center justify-center gap-1">
                    <CloudRain className="w-3 h-3" />
                    <span>{day.rainfall}mm</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Wind className="w-3 h-3" />
                    <span>{day.windSpeed} km/h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {forecast?.alerts && forecast.alerts.length > 0 && (
        <Card className="border-l-4 border-l-red-500">
          <CardHeader><CardTitle className="text-red-600">Weather Alerts</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {forecast.alerts.map((alert: string, idx: number) => (
                <li key={idx} className="text-sm">• {alert}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
