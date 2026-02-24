import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, DollarSign, Target, Award, BookOpen, Lightbulb,
  PieChart, ArrowUpRight, ArrowDownRight, Calendar, Calculator,
  Wallet, Package, ShoppingCart, Users, Zap, Check, AlertCircle,
  BarChart3, LineChart, TrendingDown, Plus, Minus, Info
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

const translations = {
  en: {
    title: 'Farmer Income Profit Guide',
    subtitle: 'Complete awareness program to maximize farmer income and profitability',
    incomeDoubling: 'Income Doubling Strategy',
    costReduction: 'Cost Reduction Tips',
    marketStrategies: 'Market Strategies',
    valueAddition: 'Value Addition',
    revenueStreams: 'Multiple Revenue Streams',
    smartFarming: 'Smart Farming Techniques',
    currentIncome: 'Current Annual Income',
    targetIncome: 'Target Income',
    calculate: 'Calculate Path',
    strategies: 'Strategies to Increase Income',
    savingsOpportunity: 'Annual Savings Opportunity',
    revenueBoost: 'Potential Revenue Boost'
  },
  hi: {
    title: 'किसान आय लाभ मार्गदर्शिका',
    subtitle: 'किसान आय और लाभप्रदता को अधिकतम करने के लिए पूर्ण जागरूकता कार्यक्रम',
    incomeDoubling: 'आय दोगुना करने की रणनीति',
    costReduction: 'लागत कम करने के टिप्स',
    marketStrategies: 'बाजार रणनीतियाँ',
    valueAddition: 'मूल्य संवर्धन',
    revenueStreams: 'कई राजस्व स्रोत',
    smartFarming: 'स्मार्ट खेती तकनीक',
    currentIncome: 'वर्तमान वार्षिक आय',
    targetIncome: 'लक्षित आय',
    calculate: 'पथ गणना करें',
    strategies: 'आय बढ़ाने की रणनीतियाँ',
    savingsOpportunity: 'वार्षिक बचत अवसर',
    revenueBoost: 'संभावित राजस्व वृद्धि'
  },
  te: {
    title: 'రైతు ఆదాయ లాభ మార్గదర్శి',
    subtitle: 'రైతు ఆదాయం మరియు లాభదాయకతను పెంచడానికి పూర్తి అవగాహన కార్యక్రమం',
    incomeDoubling: 'ఆదాయం రెట్టింపు చేసే వ్యూహం',
    costReduction: 'ఖర్చు తగ్గింపు చిట్కాలు',
    marketStrategies: 'మార్కెట్ వ్యూహాలు',
    valueAddition: 'విలువ జోడింపు',
    revenueStreams: 'బహుళ ఆదాయ మార్గాలు',
    smartFarming: 'స్మార్ట్ వ్యవసాయ పద్ధతులు',
    currentIncome: 'ప్రస్తుత వార్షిక ఆదాయం',
    targetIncome: 'లక్ష్య ఆదాయం',
    calculate: 'మార్గం లెక్కించండి',
    strategies: 'ఆదాయం పెంచే వ్యూహాలు',
    savingsOpportunity: 'వార్షిక పొదుపు అవకాశం',
    revenueBoost: 'సంభావ్య ఆదాయ పెరుగుదల'
  },
  ta: {
    title: 'விவசாயி வருமான லாப வழிகாட்டி',
    subtitle: 'விவசாயி வருமானம் மற்றும் லாபத்தை அதிகரிக்க முழுமையான விழிப்புணர்வு திட்டம்',
    incomeDoubling: 'வருமானம் இருமடங்கு உத்தி',
    costReduction: 'செலவு குறைப்பு குறிப்புகள்',
    marketStrategies: 'சந்தை உத்திகள்',
    valueAddition: 'மதிப்பு கூட்டல்',
    revenueStreams: 'பல வருமான வழிகள்',
    smartFarming: 'ஸ்மார்ட் விவசாய நுட்பங்கள்',
    currentIncome: 'தற்போதைய ஆண்டு வருமானம்',
    targetIncome: 'இலக்கு வருமானம்',
    calculate: 'பாதையை கணக்கிடு',
    strategies: 'வருமானம் அதிகரிக்கும் உத்திகள்',
    savingsOpportunity: 'ஆண்டு சேமிப்பு வாய்ப்பு',
    revenueBoost: 'சாத்தியமான வருமான வளர்ச்சி'
  },
  mr: {
    title: 'शेतकरी उत्पन्न नफा मार्गदर्शक',
    subtitle: 'शेतकरी उत्पन्न आणि नफा वाढवण्यासाठी संपूर्ण जागरूकता कार्यक्रम',
    incomeDoubling: 'उत्पन्न दुप्पट करण्याची रणनीती',
    costReduction: 'खर्च कमी करण्याच्या टिपा',
    marketStrategies: 'बाजार रणनीती',
    valueAddition: 'मूल्य वर्धन',
    revenueStreams: 'अनेक उत्पन्न प्रवाह',
    smartFarming: 'स्मार्ट शेती तंत्र',
    currentIncome: 'सध्याचे वार्षिक उत्पन्न',
    targetIncome: 'लक्ष्य उत्पन्न',
    calculate: 'मार्ग गणना करा',
    strategies: 'उत्पन्न वाढवण्याच्या रणनीती',
    savingsOpportunity: 'वार्षिक बचत संधी',
    revenueBoost: 'संभाव्य उत्पन्न वाढ'
  }
};

interface Strategy {
  title: string;
  titleHindi?: string;
  description: string;
  impact: string;
  implementation: string[];
  expectedGain: string;
  timeframe: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  icon: any;
  color: string;
}

export default function FarmerProfitGuide({ language }: { language: string }) {
  const [currentIncome, setCurrentIncome] = useState('');
  const [landSize, setLandSize] = useState('');
  const [cropType, setCropType] = useState('');
  const [showCalculation, setShowCalculation] = useState(false);
  const [profitPath, setProfitPath] = useState<any>(null);

  const t = translations[language as keyof typeof translations] || translations.en;

  const strategies: Strategy[] = [
    {
      title: 'Adopt Precision Agriculture with AI',
      titleHindi: 'एआई के साथ सटीक खेती अपनाएं',
      description: 'Use AI-based systems for yield prediction, pest detection, and irrigation optimization to reduce waste and increase productivity.',
      impact: '20-30% increase in yield',
      implementation: [
        'Use this AgriBot AI app for predictions',
        'Install drip irrigation with sensors',
        'Monitor crop health via satellite (NDVI)',
        'Use weather forecasting for planning',
        'Apply fertilizers based on soil testing'
      ],
      expectedGain: '₹25,000 - ₹40,000 per acre annually',
      timeframe: '6-12 months',
      difficulty: 'medium',
      category: 'technology',
      icon: Zap,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Crop Diversification & Rotation',
      titleHindi: 'फसल विविधीकरण और चक्र',
      description: 'Grow multiple crops instead of mono-cropping to reduce risk and improve soil health.',
      impact: '15-25% income boost',
      implementation: [
        'Follow crop rotation recommendations',
        'Grow legumes to restore soil nitrogen',
        'Intercropping for better land utilization',
        'Seasonal crop planning',
        'Grow vegetables alongside main crop'
      ],
      expectedGain: '₹15,000 - ₹30,000 annually',
      timeframe: '1 season',
      difficulty: 'easy',
      category: 'farming',
      icon: Target,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Direct Market Access (e-NAM)',
      titleHindi: 'सीधी बाजार पहुंच (ई-नाम)',
      description: 'Bypass middlemen and sell directly to buyers through e-NAM platform for better prices.',
      impact: '10-20% better price realization',
      implementation: [
        'Register on e-NAM portal',
        'Get produce graded',
        'Sell to highest bidder online',
        'Use AgriBot marketplace feature',
        'Connect with bulk buyers directly'
      ],
      expectedGain: '₹8,000 - ₹20,000 per season',
      timeframe: '1-2 months',
      difficulty: 'easy',
      category: 'marketing',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Value Addition & Processing',
      titleHindi: 'मूल्य संवर्धन और प्रसंस्करण',
      description: 'Process raw produce into packaged products for 2-3x higher margins.',
      impact: '100-200% margin increase',
      implementation: [
        'Form Farmer Producer Organization (FPO)',
        'Set up small processing unit',
        'Package and brand products',
        'Obtain organic/quality certifications',
        'Sell in retail markets'
      ],
      expectedGain: '₹50,000 - ₹1,00,000 annually',
      timeframe: '6-18 months',
      difficulty: 'hard',
      category: 'value-add',
      icon: Package,
      color: 'from-orange-500 to-red-600'
    },
    {
      title: 'Organic Farming Premium',
      titleHindi: 'जैविक खेती प्रीमियम',
      description: 'Get organic certification and earn 30-50% premium on produce.',
      impact: '30-50% price premium',
      implementation: [
        'Stop chemical inputs for 3 years',
        'Apply for PKVY scheme (₹50,000/hectare)',
        'Get PGS/NPOP certification',
        'Market as organic produce',
        'Build direct customer base'
      ],
      expectedGain: '₹35,000 - ₹60,000 per acre',
      timeframe: '3 years for certification',
      difficulty: 'medium',
      category: 'farming',
      icon: Award,
      color: 'from-lime-500 to-green-600'
    },
    {
      title: 'Allied Income Activities',
      titleHindi: 'सहायक आय गतिविधियाँ',
      description: 'Add dairy, poultry, beekeeping, or fish farming for year-round income.',
      impact: '₹20,000 - ₹50,000 additional income',
      implementation: [
        'Start with 2-3 milch animals (dairy)',
        'Poultry farming (100-500 birds)',
        'Beekeeping (10-20 boxes)',
        'Fish farming in small ponds',
        'Vermicompost production'
      ],
      expectedGain: '₹20,000 - ₹50,000 annually',
      timeframe: '3-6 months',
      difficulty: 'medium',
      category: 'diversification',
      icon: Users,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Reduce Input Costs',
      titleHindi: 'इनपुट लागत कम करें',
      description: 'Use bio-fertilizers, farmyard manure, and integrated pest management to cut costs.',
      impact: '25-40% reduction in input costs',
      implementation: [
        'Make organic compost on-farm',
        'Use neem-based pesticides',
        'Adopt integrated pest management (IPM)',
        'Soil testing for optimal fertilizer use',
        'Rainwater harvesting for irrigation'
      ],
      expectedGain: '₹10,000 - ₹25,000 savings',
      timeframe: '3-6 months',
      difficulty: 'easy',
      category: 'cost-saving',
      icon: Calculator,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      title: 'Government Scheme Benefits',
      titleHindi: 'सरकारी योजना लाभ',
      description: 'Maximize benefits from PM-KISAN, PMFBY, PMKSY, and other schemes.',
      impact: '₹15,000 - ₹60,000 direct benefit',
      implementation: [
        'Register for PM-KISAN (₹6,000/year)',
        'Take PMFBY crop insurance',
        'Get Soil Health Card (free)',
        'Apply for PMKSY irrigation subsidy',
        'Join PKVY for organic farming support'
      ],
      expectedGain: '₹15,000 - ₹60,000 annually',
      timeframe: '1-3 months',
      difficulty: 'easy',
      category: 'subsidy',
      icon: DollarSign,
      color: 'from-green-600 to-teal-600'
    },
    {
      title: 'Contract Farming',
      titleHindi: 'अनुबंध खेती',
      description: 'Partner with companies for assured price and market before planting.',
      impact: 'Assured income, reduced risk',
      implementation: [
        'Identify reputable agri-companies',
        'Sign contract with clear terms',
        'Follow quality standards',
        'Get technical support from company',
        'Receive guaranteed price'
      ],
      expectedGain: '₹20,000 - ₹40,000 per acre',
      timeframe: '1 season',
      difficulty: 'medium',
      category: 'marketing',
      icon: BookOpen,
      color: 'from-pink-500 to-rose-600'
    },
    {
      title: 'Mechanization & Custom Hiring',
      titleHindi: 'यांत्रिकीकरण और कस्टम किराए पर लेना',
      description: 'Rent modern equipment instead of buying, or buy and rent out to others.',
      impact: '₹15,000 - ₹30,000 savings/revenue',
      implementation: [
        'Use Custom Hiring Centers (CHC)',
        'Rent tractors, harvesters, planters',
        'Form community ownership groups',
        'If buying, rent out to neighbors',
        'Reduce labor costs'
      ],
      expectedGain: '₹15,000 - ₹30,000 annually',
      timeframe: '1 month',
      difficulty: 'easy',
      category: 'cost-saving',
      icon: Lightbulb,
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  const calculateProfitPath = async () => {
    if (!currentIncome || !landSize) {
      toast.error('Please enter current income and land size');
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8bff1720/calculate-profit-path`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            currentIncome: parseFloat(currentIncome),
            landSize: parseFloat(landSize),
            cropType: cropType || 'rice',
            language
          })
        }
      );

      const data = await response.json();
      
      if (data.error) {
        toast.error(data.error);
        return;
      }

      // Map backend strategies to component strategies for display
      const applicableStrategies = strategies.slice(0, 5);
      
      setProfitPath({
        currentIncome: data.currentIncome,
        targetIncome: data.targetIncome,
        projectedIncome: data.projectedIncome,
        potentialGain: data.potentialGain,
        achievementPercent: data.achievementPercent,
        strategies: applicableStrategies,
        timeline: data.timeline,
        quickWins: applicableStrategies.filter(s => s.difficulty === 'easy'),
        mediumTerm: applicableStrategies.filter(s => s.difficulty === 'medium'),
        longTerm: applicableStrategies.filter(s => s.difficulty === 'hard')
      });

      setShowCalculation(true);
      toast.success('Income doubling path calculated and saved!');
    } catch (error) {
      console.error('Error calculating profit path:', error);
      toast.error('Failed to calculate profit path');
    }
  };

  const categoryStats = {
    technology: { count: strategies.filter(s => s.category === 'technology').length, icon: Zap },
    farming: { count: strategies.filter(s => s.category === 'farming').length, icon: Target },
    marketing: { count: strategies.filter(s => s.category === 'marketing').length, icon: ShoppingCart },
    'cost-saving': { count: strategies.filter(s => s.category === 'cost-saving').length, icon: Calculator }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-green-600" />
          {t.title}
        </h2>
        <p className="text-gray-600 mt-2">{t.subtitle}</p>
      </motion.div>

      {/* Income Calculator */}
      <Card className="border-none shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            {t.incomeDoubling}
          </CardTitle>
          <CardDescription className="text-white/90">
            Calculate your personalized path to double your income
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-white">{t.currentIncome} (₹/year)</Label>
              <Input
                type="number"
                value={currentIncome}
                onChange={(e) => setCurrentIncome(e.target.value)}
                placeholder="e.g., 100000"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
            <div>
              <Label className="text-white">Land Size (acres)</Label>
              <Input
                type="number"
                value={landSize}
                onChange={(e) => setLandSize(e.target.value)}
                placeholder="e.g., 2.5"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
            <div>
              <Label className="text-white">Primary Crop</Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="pulses">Pulses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={calculateProfitPath}
            className="w-full bg-white text-green-600 hover:bg-white/90"
          >
            <Calculator className="w-4 h-4 mr-2" />
            {t.calculate}
          </Button>
        </CardContent>
      </Card>

      {/* Calculation Results */}
      {showCalculation && profitPath && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Progress Card */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Income</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ₹{profitPath.currentIncome.toLocaleString()}
                    </p>
                  </div>
                  <ArrowUpRight className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Projected Income</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{profitPath.projectedIncome.toLocaleString()}
                    </p>
                  </div>
                  <ArrowUpRight className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Target (2x)</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{profitPath.targetIncome.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress to Target</span>
                    <span className="text-sm font-semibold text-green-600">
                      {profitPath.achievementPercent.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={profitPath.achievementPercent} className="h-3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <p className="text-sm text-gray-600">Potential Gain</p>
                    </div>
                    <p className="text-xl font-bold text-green-600">
                      +₹{profitPath.potentialGain.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <p className="text-sm text-gray-600">Timeline</p>
                    </div>
                    <p className="text-xl font-bold text-blue-600">{profitPath.timeline}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-purple-600" />
                      <p className="text-sm text-gray-600">Strategies</p>
                    </div>
                    <p className="text-xl font-bold text-purple-600">
                      {profitPath.strategies.length}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Roadmap */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Implementation Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="quick">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="quick">
                    Quick Wins ({profitPath.quickWins.length})
                  </TabsTrigger>
                  <TabsTrigger value="medium">
                    Medium Term ({profitPath.mediumTerm.length})
                  </TabsTrigger>
                  <TabsTrigger value="long">
                    Long Term ({profitPath.longTerm.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="quick" className="space-y-4">
                  {profitPath.quickWins.map((strategy: Strategy, idx: number) => (
                    <StrategyCard key={idx} strategy={strategy} language={language} />
                  ))}
                </TabsContent>

                <TabsContent value="medium" className="space-y-4">
                  {profitPath.mediumTerm.map((strategy: Strategy, idx: number) => (
                    <StrategyCard key={idx} strategy={strategy} language={language} />
                  ))}
                </TabsContent>

                <TabsContent value="long" className="space-y-4">
                  {profitPath.longTerm.map((strategy: Strategy, idx: number) => (
                    <StrategyCard key={idx} strategy={strategy} language={language} />
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* All Strategies Grid */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle>{t.strategies}</CardTitle>
          <CardDescription>
            Proven strategies to increase farm income and profitability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {strategies.map((strategy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StrategyCard strategy={strategy} language={language} compact />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Stories */}
      <Card className="border-none shadow-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-6 h-6" />
            Real Success Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: 'Ramesh Kumar (Maharashtra)',
                achievement: 'Income increased from ₹80,000 to ₹1,85,000',
                method: 'Organic farming + Direct marketing'
              },
              {
                name: 'Lakshmi Devi (Tamil Nadu)',
                achievement: 'Additional ₹60,000 from dairy',
                method: 'Allied activities + Government schemes'
              },
              {
                name: 'Suresh Patel (Gujarat)',
                achievement: 'Saved ₹35,000 in input costs',
                method: 'Precision agriculture + IPM'
              }
            ].map((story, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                <p className="font-semibold mb-2">{story.name}</p>
                <p className="text-sm mb-2 flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {story.achievement}
                </p>
                <Badge className="bg-white/20 hover:bg-white/30 text-xs">
                  {story.method}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Strategy Card Component
function StrategyCard({ 
  strategy, 
  language, 
  compact = false 
}: { 
  strategy: Strategy; 
  language: string; 
  compact?: boolean; 
}) {
  const [expanded, setExpanded] = useState(false);

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700'
  };

  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-all">
      <CardHeader className={`bg-gradient-to-r ${strategy.color} text-white rounded-t-lg pb-3`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="bg-white/20 backdrop-blur-lg p-2 rounded-lg">
              <strategy.icon className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base">
                {language === 'hi' && strategy.titleHindi ? strategy.titleHindi : strategy.title}
              </CardTitle>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <Badge className={`${difficultyColors[strategy.difficulty]} border-0 text-xs`}>
            {strategy.difficulty.toUpperCase()}
          </Badge>
          <Badge className="bg-white/30 hover:bg-white/40 text-xs">
            {strategy.timeframe}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <p className="text-sm text-gray-700">{strategy.description}</p>

        <div className="flex items-center justify-between py-2 border-t border-b border-gray-200">
          <div>
            <p className="text-xs text-gray-600">Expected Gain</p>
            <p className="text-lg font-bold text-green-600">{strategy.expectedGain}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600">Impact</p>
            <p className="text-sm font-semibold text-blue-600">{strategy.impact}</p>
          </div>
        </div>

        {(!compact || expanded) && (
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1">
                <Check className="w-4 h-4 text-green-600" />
                Implementation Steps:
              </p>
              <ul className="space-y-1">
                {strategy.implementation.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                    <Plus className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {compact && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="w-full"
          >
            {expanded ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
