import React, { useState } from 'react';
import { AlertTriangle, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export default function DiseaseAlert({ language }: { language: string }) {
  const [diseaseType, setDiseaseType] = useState('');
  const [location, setLocation] = useState('');
  const [alert, setAlert] = useState<any>(null);

  const handleCheck = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8bff1720/disease-alert`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ diseaseType, location, cropType: 'Rice' })
        }
      );
      const data = await response.json();
      setAlert(data);
      toast.success('Disease alert generated!');
    } catch (error) {
      toast.error('Failed to check');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-3">
        <AlertTriangle className="w-8 h-8 text-red-600" />
        AI Disease Spread Prediction
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Report Disease</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Disease Type</Label>
              <Input value={diseaseType} onChange={(e) => setDiseaseType(e.target.value)} placeholder="e.g., Leaf Blight" />
            </div>
            <div>
              <Label>Your Location</Label>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Village name" />
            </div>
            <Button onClick={handleCheck} className="w-full bg-red-600">Check Disease Spread</Button>
          </CardContent>
        </Card>

        {alert && (
          <Card className="border-l-4 border-l-red-500">
            <CardHeader><CardTitle>Community Alert</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Badge className={`${alert.spreadRisk === 'High' ? 'bg-red-500' : alert.spreadRisk === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                {alert.spreadRisk} Spread Risk
              </Badge>
              <div>
                <p className="text-sm text-gray-600">Nearby Reports</p>
                <p className="text-2xl font-bold">{alert.nearbyReports}</p>
              </div>
              {alert.affectedVillages?.length > 0 && (
                <div>
                  <p className="text-sm font-semibold mb-2">Affected Villages</p>
                  <div className="flex flex-wrap gap-2">
                    {alert.affectedVillages.map((village: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {village}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="font-semibold text-red-800">{alert.alert}</p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">Preventive Measures</p>
                <ul className="text-sm space-y-1">
                  {alert.preventiveMeasures?.map((measure: string, idx: number) => (
                    <li key={idx}>• {measure}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
