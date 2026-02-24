import React, { useState } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export default function InsuranceRisk({ language }: { language: string }) {
  const [formData, setFormData] = useState({ cropType: '', location: '', landSize: '', soilType: '' });
  const [risk, setRisk] = useState<any>(null);

  const handleAnalyze = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8bff1720/insurance-risk`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ ...formData, landSize: parseFloat(formData.landSize), season: 'Kharif' })
        }
      );
      const data = await response.json();
      setRisk(data);
      toast.success('Risk analysis complete!');
    } catch (error) {
      toast.error('Analysis failed');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-3">
        <Shield className="w-8 h-8 text-blue-600" />
        Crop Insurance Risk Prediction
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Farm Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Crop Type</Label>
              <Select value={formData.cropType} onValueChange={(val) => setFormData({ ...formData, cropType: val })}>
                <SelectTrigger><SelectValue placeholder="Select crop" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Land Size (acres)</Label>
              <Input type="number" value={formData.landSize} onChange={(e) => setFormData({ ...formData, landSize: e.target.value })} />
            </div>
            <div>
              <Label>Soil Type</Label>
              <Input value={formData.soilType} onChange={(e) => setFormData({ ...formData, soilType: e.target.value })} />
            </div>
            <Button onClick={handleAnalyze} className="w-full bg-blue-600">Analyze Risk</Button>
          </CardContent>
        </Card>

        {risk && (
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
            <CardHeader><CardTitle>Risk Assessment</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <p className="text-sm opacity-90">Crop Failure Probability</p>
                <h3 className="text-5xl font-bold mt-2">{risk.failureProbability}%</h3>
                <Badge className={`mt-2 ${risk.riskCategory === 'High' ? 'bg-red-500' : risk.riskCategory === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                  {risk.riskCategory} Risk
                </Badge>
              </div>
              <div className="space-y-2">
                {risk.insurancePlans?.map((plan: any, idx: number) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                    <h4 className="font-semibold">{plan.name}</h4>
                    <p className="text-sm">Premium: ₹{plan.premium} | Coverage: ₹{plan.coverage}</p>
                    {plan.recommended && <Badge className="mt-2 bg-green-500">Recommended</Badge>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
