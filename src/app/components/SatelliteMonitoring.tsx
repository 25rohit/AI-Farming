import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Satellite, MapPin, Loader2, AlertTriangle, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export default function SatelliteMonitoring({ language }: { language: string }) {
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    cropType: '',
    fieldArea: ''
  });
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!formData.latitude || !formData.longitude) {
      toast.error('Please enter coordinates');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8bff1720/satellite-analysis`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude),
            cropType: formData.cropType,
            fieldArea: parseFloat(formData.fieldArea) || 5
          })
        }
      );

      const data = await response.json();
      setAnalysis(data);
      toast.success('Satellite analysis complete!');
    } catch (error) {
      console.error('Satellite analysis error:', error);
      toast.error('Failed to analyze');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Satellite className="w-8 h-8 text-blue-600" />
          Satellite Crop Health Monitoring
        </h2>
        <p className="text-gray-600 mt-2">
          ISRO & NASA satellite data with NDVI analysis for crop health detection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Field Coordinates</CardTitle>
            <CardDescription>Enter your field location for satellite scan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Latitude</Label>
              <Input
                type="number"
                step="0.000001"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                placeholder="e.g., 30.7046"
              />
            </div>

            <div>
              <Label>Longitude</Label>
              <Input
                type="number"
                step="0.000001"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                placeholder="e.g., 76.7179"
              />
            </div>

            <div>
              <Label>Crop Type (Optional)</Label>
              <Input
                value={formData.cropType}
                onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                placeholder="e.g., Rice"
              />
            </div>

            <div>
              <Label>Field Area (acres)</Label>
              <Input
                type="number"
                value={formData.fieldArea}
                onChange={(e) => setFormData({ ...formData, fieldArea: e.target.value })}
                placeholder="e.g., 5"
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
                  Scanning...
                </>
              ) : (
                <>
                  <Satellite className="w-4 h-4 mr-2" />
                  Start Satellite Scan
                </>
              )}
            </Button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <p className="text-blue-800">
                <strong>Tip:</strong> You can find your coordinates using Google Maps by right-clicking on your field location
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <Card className="border-none shadow-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
              <CardHeader>
                <CardTitle>NDVI Analysis Results</CardTitle>
                <CardDescription className="text-white/80">
                  Normalized Difference Vegetation Index
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
                  <p className="text-sm opacity-90">NDVI Value</p>
                  <h3 className="text-5xl font-bold mt-2">{analysis.ndvi}</h3>
                  <Badge className={`mt-3 ${
                    analysis.healthStatus === 'Excellent' ? 'bg-green-500' :
                    analysis.healthStatus === 'Good' ? 'bg-blue-500' :
                    analysis.healthStatus === 'Moderate' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}>
                    {analysis.healthStatus}
                  </Badge>
                </div>

                {analysis.cropStress && (
                  <div className="bg-red-500/20 border border-red-300 rounded-lg p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Crop Stress Detected</p>
                      <p className="text-sm opacity-90">Immediate action recommended</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                    <p className="text-xs opacity-90">Dry Patches</p>
                    <p className="text-2xl font-bold mt-1">{analysis.dryPatches}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                    <p className="text-xs opacity-90">Disease Risk</p>
                    <p className="text-2xl font-bold mt-1">{analysis.diseaseRisk}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {analysis.recommendations.map((rec: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {analysis.stressAreas.length > 0 && (
              <Card className="border-none shadow-lg border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="text-sm text-orange-600">Stressed Areas Detected</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysis.stressAreas.map((area: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="mr-2">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </div>

      {/* Satellite Image Placeholder */}
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src="https://images.unsplash.com/photo-1720200793798-947f201e2028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBlYXJ0aCUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc3MTIyMTkwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Satellite View"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Advanced Satellite Analytics</h3>
              <p className="text-sm opacity-90">Integrated with ISRO's Bhuvan and NASA's Landsat for real-time crop monitoring</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
