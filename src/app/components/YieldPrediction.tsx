import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, BarChart3, AlertCircle, Check, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export default function YieldPrediction({ language }: { language: string }) {
  const [formData, setFormData] = useState({
    cropType: '',
    landSize: '',
    soilType: '',
    location: '',
    historicalYield: ''
  });
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!formData.cropType || !formData.landSize || !formData.soilType) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8bff1720/predict-yield`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            cropType: formData.cropType,
            landSize: parseFloat(formData.landSize),
            soilType: formData.soilType,
            location: formData.location,
            historicalYield: parseFloat(formData.historicalYield) || null
          })
        }
      );

      const data = await response.json();
      setPrediction(data);
      toast.success('Yield prediction generated successfully!');
    } catch (error) {
      console.error('Yield prediction error:', error);
      toast.error('Failed to generate prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-green-600" />
          AI-Based Yield Prediction System
        </h2>
        <p className="text-gray-600 mt-2">
          Uses LSTM & Random Forest AI algorithms with weather history and soil parameters
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Enter Farm Details</CardTitle>
            <CardDescription>Provide accurate information for better predictions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cropType">Crop Type *</Label>
              <Select value={formData.cropType} onValueChange={(val) => setFormData({ ...formData, cropType: val })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">Rice (धान)</SelectItem>
                  <SelectItem value="wheat">Wheat (गेहूं)</SelectItem>
                  <SelectItem value="cotton">Cotton (कपास)</SelectItem>
                  <SelectItem value="sugarcane">Sugarcane (गन्ना)</SelectItem>
                  <SelectItem value="maize">Maize (मक्का)</SelectItem>
                  <SelectItem value="pulses">Pulses (दालें)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="landSize">Land Size (acres) *</Label>
              <Input
                type="number"
                value={formData.landSize}
                onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                placeholder="e.g., 5"
              />
            </div>

            <div>
              <Label htmlFor="soilType">Soil Type *</Label>
              <Select value={formData.soilType} onValueChange={(val) => setFormData({ ...formData, soilType: val })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alluvial">Alluvial (जलोढ़)</SelectItem>
                  <SelectItem value="black">Black Soil (काली मिट्टी)</SelectItem>
                  <SelectItem value="red">Red Soil (लाल मिट्टी)</SelectItem>
                  <SelectItem value="laterite">Laterite (लैटेराइट)</SelectItem>
                  <SelectItem value="sandy">Sandy (रेतीली)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Punjab, India"
              />
            </div>

            <div>
              <Label htmlFor="historicalYield">Historical Yield (kg/acre) - Optional</Label>
              <Input
                type="number"
                value={formData.historicalYield}
                onChange={(e) => setFormData({ ...formData, historicalYield: e.target.value })}
                placeholder="e.g., 2500"
              />
            </div>

            <Button 
              onClick={handlePredict}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Prediction
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Prediction Results */}
        {prediction && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="border-none shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Prediction Results
                </CardTitle>
                <CardDescription className="text-white/80">
                  AI-powered analysis based on multiple parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                  <p className="text-sm opacity-90">Expected Yield Per Acre</p>
                  <h3 className="text-4xl font-bold mt-2">{prediction.expectedYieldPerAcre} kg</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                    <p className="text-xs opacity-90">Total Yield</p>
                    <p className="text-2xl font-bold mt-1">{prediction.totalYield} kg</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                    <p className="text-xs opacity-90">Profit Estimation</p>
                    <p className="text-2xl font-bold mt-1">₹{(prediction.profitEstimation / 1000).toFixed(0)}K</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Risk Percentage</span>
                    <span className="text-sm font-bold">{prediction.riskPercentage}%</span>
                  </div>
                  <Progress value={100 - prediction.riskPercentage} className="h-3 bg-white/20" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">AI Confidence</span>
                    <span className="text-sm font-bold">{prediction.confidence}%</span>
                  </div>
                  <Progress value={prediction.confidence} className="h-3 bg-white/20" />
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    AI Recommendations
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {prediction.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm">LSTM Model</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-600">
              Long Short-Term Memory networks analyze time-series data including historical yields and seasonal patterns
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm">Random Forest</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-600">
              Ensemble learning method that uses multiple decision trees for accurate yield predictions
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm">Satellite Data Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-600">
              Uses ISRO and NASA satellite imagery for vegetation index and crop health analysis
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
