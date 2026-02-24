import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingUp, TrendingDown, PieChart, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export default function FinancialManager({ language }: { language: string }) {
  const [records, setRecords] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const farmerId = 'farmer_demo_123';

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8bff1720/finance/${farmerId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const data = await response.json();
      setRecords(data.records || []);
      setSummary(data.summary);
    } catch (error) {
      console.error('Failed to fetch financial data:', error);
    }
  };

  const handleAddRecord = async () => {
    if (!formData.amount || !formData.category) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8bff1720/finance/record`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            farmerId,
            ...formData,
            amount: parseFloat(formData.amount)
          })
        }
      );
      toast.success('Record added successfully!');
      setShowDialog(false);
      fetchFinancialData();
      setFormData({
        type: 'expense',
        category: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Failed to add record:', error);
      toast.error('Failed to add record');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Calculator className="w-8 h-8 text-blue-600" />
            Farm Financial Management
          </h2>
          <p className="text-gray-600 mt-2">
            Track expenses, income, and profit - Tally for Farmers
          </p>
        </div>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Financial Record</DialogTitle>
              <DialogDescription>Track your farming expenses and income</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Type</Label>
                <Select value={formData.type} onValueChange={(val) => setFormData({ ...formData, type: val })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.type === 'income' ? (
                      <>
                        <SelectItem value="crop_sale">Crop Sale</SelectItem>
                        <SelectItem value="subsidy">Subsidy</SelectItem>
                        <SelectItem value="other_income">Other Income</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="seeds">Seeds</SelectItem>
                        <SelectItem value="fertilizer">Fertilizer</SelectItem>
                        <SelectItem value="pesticide">Pesticide</SelectItem>
                        <SelectItem value="labor">Labor</SelectItem>
                        <SelectItem value="irrigation">Irrigation</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Amount (₹)</Label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional details"
                />
              </div>

              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <Button onClick={handleAddRecord} className="w-full">
                Add Record
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Income</p>
                  <h3 className="text-2xl font-bold text-green-600 mt-1">₹{summary.totalIncome.toLocaleString()}</h3>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Expense</p>
                  <h3 className="text-2xl font-bold text-red-600 mt-1">₹{summary.totalExpense.toLocaleString()}</h3>
                </div>
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Net Profit</p>
                  <h3 className={`text-2xl font-bold mt-1 ${summary.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{summary.profit.toLocaleString()}
                  </h3>
                </div>
                <PieChart className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Profit Margin</p>
                  <h3 className="text-2xl font-bold text-blue-600 mt-1">{summary.profitMargin}%</h3>
                </div>
                <Calculator className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {records.length === 0 ? (
              <p className="text-center text-gray-600 py-8">No records yet. Add your first transaction!</p>
            ) : (
              records.slice(0, 10).map((record, idx) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Badge className={record.type === 'income' ? 'bg-green-500' : 'bg-red-500'}>
                        {record.type}
                      </Badge>
                      <h4 className="font-semibold">{record.category}</h4>
                    </div>
                    {record.description && (
                      <p className="text-sm text-gray-600 mt-1">{record.description}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{new Date(record.date).toLocaleDateString()}</p>
                  </div>
                  <div className={`text-xl font-bold ${record.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {record.type === 'income' ? '+' : '-'}₹{record.amount.toLocaleString()}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
