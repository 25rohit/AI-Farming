import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DollarSign, Check, FileText, ExternalLink, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export default function SubsidyChecker({ language }: { language: string }) {
  const [formData, setFormData] = useState({
    landSize: '',
    cropType: '',
    incomeCategory: '',
    farmerType: 'regular'
  });
  const [eligibility, setEligibility] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!formData.landSize) {
      toast.error('Please enter land size');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8bff1720/check-subsidy`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            landSize: parseFloat(formData.landSize),
            cropType: formData.cropType,
            incomeCategory: formData.incomeCategory,
            farmerType: formData.farmerType
          })
        }
      );

      const data = await response.json();
      setEligibility(data);
      toast.success('Eligibility check complete!');
    } catch (error) {
      console.error('Subsidy check error:', error);
      toast.error('Failed to check eligibility');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <DollarSign className="w-8 h-8 text-green-600" />
          Automatic Subsidy Eligibility Checker
        </h2>
        <p className="text-gray-600 mt-2">
          Check eligibility for PM-KISAN, PMFBY, and other government schemes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Enter Details</CardTitle>
            <CardDescription>Provide your farm information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Land Size (acres)</Label>
              <Input
                type="number"
                value={formData.landSize}
                onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                placeholder="e.g., 2.5"
              />
            </div>

            <div>
              <Label>Crop Type</Label>
              <Select value={formData.cropType} onValueChange={(val) => setFormData({ ...formData, cropType: val })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Income Category</Label>
              <Select value={formData.incomeCategory} onValueChange={(val) => setFormData({ ...formData, incomeCategory: val })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bpl">Below Poverty Line</SelectItem>
                  <SelectItem value="small">Small Farmer</SelectItem>
                  <SelectItem value="marginal">Marginal Farmer</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Farmer Type</Label>
              <Select value={formData.farmerType} onValueChange={(val) => setFormData({ ...formData, farmerType: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="organic">Organic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleCheck}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                'Check Eligibility'
              )}
            </Button>
          </CardContent>
        </Card>

        {eligibility && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card className="border-none shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Eligibility Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-sm opacity-90">Total Estimated Benefits</p>
                  <h3 className="text-4xl font-bold mt-2">₹{eligibility.totalEstimatedBenefit.toLocaleString()}</h3>
                  <p className="text-sm opacity-90 mt-1">per year</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm">Eligible Schemes ({eligibility.eligibleSchemes?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {eligibility.eligibleSchemes?.map((scheme: any, idx: number) => (
                    <AccordionItem key={idx} value={`scheme-${idx}`}>
                      <AccordionTrigger className="text-left">
                        <div>
                          <p className="font-semibold">{scheme.name}</p>
                          <Badge className="bg-green-500 mt-1">{scheme.benefit}</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          <p className="text-sm text-gray-700">
                            <strong>How to Apply:</strong><br />
                            {scheme.howToApply}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {eligibility.nextSteps?.map((step: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle>Popular Government Schemes</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'PM-KISAN', amount: '₹6,000/year', icon: DollarSign },
            { name: 'PMFBY Insurance', amount: '2% premium', icon: FileText },
            { name: 'Soil Health Card', amount: 'Free', icon: Check }
          ].map((scheme, idx) => (
            <Card key={idx} className="border border-green-200">
              <CardContent className="p-4">
                <scheme.icon className="w-8 h-8 text-green-600 mb-3" />
                <h4 className="font-semibold">{scheme.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{scheme.amount}</p>
                <Button variant="link" size="sm" className="mt-2 p-0 h-auto text-blue-600">
                  Learn more <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
