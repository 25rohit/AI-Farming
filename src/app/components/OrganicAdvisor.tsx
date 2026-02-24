import React from 'react';
import { Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function OrganicAdvisor({ language }: { language: string }) {
  const recipes = [
    { name: 'Neem Pesticide', ingredients: 'Neem leaves, water', process: 'Boil 1kg neem leaves in 5L water for 30 mins' },
    { name: 'Vermicompost', ingredients: 'Earthworms, organic waste', process: 'Layer organic waste with soil and earthworms' },
    { name: 'Jeevamrut', ingredients: 'Cow dung, urine, jaggery', process: 'Mix and ferment for 7 days' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-3">
        <Leaf className="w-8 h-8 text-green-600" />
        Organic Farming Advisor
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, idx) => (
          <Card key={idx}>
            <CardHeader><CardTitle className="text-lg">{recipe.name}</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2"><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p className="text-sm text-gray-700">{recipe.process}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
