import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export default function SoilTesting({ language }: { language: string }) {
  const [location, setLocation] = useState('');
  const [results, setResults] = useState<any>(null);

  const handleTest = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8bff1720/soil-analysis`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ location, cropType: 'Rice' })
        }
      );
      const data = await response.json();
      setResults(data);
      toast.success('Soil analysis complete!');
    } catch (error) {
      toast.error('Analysis failed');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-3">
        <Target className="w-8 h-8 text-orange-600" />
        Soil Testing & Analysis
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Request Soil Test</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Location</Label>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Your location" />
            </div>
            <Button onClick={handleTest} className="w-full bg-orange-600">Analyze Soil</Button>
          </CardContent>
        </Card>

        {results && (
          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardHeader><CardTitle>Soil Report</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3">
                  <p className="text-xs opacity-90">pH Level</p>
                  <p className="text-2xl font-bold">{results.ph}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3">
                  <p className="text-xs opacity-90">Soil Type</p>
                  <p className="text-lg font-bold">{results.soilType}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3">
                  <p className="text-xs opacity-90">Nitrogen</p>
                  <p className="text-xl font-bold">{results.nitrogen} kg/ha</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3">
                  <p className="text-xs opacity-90">Phosphorus</p>
                  <p className="text-xl font-bold">{results.phosphorus} kg/ha</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                <p className="text-sm font-semibold mb-2">Fertilizer Plan</p>
                <div className="text-sm space-y-1">
                  <p>• Urea: {results.fertilizerPlan?.urea}</p>
                  <p>• DAP: {results.fertilizerPlan?.dap}</p>
                  <p>• Potash: {results.fertilizerPlan?.potash}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader><CardTitle>Soil Health Indicators</CardTitle></CardHeader>
        <CardContent>
          <img
            src="https://images.unsplash.com/photo-1710090720809-527cefdac598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2lsJTIwdGVzdGluZyUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc3MTIyMTkwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Soil Testing"
            className="w-full h-64 object-cover rounded-lg"
          />
        </CardContent>
      </Card>
    </div>
  );
}
