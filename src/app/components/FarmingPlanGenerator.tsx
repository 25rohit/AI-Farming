import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, CheckCircle, Loader2, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export default function FarmingPlanGenerator({ language }: { language: string }) {
  const [formData, setFormData] = useState({
    location: '',
    soilType: '',
    budget: '',
    season: 'kharif'
  });
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8bff1720/generate-farming-plan`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            ...formData,
            budget: parseFloat(formData.budget) || 50000,
            cropHistory: []
          })
        }
      );

      const data = await response.json();
      setPlan(data);
      toast.success('Farming plan generated!');
    } catch (error) {
      console.error('Plan generation error:', error);
      toast.error('Failed to generate plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Calendar className="w-8 h-8 text-purple-600" />
          AI Personalized Farming Plan Generator
        </h2>
        <p className="text-gray-600 mt-2">
          Complete 6-month plan with weekly tasks based on your farm conditions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Farm Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Your location"
              />
            </div>

            <div>
              <Label>Soil Type</Label>
              <Select value={formData.soilType} onValueChange={(val) => setFormData({ ...formData, soilType: val })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alluvial">Alluvial</SelectItem>
                  <SelectItem value="black">Black Soil</SelectItem>
                  <SelectItem value="red">Red Soil</SelectItem>
                  <SelectItem value="laterite">Laterite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Budget (₹)</Label>
              <Input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="e.g., 50000"
              />
            </div>

            <div>
              <Label>Season</Label>
              <Select value={formData.season} onValueChange={(val) => setFormData({ ...formData, season: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                  <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                  <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Plan'
              )}
            </Button>
          </CardContent>
        </Card>

        {plan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-none shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
              <CardHeader>
                <CardTitle>Recommended Plan</CardTitle>
                <CardDescription className="text-white/80">
                  Duration: {plan.duration}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                  <p className="text-sm opacity-90">Recommended Crop</p>
                  <h3 className="text-3xl font-bold mt-1">{plan.selectedCrop}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                    <p className="text-xs opacity-90">Total Cost</p>
                    <p className="text-xl font-bold mt-1">₹{plan.totalEstimatedCost?.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                    <p className="text-xs opacity-90">Expected Revenue</p>
                    <p className="text-xl font-bold mt-1">₹{plan.expectedRevenue?.toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                  <p className="text-sm opacity-90 mb-2">Profit Margin</p>
                  <Progress value={parseFloat(plan.profitMargin) || 0} className="h-3 bg-white/20" />
                  <p className="text-right text-sm font-bold mt-1">{plan.profitMargin}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {plan && (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Weekly Task Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {plan.weeklyTasks?.map((task: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-4 bg-purple-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                      W{task.week}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{task.task}</h4>
                      <p className="text-sm text-gray-600">Week {task.week}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Cost</p>
                    <p className="text-lg font-bold text-purple-600">₹{task.cost}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
