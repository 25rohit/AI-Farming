import React, { useState } from 'react';
import { Droplet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export default function IrrigationPlan({ language }: { language: string }) {
  const [cropType, setCropType] = useState('');
  const [plan, setPlan] = useState<any>(null);

  const handleGenerate = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8bff1720/irrigation-plan`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ cropType, soilType: 'loamy', season: 'kharif', currentWeather: {} })
        }
      );
      const data = await response.json();
      setPlan(data);
      toast.success('Irrigation plan generated!');
    } catch (error) {
      toast.error('Failed to generate plan');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-3">
        <Droplet className="w-8 h-8 text-blue-600" />
        Smart Irrigation Planning
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Select Crop</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Crop Type</Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger><SelectValue placeholder="Select crop" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="sugarcane">Sugarcane</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleGenerate} className="w-full bg-blue-600">Generate Plan</Button>
          </CardContent>
        </Card>

        {plan && (
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
            <CardHeader><CardTitle>Irrigation Schedule</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                <p className="text-sm opacity-90">Total Water Requirement</p>
                <p className="text-2xl font-bold mt-1">{plan.totalWaterRequirement}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                <p className="text-sm opacity-90">Recommended Method</p>
                <p className="font-semibold mt-1">{plan.method}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                <p className="text-sm opacity-90">Soil Moisture</p>
                <p className="text-xl font-bold mt-1">{plan.soilMoisture}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                <p className="text-sm opacity-90">Next Irrigation</p>
                <p className="font-semibold mt-1">{plan.nextIrrigation}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {plan && (
        <Card>
          <CardHeader><CardTitle>Stage-wise Schedule</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {plan.irrigationSchedule?.map((stage: any, idx: number) => (
                <div key={idx} className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold">{stage.stage}</h4>
                  <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                    <div><span className="text-gray-600">Frequency:</span> {stage.frequency}</div>
                    <div><span className="text-gray-600">Amount:</span> {stage.amount}</div>
                    <div><span className="text-gray-600">Duration:</span> {stage.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
