import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, Leaf, Cloud, TrendingUp, ShoppingCart, AlertTriangle, 
  DollarSign, Calendar, BookOpen, Landmark, Droplet, Bug, 
  FileText, BarChart3, Users, Home, Menu, X, Globe, 
  ChevronRight, Check, Smartphone, MapPin, Sun, CloudRain,
  Wind, Thermometer, Target, Award, Shield, Zap,
  MessageSquare, Bell, Settings, LogOut, Calculator,
  PieChart, TrendingDown, ArrowUpRight, ArrowDownRight,
  Camera, Upload, Mic, MicOff, Volume2, Play
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Progress } from './components/ui/progress';
import { Badge } from './components/ui/badge';
import { Slider } from './components/ui/slider';
import { Switch } from './components/ui/switch';
import { Textarea } from './components/ui/textarea';
import { ScrollArea } from './components/ui/scroll-area';
import { Separator } from './components/ui/separator';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';
import YieldPrediction from './components/YieldPrediction';
import PricePredictor from './components/PricePredictor';
import GovernmentSchemes from './components/GovernmentSchemes';
import FarmerProfitGuide from './components/FarmerProfitGuide';
import Marketplace from './components/Marketplace';
import VoiceAssistant from './components/VoiceAssistant';
import ClimateRisk from './components/ClimateRisk';
import SubsidyChecker from './components/SubsidyChecker';
import FinancialManager from './components/FinancialManager';
import FarmingPlanGenerator from './components/FarmingPlanGenerator';
import InsuranceRisk from './components/InsuranceRisk';
import DiseaseAlert from './components/DiseaseAlert';
import OrganicAdvisor from './components/OrganicAdvisor';
import LearningHub from './components/LearningHub';
import CropRotation from './components/CropRotation';
import IncomeDashboard from './components/IncomeDashboard';
import PestDetection from './components/PestDetection';
import SoilTesting from './components/SoilTesting';
import IrrigationPlan from './components/IrrigationPlan';
import WeatherWidget from './components/WeatherWidget';

// Language translations
const translations = {
  en: {
    appName: 'RootBridge AI',
    welcome: 'Welcome to Advanced Agricultural Assistant',
    dashboard: 'Dashboard',
    yieldPrediction: 'Yield Prediction',
    market: 'Market Price',
    govtSchemes: 'Govt Schemes',
    profitGuide: 'Profit Guide',
    marketplace: 'Marketplace',
    voice: 'Voice Assistant',
    climate: 'Climate Risk',
    subsidy: 'Subsidy Checker',
    finance: 'Financial Manager',
    plan: 'Farming Plan',
    insurance: 'Crop Insurance',
    disease: 'Disease Alert',
    organic: 'Organic Farming',
    learning: 'Learning Hub',
    rotation: 'Crop Rotation',
    income: 'Income Dashboard',
    pest: 'Pest Detection',
    soil: 'Soil Testing',
    irrigation: 'Irrigation',
    weather: 'Weather',
    selectLanguage: 'Select Language',
    logout: 'Logout'
  },
  hi: {
    appName: 'एग्रीबॉट एआई',
    welcome: 'उन्नत कृषि सहायक में आपका स्वागत है',
    dashboard: 'डैशबोर्ड',
    yieldPrediction: 'उपज पूर्वानुमान',
    market: 'बाजार मूल्य',
    govtSchemes: 'सरकारी योजनाएं',
    profitGuide: 'लाभ मार्गदर्शिका',
    marketplace: 'बाजार',
    voice: 'वॉइस असिस्टेंट',
    climate: 'जलवायु जोखिम',
    subsidy: 'सब्सिडी चेकर',
    finance: 'वित्तीय प्रबंधक',
    plan: 'खेती की योजना',
    insurance: 'फसल बीमा',
    disease: 'रोग अलर्ट',
    organic: 'जैविक खेती',
    learning: 'सीखने का केंद्र',
    rotation: 'फसल चक्र',
    income: 'आय डैशबोर्ड',
    pest: 'कीट पहचान',
    soil: 'मिट्टी परीक्षण',
    irrigation: 'सिंचाई',
    weather: 'मौसम',
    selectLanguage: 'भाषा चुनें',
    logout: 'लॉगआउट'
  },
  te: {
    appName: 'అగ్రిబాట్ AI',
    welcome: 'అధునాతన వ్యవసాయ సహాయకుడికి స్వాగతం',
    dashboard: 'డాష్‌బోర్డ్',
    yieldPrediction: 'దిగుబడి అంచనా',
    market: 'మార్కెట్ ధర',
    govtSchemes: 'ప్రభుత్వ పథకాలు',
    profitGuide: 'లాభ మార్గదర్శి',
    marketplace: 'మార్కెట్‌ప్లేస్',
    voice: 'వాయిస్ అసిస్టెంట్',
    climate: 'వాతావరణ ప్రమాదం',
    subsidy: 'సబ్సిడీ చెకర్',
    finance: 'ఆర్థిక నిర్వాహకుడు',
    plan: 'వ్యవసాయ ప్రణాళిక',
    insurance: 'పంట బీమా',
    disease: 'వ్యాధి హెచ్చరిక',
    organic: 'సేంద్రీయ వ్యవసాయం',
    learning: 'అభ్యసన కేంద్రం',
    rotation: 'పంట భ్రమణం',
    income: 'ఆదాయ డాష్‌బోర్డ్',
    pest: 'చీడపీడ గుర్తింపు',
    soil: 'మట్టి పరీక్ష',
    irrigation: 'నీటిపారుదల',
    weather: 'వాతావరణం',
    selectLanguage: 'భాష ఎంచుకోండి',
    logout: 'లాగ్అవుట్'
  },
  ta: {
    appName: 'அக்ரிபாட் AI',
    welcome: 'மேம்பட்ட விவசாய உதவியாளருக்கு வரவேற்கிறோம்',
    dashboard: 'டாஷ்போர்டு',
    yieldPrediction: 'விளைச்சல் முன்னறிவிப்பு',
    market: 'சந்தை விலை',
    govtSchemes: 'அரசு திட்டங்கள்',
    profitGuide: 'லாப வழிகாட்டி',
    marketplace: 'சந்தை',
    voice: 'குரல் உதவியாளர்',
    climate: 'காலநிலை அபாயம்',
    subsidy: 'மானிய சரிபார்ப்பு',
    finance: 'நிதி மேலாளர்',
    plan: 'விவசாய திட்டம்',
    insurance: 'பயிர் காப்பீடு',
    disease: 'நோய் எச்சரிக்கை',
    organic: 'இயற்கை விவசாயம்',
    learning: 'கற்றல் மையம்',
    rotation: 'பயிர் சுழற்சி',
    income: 'வருமான டாஷ்போர்டு',
    pest: 'பூச்சி கண்டறிதல்',
    soil: 'மண் சோதனை',
    irrigation: 'நீர்ப்பாசனம்',
    weather: 'வானிலை',
    selectLanguage: 'மொழியை தேர்ந்தெடுக்கவும்',
    logout: 'வெளியேறு'
  },
  mr: {
    appName: 'अॅग्रीबॉट AI',
    welcome: 'प्रगत कृषी सहाय्यकामध्ये आपले स्वागत आहे',
    dashboard: 'डॅशबोर्ड',
    yieldPrediction: 'उत्पादन अंदाज',
    market: 'बाजार किंमत',
    govtSchemes: 'सरकारी योजना',
    profitGuide: 'नफा मार्गदर्शक',
    marketplace: 'मार्केटप्लेस',
    voice: 'व्हॉइस असिस्टंट',
    climate: 'हवामान धोका',
    subsidy: 'अनुदान तपासणी',
    finance: 'आर्थिक व्यवस्थापक',
    plan: 'शेती योजना',
    insurance: 'पीक विमा',
    disease: 'रोग सूचना',
    organic: 'सेंद्रिय शेती',
    learning: 'शिकण्याचे केंद्र',
    rotation: 'पीक फेरबदल',
    income: 'उत्पन्न डॅशबोर्ड',
    pest: 'कीड ओळख',
    soil: 'माती चाचणी',
    irrigation: 'सिंचन',
    weather: 'हवामान',
    selectLanguage: 'भाषा निवडा',
    logout: 'बाहेर पडा'
  },
  kn: {
    appName: 'ಅಗ್ರಿಬಾಟ್ AI',
    welcome: 'ಮುಂದುವರಿದ ಕೃಷಿ ಸಹಾಯಕನಿಗೆ ಸ್ವಾಗತ',
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    yieldPrediction: 'ಇಳುವರಿ ಮುನ್ಸೂಚನೆ',
    market: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ',
    govtSchemes: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    profitGuide: 'ಲಾಭ ಮಾರ್ಗದರ್ಶಿ',
    marketplace: 'ಮಾರುಕಟ್ಟೆ ಸ್ಥಳ',
    voice: 'ಧ್ವನಿ ಸಹಾಯಕ',
    climate: 'ಹವಾಮಾನ ಅಪಾಯ',
    subsidy: 'ಸಬ್ಸಿಡಿ ಪರೀಕ್ಷಕ',
    finance: 'ಹಣಕಾಸು ವ್ಯವಸ್ಥಾಪಕ',
    plan: 'ಕೃಷಿ ಯೋಜನೆ',
    insurance: 'ಬೆಳೆ ವಿಮೆ',
    disease: 'ರೋಗ ಎಚ್ಚರಿಕೆ',
    organic: 'ಸಾವಯವ ಕೃಷಿ',
    learning: 'ಕಲಿಕಾ ಕೇಂದ್ರ',
    rotation: 'ಬೆಳೆ ತಿರುಗುವಿಕೆ',
    income: 'ಆದಾಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    pest: 'ಕೀಟ ಪತ್ತೆ',
    soil: 'ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ',
    irrigation: 'ನೀರಾವರಿ',
    weather: 'ಹವಾಮಾನ',
    selectLanguage: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
    logout: 'ಲಾಗ್‌ಔಟ್'
  }
};

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const t = translations[language as keyof typeof translations];

  const menuItems = [
    { id: 'dashboard', icon: Home, label: t.dashboard },
    { id: 'yield', icon: TrendingUp, label: t.yieldPrediction },
    { id: 'price', icon: BarChart3, label: t.market },
    { id: 'govtSchemes', icon: Landmark, label: t.govtSchemes },
    { id: 'profitGuide', icon: Award, label: t.profitGuide },
    { id: 'marketplace', icon: ShoppingCart, label: t.marketplace },
    { id: 'voice', icon: Mic, label: t.voice },
    { id: 'climate', icon: Cloud, label: t.climate },
    { id: 'subsidy', icon: DollarSign, label: t.subsidy },
    { id: 'finance', icon: Calculator, label: t.finance },
    { id: 'plan', icon: Calendar, label: t.plan },
    { id: 'insurance', icon: Shield, label: t.insurance },
    { id: 'disease', icon: AlertTriangle, label: t.disease },
    { id: 'organic', icon: Leaf, label: t.organic },
    { id: 'learning', icon: BookOpen, label: t.learning },
    { id: 'rotation', icon: Sprout, label: t.rotation },
    { id: 'income', icon: PieChart, label: t.income },
    { id: 'pest', icon: Bug, label: t.pest },
    { id: 'soil', icon: Target, label: t.soil },
    { id: 'irrigation', icon: Droplet, label: t.irrigation },
    { id: 'weather', icon: Sun, label: t.weather },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard language={language} />;
      case 'yield':
        return <YieldPrediction language={language} />;
      case 'price':
        return <PricePredictor language={language} />;
      case 'govtSchemes':
        return <GovernmentSchemes language={language} />;
      case 'profitGuide':
        return <FarmerProfitGuide language={language} />;
      case 'marketplace':
        return <Marketplace language={language} />;
      case 'voice':
        return <VoiceAssistant language={language} />;
      case 'climate':
        return <ClimateRisk language={language} />;
      case 'subsidy':
        return <SubsidyChecker language={language} />;
      case 'finance':
        return <FinancialManager language={language} />;
      case 'plan':
        return <FarmingPlanGenerator language={language} />;
      case 'insurance':
        return <InsuranceRisk language={language} />;
      case 'disease':
        return <DiseaseAlert language={language} />;
      case 'organic':
        return <OrganicAdvisor language={language} />;
      case 'learning':
        return <LearningHub language={language} />;
      case 'rotation':
        return <CropRotation language={language} />;
      case 'income':
        return <IncomeDashboard language={language} />;
      case 'pest':
        return <PestDetection language={language} />;
      case 'soil':
        return <SoilTesting language={language} />;
      case 'irrigation':
        return <IrrigationPlan language={language} />;
      case 'weather':
        return <WeatherWidget language={language} />;
      default:
        return <Dashboard language={language} />;
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50'}`}>
      <Toaster position="top-right" />
      
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-lg border-b border-green-200 sticky top-0 z-50 shadow-sm"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X /> : <Menu />}
            </Button>
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {t.appName}
                </h1>
                <p className="text-xs text-gray-500">AI-Powered Farming Assistant</p>
              </div>
            </motion.div>
          </div>

          <div className="flex items-center gap-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇬🇧 English</SelectItem>
                <SelectItem value="hi">🇮🇳 हिंदी (Hindi)</SelectItem>
                <SelectItem value="te">🇮🇳 తెలుగు (Telugu)</SelectItem>
                <SelectItem value="ta">🇮🇳 தமிழ் (Tamil)</SelectItem>
                <SelectItem value="mr">🇮🇳 मराठी (Marathi)</SelectItem>
                <SelectItem value="kn">🇮🇳 ಕನ್ನಡ (Kannada)</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>

            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 20 }}
              className="w-72 bg-white/80 backdrop-blur-lg border-r border-green-200 h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto"
            >
              <ScrollArea className="h-full">
                <nav className="p-4 space-y-2">
                  {menuItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                          : 'hover:bg-green-50 text-gray-700'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {activeTab === item.id && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </motion.button>
                  ))}
                </nav>
              </ScrollArea>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard({ language }: { language: string }) {
  const stats = [
    { 
      label: 'Expected Yield', 
      value: '2,450 kg/acre', 
      change: '+12%', 
      icon: TrendingUp, 
      color: 'from-green-500 to-emerald-600',
      trend: 'up'
    },
    { 
      label: 'Market Price', 
      value: '₹2,200/qt', 
      change: '+8%', 
      icon: DollarSign, 
      color: 'from-blue-500 to-cyan-600',
      trend: 'up'
    },
    { 
      label: 'Soil Health', 
      value: '85%', 
      change: '+5%', 
      icon: Target, 
      color: 'from-purple-500 to-pink-600',
      trend: 'up'
    },
    { 
      label: 'Risk Level', 
      value: '18%', 
      change: '-3%', 
      icon: Shield, 
      color: 'from-orange-500 to-red-600',
      trend: 'down'
    },
  ];

  const recentAlerts = [
    { type: 'warning', message: 'Heavy rainfall expected in 3 days', icon: CloudRain },
    { type: 'info', message: 'Fertilizer application recommended', icon: Droplet },
    { type: 'success', message: 'Market price increasing trend detected', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 mt-1">Real-time agricultural insights powered by AI</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
            <Zap className="w-4 h-4 mr-2" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-none shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg"
              >
                <alert.icon className="w-5 h-5 text-orange-600" />
                <p className="text-sm text-gray-700">{alert.message}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Income Doubling Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Current: ₹1,24,000/year</span>
                  <span className="text-sm">Target: ₹2,48,000/year</span>
                </div>
                <Progress value={65} className="h-3 bg-white/20" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3">
                  <p className="text-xs opacity-90">Increase</p>
                  <p className="text-xl font-bold">65%</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3">
                  <p className="text-xs opacity-90">Remaining</p>
                  <p className="text-xl font-bold">35%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather & Crop Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-600" />
              Today's Weather
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="text-5xl font-bold text-gray-800">28°C</div>
              <p className="text-gray-600 mt-2">Partly Cloudy</p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div>
                  <Droplet className="w-4 h-4 mx-auto text-blue-600" />
                  <p className="text-xs mt-1">75%</p>
                </div>
                <div>
                  <Wind className="w-4 h-4 mx-auto text-gray-600" />
                  <p className="text-xs mt-1">12 km/h</p>
                </div>
                <div>
                  <CloudRain className="w-4 h-4 mx-auto text-blue-600" />
                  <p className="text-xs mt-1">20%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-blue-600" />
              Government Schemes & Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Available Schemes</span>
                <Badge className="bg-green-500">10+ Active</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">PM-KISAN</p>
                  <p className="text-lg font-bold text-green-600">₹6,000/yr</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">PMFBY Insurance</p>
                  <p className="text-lg font-bold text-blue-600">2% Premium</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">PMKSY Subsidy</p>
                  <p className="text-lg font-bold text-purple-600">90% Off</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Image */}
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="relative h-64">
          <img
            src="https://images.unsplash.com/photo-1623211269755-569fec0536d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBmaWVsZCUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc3MTIyMTkwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Farm"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Advanced AI-Powered Agriculture</h3>
              <p className="text-sm opacity-90">Leveraging AI, machine learning, and real-time analytics to double farmer income</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
