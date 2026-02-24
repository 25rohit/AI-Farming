import React from 'react';
import { PieChart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

export default function IncomeDashboard({ language }: { language: string }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-3">
        <PieChart className="w-8 h-8 text-blue-600" />
        Income Doubling Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardHeader><CardTitle>Current Income</CardTitle></CardHeader>
          <CardContent>
            <h3 className="text-4xl font-bold">₹1,24,000</h3>
            <p className="text-sm opacity-90 mt-2">per year</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
          <CardHeader><CardTitle>Target Income</CardTitle></CardHeader>
          <CardContent>
            <h3 className="text-4xl font-bold">₹2,48,000</h3>
            <p className="text-sm opacity-90 mt-2">by 2027</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
          <CardHeader><CardTitle>Progress</CardTitle></CardHeader>
          <CardContent>
            <h3 className="text-4xl font-bold">65%</h3>
            <Progress value={65} className="mt-3 h-2 bg-white/20" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Income Improvement Strategies</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { strategy: 'Better market price through AI prediction', impact: '+15%' },
            { strategy: 'Yield increase via satellite monitoring', impact: '+20%' },
            { strategy: 'Cost reduction through precise irrigation', impact: '+10%' },
            { strategy: 'Direct marketplace (no middlemen)', impact: '+30%' },
            { strategy: 'Government subsidies utilization', impact: '+10%' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm">{item.strategy}</span>
              <span className="font-bold text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {item.impact}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
