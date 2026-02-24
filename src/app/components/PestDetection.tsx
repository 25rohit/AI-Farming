import React, { useState } from 'react';
import { Bug, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export default function PestDetection({ language }: { language: string }) {
  const [detection, setDetection] = useState<any>(null);

  const handleDetect = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8bff1720/detect-pest`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ imageData: 'base64...', cropType: 'Rice' })
        }
      );
      const data = await response.json();
      setDetection(data);
      toast.success('Pest detected!');
    } catch (error) {
      toast.error('Detection failed');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-3">
        <Bug className="w-8 h-8 text-red-600" />
        AI Pest Detection
      </h2>

      <Card>
        <CardHeader><CardTitle>Upload Crop Image</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Click or drag image here</p>
          </div>
          <Button onClick={handleDetect} className="w-full bg-red-600">
            <Camera className="w-4 h-4 mr-2" />
            Detect Pest
          </Button>
        </CardContent>
      </Card>

      {detection && (
        <Card className="border-l-4 border-l-red-500">
          <CardHeader><CardTitle>Detection Results</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Badge className="bg-red-500 mb-2">{detection.pestName}</Badge>
              <p className="text-sm">Confidence: {detection.confidence}%</p>
              <p className="text-sm">Severity: {detection.severity}</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Organic Treatment</p>
              <ul className="text-sm space-y-1">
                {detection.organicTreatment?.map((treatment: string, idx: number) => (
                  <li key={idx}>• {treatment}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
