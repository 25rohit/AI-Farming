import React, { useState } from 'react';
import { Sprout } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export default function CropRotation({ language }: { language: string }) {
  const [currentCrop, setCurrentCrop] = useState('');
  const [recommendations, setRecommendations] = useState<any>(null);

  const handleRecommend = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8bff1720/crop-rotation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ currentCrop, soilType: 'alluvial', lastTwoSeasons: [] })
        }
      );
      const data = await response.json();
      setRecommendations(data);
      toast.success('Recommendations generated!');
    } catch (error) {
      toast.error('Failed to get recommendations');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-3">
        <Sprout className="w-8 h-8 text-green-600" />
        AI Crop Rotation Recommender
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Current Crop</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Select Current Crop</Label>
              <Select value={currentCrop} onValueChange={setCurrentCrop}>
                <SelectTrigger><SelectValue placeholder="Select crop" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="maize">Maize</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleRecommend} className="w-full bg-green-600">Get Recommendations</Button>
          </CardContent>
        </Card>

        {recommendations && (
          <Card>
            <CardHeader><CardTitle>Recommended Next Crops</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {recommendations.recommendedNextCrops?.map((crop: any, idx: number) => (
                <div key={idx} className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-lg">{crop.crop}</h4>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div><span className="text-gray-600">Profit:</span> ₹{crop.expectedProfit}</div>
                    <div><span className="text-gray-600">Soil Benefit:</span> {crop.soilBenefit}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
