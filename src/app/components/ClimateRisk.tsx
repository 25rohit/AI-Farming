import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cloud, AlertTriangle, Droplet, Sun, Wind, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export default function ClimateRisk({ language }: { language: string }) {
  const [location, setLocation] = useState('');
  const [cropType, setCropType] = useState('');
  const [riskData, setRiskData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8bff1720/climate-risk`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            location,
            cropType,
            season: 'Kharif'
          })
        }
      );

      const data = await response.json();
      setRiskData(data);
      toast.success('Climate risk analysis complete!');
    } catch (error) {
      console.error('Climate risk error:', error);
      toast.error('Failed to analyze climate risk');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    if (risk === 'High') return 'bg-red-500';
    if (risk === 'Medium') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getRiskValue = (risk: string) => {
    if (risk === 'High') return 80;
    if (risk === 'Medium') return 50;
    return 20;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Cloud className="w-8 h-8 text-blue-600" />
          Climate Risk Alert System
        </h2>
        <p className="text-gray-600 mt-2">
          AI-powered drought, flood, and heatwave predictions with ML classification
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Analyze Climate Risk</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Location</Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Your location"
              />
            </div>

            <div>
              <Label>Crop Type</Label>
              <Input
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                placeholder="e.g., Rice, Wheat"
              />
            </div>

            <Button 
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Climate Risk'
              )}
            </Button>
          </CardContent>
        </Card>

        {riskData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      <Droplet className="w-4 h-4 text-blue-600" />
                      Drought Risk
                    </span>
                    <Badge className={getRiskColor(riskData.droughtRisk)}>
                      {riskData.droughtRisk}
                    </Badge>
                  </div>
                  <Progress value={getRiskValue(riskData.droughtRisk)} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      <Cloud className="w-4 h-4 text-blue-600" />
                      Flood Risk
                    </span>
                    <Badge className={getRiskColor(riskData.floodRisk)}>
                      {riskData.floodRisk}
                    </Badge>
                  </div>
                  <Progress value={getRiskValue(riskData.floodRisk)} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      <Sun className="w-4 h-4 text-orange-600" />
                      Heatwave Risk
                    </span>
                    <Badge className={getRiskColor(riskData.heatwaveRisk)}>
                      {riskData.heatwaveRisk}
                    </Badge>
                  </div>
                  <Progress value={getRiskValue(riskData.heatwaveRisk)} />
                </div>
              </CardContent>
            </Card>

            {riskData.alerts && riskData.alerts.length > 0 && (
              <Card className="border-none shadow-lg border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2 text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                    Active Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {riskData.alerts.map((alert: any, idx: number) => (
                    <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <Badge className="bg-red-500 mb-2">{alert.type.toUpperCase()}</Badge>
                      <p className="text-sm text-gray-700">{alert.message}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {riskData.recommendations.map((rec: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Wind className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
