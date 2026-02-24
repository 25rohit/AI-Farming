import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, MapPin, Loader2, Store } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export default function PricePredictor({ language }: { language: string }) {
  const [cropType, setCropType] = useState('');
  const [location, setLocation] = useState('');
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!cropType) {
      toast.error('Please select a crop');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8bff1720/predict-price`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            cropType,
            currentLocation: location
          })
        }
      );

      const data = await response.json();
      setPrediction(data);
      toast.success('Price prediction generated!');
    } catch (error) {
      console.error('Price prediction error:', error);
      toast.error('Failed to predict prices');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-blue-600" />
          Market Price Prediction AI
        </h2>
        <p className="text-gray-600 mt-2">
          Agmarknet data + AI forecasting for best selling decisions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Select Crop & Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Crop Type</Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="sugarcane">Sugarcane</SelectItem>
                  <SelectItem value="maize">Maize</SelectItem>
                  <SelectItem value="pulses">Pulses</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Your Location</Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Punjab"
              />
            </div>

            <Button 
              onClick={handlePredict}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Markets...
                </>
              ) : (
                'Predict Prices'
              )}
            </Button>
          </CardContent>
        </Card>

        {prediction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-none shadow-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {prediction.trend === 'increasing' ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <TrendingDown className="w-5 h-5" />
                  )}
                  Price Forecast
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                    <p className="text-xs opacity-90">Current Price</p>
                    <p className="text-2xl font-bold mt-1">₹{prediction.currentPrice}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                    <p className="text-xs opacity-90">Predicted Price</p>
                    <p className="text-2xl font-bold mt-1">₹{prediction.predictedPrice}</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                  <p className="text-sm opacity-90">Price Trend</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={`${prediction.trend === 'increasing' ? 'bg-green-500' : 'bg-red-500'}`}>
                      {prediction.trend === 'increasing' ? '↑' : '↓'} {prediction.trendPercent}%
                    </Badge>
                    <span className="text-sm">{prediction.trend}</span>
                  </div>
                </div>

                <div className="bg-white/20 border border-white/30 rounded-lg p-4">
                  <p className="font-semibold">Best Time to Sell</p>
                  <p className="text-lg mt-1">{prediction.bestTimeToSell}</p>
                </div>

                <div className="text-sm">
                  <p className="opacity-90">AI Confidence: {prediction.confidence}%</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {prediction && prediction.nearbyMarkets && (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="w-5 h-5 text-green-600" />
              Best Nearby Markets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {prediction.nearbyMarkets.map((market: any, idx: number) => (
                <Card key={idx} className="border border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{market.name}</h4>
                        <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {market.distance}
                        </p>
                      </div>
                      {idx === 0 && (
                        <Badge className="bg-green-500">Best</Badge>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-green-600">₹{market.price}</div>
                    <p className="text-xs text-gray-600 mt-1">per quintal</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
