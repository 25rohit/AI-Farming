import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Plus, MessageSquare, Truck, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export default function Marketplace({ language }: { language: string }) {
  const [listings, setListings] = useState<any[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [formData, setFormData] = useState({
    cropType: '',
    quantity: '',
    pricePerUnit: '',
    location: ''
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8bff1720/marketplace/listings`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const data = await response.json();
      setListings(data.listings || []);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
  };

  const handleCreateListing = async () => {
    if (!formData.cropType || !formData.quantity || !formData.pricePerUnit) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8bff1720/marketplace/create-listing`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            farmerId: 'farmer_' + Date.now(),
            ...formData,
            quantity: parseFloat(formData.quantity),
            pricePerUnit: parseFloat(formData.pricePerUnit),
            harvestDate: new Date().toISOString()
          })
        }
      );
      toast.success('Listing created successfully!');
      setShowCreateDialog(false);
      fetchListings();
      setFormData({ cropType: '', quantity: '', pricePerUnit: '', location: '' });
    } catch (error) {
      console.error('Failed to create listing:', error);
      toast.error('Failed to create listing');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-green-600" />
            Direct Farmer-to-Buyer Marketplace
          </h2>
          <p className="text-gray-600 mt-2">
            Sell directly to buyers • No middlemen • Better profits
          </p>
        </div>

        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
              <Plus className="w-4 h-4 mr-2" />
              Create Listing
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Listing</DialogTitle>
              <DialogDescription>List your produce for direct sale to buyers</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
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
                <Label>Quantity (quintals)</Label>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </div>

              <div>
                <Label>Price per Quintal (₹)</Label>
                <Input
                  type="number"
                  value={formData.pricePerUnit}
                  onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Village, District"
                />
              </div>

              <Button onClick={handleCreateListing} className="w-full">
                Create Listing
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.length === 0 ? (
          <Card className="col-span-full border-none shadow-lg">
            <CardContent className="p-12 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">No listings yet</h3>
              <p className="text-gray-500">Be the first to list your produce!</p>
            </CardContent>
          </Card>
        ) : (
          listings.map((listing, idx) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="border-none shadow-lg hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{listing.cropType}</CardTitle>
                      <CardDescription>{listing.location}</CardDescription>
                    </div>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600">Quantity</p>
                      <p className="text-lg font-bold">{listing.quantity} qt</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Price</p>
                      <p className="text-lg font-bold text-green-600">₹{listing.pricePerUnit}/qt</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                    <Button className="flex-1 bg-green-600" size="sm">
                      <Truck className="w-4 h-4 mr-2" />
                      Buy
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <User className="w-3 h-3" />
                    <span>Farmer ID: {listing.farmerId?.substring(0, 12)}...</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      <Card className="border-none shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
        <CardHeader>
          <CardTitle>Why Direct Selling?</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">30-40%</div>
            <p className="text-sm opacity-90">Higher profit margins</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">₹0</div>
            <p className="text-sm opacity-90">No commission fees</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <p className="text-sm opacity-90">Market accessibility</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
