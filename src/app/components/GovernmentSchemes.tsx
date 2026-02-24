import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  DollarSign, Shield, Droplet, Landmark, TrendingUp, Users, 
  FileText, ExternalLink, Check, Award, BookOpen, Zap,
  Target, Sprout, Wallet, Building, Package, ArrowRight,
  ChevronDown, ChevronUp, Info, Phone, Globe, MapPin
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { toast } from 'sonner';

interface Scheme {
  id: string;
  name: string;
  nameHindi?: string;
  category: string;
  amount: string;
  description: string;
  benefits: string[];
  eligibility: string[];
  documents: string[];
  howToApply: string[];
  contactInfo: {
    website?: string;
    helpline?: string;
    email?: string;
  };
  icon: any;
  color: string;
  impact: string;
  fundingType: string;
}

const translations = {
  en: {
    title: 'Government Schemes & Agricultural Funding',
    subtitle: 'Complete guide to Indian government schemes supporting farmers',
    allSchemes: 'All Schemes',
    incomeSupport: 'Income Support',
    insurance: 'Insurance & Risk',
    infrastructure: 'Infrastructure',
    digital: 'Digital Agriculture',
    fundingOpportunity: 'Funding Opportunities',
    eligibility: 'Eligibility',
    benefits: 'Benefits',
    documents: 'Required Documents',
    howToApply: 'How to Apply',
    contactInfo: 'Contact Information',
    applyNow: 'Apply Now',
    learnMore: 'Learn More',
    impact: 'Impact on Farmers',
    totalFunding: 'Total Available Funding',
    activeSchemes: 'Active Schemes',
    farmersBenefited: 'Farmers Benefited',
    avgBenefit: 'Avg. Benefit per Farmer'
  },
  hi: {
    title: 'सरकारी योजनाएं और कृषि वित्त पोषण',
    subtitle: 'किसानों का समर्थन करने वाली भारतीय सरकारी योजनाओं की संपूर्ण मार्गदर्शिका',
    allSchemes: 'सभी योजनाएं',
    incomeSupport: 'आय सहायता',
    insurance: 'बीमा और जोखिम',
    infrastructure: 'बुनियादी ढांचा',
    digital: 'डिजिटल कृषि',
    fundingOpportunity: 'वित्त पोषण के अवसर',
    eligibility: 'पात्रता',
    benefits: 'लाभ',
    documents: 'आवश्यक दस्तावेज',
    howToApply: 'आवेदन कैसे करें',
    contactInfo: 'संपर्क जानकारी',
    applyNow: 'अभी आवेदन करें',
    learnMore: 'और जानें',
    impact: 'किसानों पर प्रभाव',
    totalFunding: 'कुल उपलब्ध वित्त पोषण',
    activeSchemes: 'सक्रिय योजनाएं',
    farmersBenefited: 'लाभान्वित किसान',
    avgBenefit: 'प्रति किसान औसत लाभ'
  },
  te: {
    title: 'ప్రభుత్వ పథకాలు మరియు వ్యవసాయ నిధులు',
    subtitle: 'రైతులకు మద్దతు ఇచ్చే భారత ప్రభుత్వ పథకాల పూర్తి మార్గదర్శి',
    allSchemes: 'అన్ని పథకాలు',
    incomeSupport: 'ఆదాయ మద్దతు',
    insurance: 'భీమా మరియు ప్రమాదం',
    infrastructure: 'మౌలిక సదుపాయాలు',
    digital: 'డిజిటల్ వ్యవసాయం',
    fundingOpportunity: 'నిధుల అవకాశాలు',
    eligibility: 'అర్హత',
    benefits: 'ప్రయోజనాలు',
    documents: 'అవసరమైన పత్రాలు',
    howToApply: 'దరఖాస్తు ఎలా చేయాలి',
    contactInfo: 'సంప్రదింపు సమాచారం',
    applyNow: 'ఇప్పుడే దరఖాస్తు చేయండి',
    learnMore: 'మరింత తెలుసుకోండి',
    impact: 'రైతులపై ప్రభావం',
    totalFunding: 'మొత్తం అందుబాటులో ఉన్న నిధులు',
    activeSchemes: 'క్రియాశీల పథకాలు',
    farmersBenefited: 'లబ్ధి పొందిన రైతులు',
    avgBenefit: 'ఒక్కో రైతుకు సగటు లబ్ధి'
  },
  ta: {
    title: 'அரசு திட்டங்கள் மற்றும் விவசாய நிதி',
    subtitle: 'விவசாயிகளுக்கு ஆதரவளிக்கும் இந்திய அரசு திட்டங்களின் முழுமையான வழிகாட்டி',
    allSchemes: 'அனைத்து திட்டங்கள்',
    incomeSupport: 'வருமான ஆதரவு',
    insurance: 'காப்பீடு மற்றும் ஆபத்து',
    infrastructure: 'உள்கட்டமைப்பு',
    digital: 'டிஜிட்டல் விவசாயம்',
    fundingOpportunity: 'நிதி வாய்ப்புகள்',
    eligibility: 'தகுதி',
    benefits: 'பயன்கள்',
    documents: 'தேவையான ஆவணங்கள்',
    howToApply: 'விண்ணப்பிக்க எப்படி',
    contactInfo: 'தொடர்பு தகவல்',
    applyNow: 'இப்போது விண்ணப்பிக்கவும்',
    learnMore: 'மேலும் அறிக',
    impact: 'விவசாயிகள் மீதான தாக்கம்',
    totalFunding: 'மொத்த கிடைக்கும் நிதி',
    activeSchemes: 'செயலில் உள்ள திட்டங்கள்',
    farmersBenefited: 'பயனடைந்த விவசாயிகள்',
    avgBenefit: 'ஒரு விவசாயிக்கு சராசரி பயன்'
  },
  mr: {
    title: 'सरकारी योजना आणि कृषी वित्तपुरवठा',
    subtitle: 'शेतकऱ्यांना समर्थन देणाऱ्या भारतीय सरकारी योजनांचे संपूर्ण मार्गदर्शक',
    allSchemes: 'सर्व योजना',
    incomeSupport: 'उत्पन्न समर्थन',
    insurance: 'विमा आणि जोखीम',
    infrastructure: 'पायाभूत सुविधा',
    digital: 'डिजिटल शेती',
    fundingOpportunity: 'निधी संधी',
    eligibility: 'पात्रता',
    benefits: 'फायदे',
    documents: 'आवश्यक कागदपत्रे',
    howToApply: 'अर्ज कसा करावा',
    contactInfo: 'संपर्क माहिती',
    applyNow: 'आता अर्ज करा',
    learnMore: 'अधिक जाणून घ्या',
    impact: 'शेतकऱ्यांवर परिणाम',
    totalFunding: 'एकूण उपलब्ध निधी',
    activeSchemes: 'सक्रिय योजना',
    farmersBenefited: 'लाभार्थी शेतकरी',
    avgBenefit: 'प्रति शेतकरी सरासरी लाभ'
  }
};

export default function GovernmentSchemes({ language }: { language: string }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);
  
  const t = translations[language as keyof typeof translations] || translations.en;

  const schemes: Scheme[] = [
    {
      id: 'pm-kisan',
      name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
      nameHindi: 'प्रधानमंत्री किसान सम्मान निधि',
      category: 'income',
      amount: '₹6,000/year',
      description: 'Direct income support scheme providing ₹6,000 annually to all landholding farmers in three equal installments of ₹2,000 each.',
      benefits: [
        '₹6,000 per year in 3 installments',
        'Direct bank transfer (DBT)',
        'Financial support for farming needs',
        'Can invest in soil testing, smart tools, AI advisory systems',
        'Helps small and marginal farmers with regular income'
      ],
      eligibility: [
        'All landholding farmers (small, marginal, and others)',
        'Family holding cultivable land',
        'Institutional landholders excluded',
        'Valid Aadhaar and bank account required'
      ],
      documents: [
        'Aadhaar Card',
        'Land ownership documents',
        'Bank account details',
        'Passport size photo'
      ],
      howToApply: [
        'Visit pmkisan.gov.in',
        'Click on "Farmer Corner" > "New Farmer Registration"',
        'Enter Aadhaar number and basic details',
        'Upload required documents',
        'Submit and note registration number',
        'Alternatively, visit nearest CSC (Common Service Center)'
      ],
      contactInfo: {
        website: 'https://pmkisan.gov.in',
        helpline: '011-24300606, 155261',
        email: 'pmkisan-ict@gov.in'
      },
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      impact: 'Over 11 crore farmers receive direct income support',
      fundingType: 'Central Government - 100% funded'
    },
    {
      id: 'pmfby',
      name: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
      nameHindi: 'प्रधानमंत्री फसल बीमा योजना',
      category: 'insurance',
      amount: '2% premium for Kharif, 1.5% for Rabi',
      description: 'Comprehensive crop insurance scheme protecting farmers against crop loss due to natural calamities, pests, and diseases.',
      benefits: [
        'Low premium rates - 2% for Kharif, 1.5% for Rabi crops',
        'Coverage against natural disasters (drought, flood, cyclone)',
        'Protection from pest and disease attacks',
        'Post-harvest losses coverage (up to 14 days)',
        'Localized calamities coverage (hailstorm, landslide)',
        'AI system helps predict risk and apply for insurance'
      ],
      eligibility: [
        'All farmers including sharecroppers and tenant farmers',
        'Compulsory for loanee farmers',
        'Voluntary for non-loanee farmers',
        'Must be notified for the crop and area'
      ],
      documents: [
        'Aadhaar Card',
        'Bank account details',
        'Land records (Khata/Khatauni)',
        'Sowing certificate (for certain crops)',
        'Loan documents (if applicable)'
      ],
      howToApply: [
        'Visit pmfby.gov.in or bank/CSC',
        'Register with Aadhaar',
        'Select crop, area, and sum insured',
        'Pay premium online or at bank',
        'Receive policy confirmation via SMS',
        'Cutoff dates: 31st July for Kharif, 31st December for Rabi'
      ],
      contactInfo: {
        website: 'https://pmfby.gov.in',
        helpline: '011-23382012, 011-23381092',
        email: 'help.agri-insurance@gov.in'
      },
      icon: Shield,
      color: 'from-blue-500 to-cyan-600',
      impact: 'Reduces financial loss through crop protection',
      fundingType: 'Central & State Government shared'
    },
    {
      id: 'pmksy',
      name: 'PMKSY (Pradhan Mantri Krishi Sinchayee Yojana)',
      nameHindi: 'प्रधानमंत्री कृषि सिंचाई योजना',
      category: 'infrastructure',
      amount: 'Up to 90% subsidy on irrigation systems',
      description: 'Aims to improve irrigation facilities and promote "More Crop per Drop" through water-efficient farming techniques.',
      benefits: [
        'Per Drop More Crop - micro irrigation',
        'Up to 90% subsidy on drip/sprinkler systems',
        'Watershed development',
        'Water conservation and management',
        'AI irrigation prediction module integration',
        'Promotes water-efficient farming'
      ],
      eligibility: [
        'All categories of farmers',
        'Individual farmers, groups, cooperatives',
        'Minimum land holding varies by state',
        'Must have water source'
      ],
      documents: [
        'Aadhaar Card',
        'Land ownership documents',
        'Bank account details',
        'Water source proof',
        'Quotation from supplier'
      ],
      howToApply: [
        'Visit state agriculture department website',
        'Register on PMKSY portal',
        'Submit online application with documents',
        'Get quotation from empaneled supplier',
        'After approval, install system',
        'Claim subsidy after verification'
      ],
      contactInfo: {
        website: 'https://pmksy.gov.in',
        helpline: 'State agriculture department',
        email: 'pmksy-mowr@nic.in'
      },
      icon: Droplet,
      color: 'from-cyan-500 to-blue-600',
      impact: 'Water efficiency improved by 40-50%',
      fundingType: '75% Central, 25% State funding'
    },
    {
      id: 'digital-agriculture',
      name: 'Digital Agriculture Mission',
      nameHindi: 'डिजिटल कृषि मिशन',
      category: 'digital',
      amount: 'AI/Blockchain/Drone technology support',
      description: 'Promotes adoption of AI, blockchain, remote sensing, and drones in agriculture with digital farmer database creation.',
      benefits: [
        'AI-based crop advisory',
        'Blockchain for supply chain',
        'Drone technology for crop monitoring',
        'Digital farmer database',
        'Real-time market information',
        'Your AI agricultural bot aligns with this mission',
        'Supports data-driven farming'
      ],
      eligibility: [
        'All farmers',
        'Farmer Producer Organizations (FPOs)',
        'Agri-tech startups',
        'Agricultural institutions'
      ],
      documents: [
        'Registration as farmer/FPO/startup',
        'Project proposal',
        'Aadhaar/Business registration',
        'Bank details'
      ],
      howToApply: [
        'Visit agricoop.nic.in',
        'Check Digital Agriculture guidelines',
        'Submit proposal through state department',
        'For startups: Apply through RKVY-RAFTAAR',
        'Get approval and funding'
      ],
      contactInfo: {
        website: 'https://agricoop.nic.in',
        helpline: '011-23070964',
        email: 'aicel-agri@nic.in'
      },
      icon: Zap,
      color: 'from-purple-500 to-pink-600',
      impact: 'Promotes digital transformation in agriculture',
      fundingType: 'Central Government funding'
    },
    {
      id: 'aif',
      name: 'Agriculture Infrastructure Fund (AIF)',
      nameHindi: 'कृषि अवसंरचना कोष',
      category: 'infrastructure',
      amount: '₹1 Lakh Crore fund - Low interest loans',
      description: 'Provides medium to long-term debt financing for post-harvest management and community farming assets.',
      benefits: [
        '₹1 lakh crore fund available',
        'Interest subvention of 3% per annum',
        'Credit guarantee coverage',
        'Loan up to ₹2 crore for individual farmers',
        'Can fund deployment of AI-based agricultural systems',
        'Supports agri-tech startups'
      ],
      eligibility: [
        'Farmers, FPOs, Agricultural entrepreneurs',
        'Primary Agricultural Credit Societies',
        'Marketing Cooperative Societies',
        'SHGs, Joint Liability Groups',
        'Startups in agri-infrastructure'
      ],
      documents: [
        'Project report',
        'Land documents',
        'KYC documents',
        'Bank statements',
        'Business plan (for entrepreneurs)'
      ],
      howToApply: [
        'Prepare detailed project report',
        'Visit https://agriinfra.dac.gov.in',
        'Apply through eligible lending institution',
        'Submit all required documents',
        'Get project approval',
        'Receive loan with interest subvention'
      ],
      contactInfo: {
        website: 'https://agriinfra.dac.gov.in',
        helpline: '1800-180-1551',
        email: 'agriinfrafund@gmail.com'
      },
      icon: Building,
      color: 'from-orange-500 to-red-600',
      impact: 'Supports post-harvest infrastructure development',
      fundingType: 'Central Government with banking partnership'
    },
    {
      id: 'nabard',
      name: 'NABARD Funding for Rural Innovation',
      nameHindi: 'नाबार्ड ग्रामीण नवाचार वित्त पोषण',
      category: 'funding',
      amount: 'Grants & Loans for agri-innovation',
      description: 'Financial support for rural innovation, startup funding, and agri-technology grants through various schemes.',
      benefits: [
        'Financial backing for scaling AI solutions',
        'Support for agri-tech innovation',
        'Grants for pilot projects',
        'Refinance facility for banks',
        'Support for FPOs and SHGs',
        'Technology adoption fund'
      ],
      eligibility: [
        'Agri-tech startups',
        'Rural entrepreneurs',
        'FPOs and cooperatives',
        'NGOs working in agriculture',
        'Research institutions'
      ],
      documents: [
        'Business plan',
        'Registration certificate',
        'Project proposal',
        'Financial projections',
        'Team credentials',
        'Technology details'
      ],
      howToApply: [
        'Visit www.nabard.org',
        'Check applicable scheme (NABVENTURES, PRODUCE fund)',
        'Submit online application',
        'Prepare detailed pitch',
        'Present to evaluation committee',
        'Receive funding approval'
      ],
      contactInfo: {
        website: 'https://www.nabard.org',
        helpline: '022-26539895',
        email: 'ho.pr@nabard.org'
      },
      icon: Landmark,
      color: 'from-indigo-500 to-purple-600',
      impact: 'Enables rural technology innovation',
      fundingType: 'NABARD with government support'
    },
    {
      id: 'soil-health',
      name: 'Soil Health Card Scheme',
      nameHindi: 'मृदा स्वास्थ्य कार्ड योजना',
      category: 'infrastructure',
      amount: 'Free',
      description: 'Provides free soil testing and nutrient-based recommendations to improve soil health and crop productivity.',
      benefits: [
        'Free soil testing',
        'Nutrient status report',
        'Fertilizer recommendations',
        'Crop-wise advisory',
        'Improves soil health',
        'Reduces fertilizer cost'
      ],
      eligibility: [
        'All farmers',
        'Issued once every 2 years',
        'Available across all states'
      ],
      documents: [
        'Aadhaar Card',
        'Land records',
        'Soil sample'
      ],
      howToApply: [
        'Visit nearest Krishi Vigyan Kendra (KVK)',
        'Or state agriculture department office',
        'Collect soil sample as per guidelines',
        'Submit sample with Aadhaar',
        'Receive Soil Health Card within 2 weeks'
      ],
      contactInfo: {
        website: 'https://soilhealth.dac.gov.in',
        helpline: 'State agriculture department',
        email: 'shc-dac@nic.in'
      },
      icon: Target,
      color: 'from-green-600 to-teal-600',
      impact: 'Over 22 crore soil health cards issued',
      fundingType: 'Central & State Government'
    },
    {
      id: 'pkvy',
      name: 'PKVY (Paramparagat Krishi Vikas Yojana)',
      nameHindi: 'परम्परागत कृषि विकास योजना',
      category: 'income',
      amount: '₹50,000/hectare for 3 years',
      description: 'Promotes organic farming through cluster approach and value chain development.',
      benefits: [
        '₹50,000 per hectare assistance for 3 years',
        'Cluster-based organic farming',
        'Premium prices for organic produce',
        'Training and handholding',
        'Organic certification support',
        'Market linkage'
      ],
      eligibility: [
        'Groups of farmers (50 or more)',
        'Willing to practice organic farming',
        'Cluster approach (50 acres minimum)',
        'All categories of farmers'
      ],
      documents: [
        'Group registration',
        'Land records of all members',
        'Aadhaar cards',
        'Bank account details',
        'Organic farming commitment'
      ],
      howToApply: [
        'Form farmer group (minimum 50 farmers)',
        'Contact state agriculture department',
        'Register under PKVY',
        'Submit cluster plan',
        'Get approval and start organic farming',
        'Receive financial assistance in phases'
      ],
      contactInfo: {
        website: 'https://pgsindia-ncof.gov.in',
        helpline: 'State organic certification agency',
        email: 'ncof@nic.in'
      },
      icon: Sprout,
      color: 'from-lime-500 to-green-600',
      impact: 'Promotes sustainable organic agriculture',
      fundingType: '60% Central, 40% State'
    },
    {
      id: 'enam',
      name: 'e-NAM (National Agriculture Market)',
      nameHindi: 'राष्ट्रीय कृषि बाज़ार',
      category: 'digital',
      amount: 'Free - Better market access',
      description: 'Pan-India electronic trading portal providing unified market platform for agricultural commodities.',
      benefits: [
        'Transparent price discovery',
        'Access to more buyers',
        'Online trading facility',
        'Better price realization',
        'Reduced intermediaries',
        'SMS alerts for prices'
      ],
      eligibility: [
        'All farmers',
        'Traders',
        'Commission agents',
        'Must register on e-NAM portal'
      ],
      documents: [
        'Aadhaar Card',
        'Bank account details',
        'Land records',
        'Mobile number'
      ],
      howToApply: [
        'Visit www.enam.gov.in',
        'Click on "Registration"',
        'Fill farmer details',
        'Upload documents',
        'Verification by mandi',
        'Start online trading'
      ],
      contactInfo: {
        website: 'https://www.enam.gov.in',
        helpline: '1800-270-0224',
        email: 'enam.helpdesk@gmail.com'
      },
      icon: TrendingUp,
      color: 'from-yellow-500 to-orange-600',
      impact: 'Better price realization for farmers',
      fundingType: 'Central Government'
    },
    {
      id: 'rkvy',
      name: 'RKVY-RAFTAAR (Agri-Startup Support)',
      nameHindi: 'राष्ट्रीय कृषि विकास योजना',
      category: 'funding',
      amount: 'Grants up to ₹25 lakhs for startups',
      description: 'Supports agri-startups and innovation in agriculture through financial assistance and incubation.',
      benefits: [
        'Financial support up to ₹25 lakhs',
        'Incubation facility',
        'Mentorship and training',
        'Technology adoption support',
        'Market linkages',
        'Networking opportunities'
      ],
      eligibility: [
        'Agri-tech startups (not more than 5 years old)',
        'Innovative agricultural solutions',
        'Registered entity',
        'Indian citizens/companies'
      ],
      documents: [
        'Startup registration certificate',
        'Business plan',
        'Innovation details',
        'Team profiles',
        'Financial projections',
        'Proof of concept'
      ],
      howToApply: [
        'Visit https://rkvy.nic.in',
        'Check for RAFTAAR scheme notification',
        'Submit online application',
        'Present pitch to selection committee',
        'Selected startups get funding and incubation'
      ],
      contactInfo: {
        website: 'https://rkvy.nic.in',
        helpline: '011-23070964',
        email: 'rkvy-dac@nic.in'
      },
      icon: Award,
      color: 'from-pink-500 to-rose-600',
      impact: 'Promotes agri-entrepreneurship',
      fundingType: 'Central & State Government'
    }
  ];

  const stats = [
    { 
      label: t.totalFunding, 
      value: '₹3+ Lakh Cr', 
      icon: Wallet, 
      color: 'from-green-500 to-emerald-600' 
    },
    { 
      label: t.activeSchemes, 
      value: `${schemes.length}+`, 
      icon: FileText, 
      color: 'from-blue-500 to-cyan-600' 
    },
    { 
      label: t.farmersBenefited, 
      value: '15+ Crore', 
      icon: Users, 
      color: 'from-purple-500 to-pink-600' 
    },
    { 
      label: t.avgBenefit, 
      value: '₹15,000+', 
      icon: TrendingUp, 
      color: 'from-orange-500 to-red-600' 
    }
  ];

  const filteredSchemes = selectedCategory === 'all' 
    ? schemes 
    : schemes.filter(s => s.category === selectedCategory);

  const handleApply = (scheme: Scheme) => {
    if (scheme.contactInfo.website) {
      window.open(scheme.contactInfo.website, '_blank');
    }
    toast.success(`Opening application portal for ${scheme.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Landmark className="w-8 h-8 text-green-600" />
          {t.title}
        </h2>
        <p className="text-gray-600 mt-2">{t.subtitle}</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
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

      {/* Category Filter Tabs */}
      <Card className="border-none shadow-lg">
        <CardContent className="p-6">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full">
              <TabsTrigger value="all">{t.allSchemes}</TabsTrigger>
              <TabsTrigger value="income">{t.incomeSupport}</TabsTrigger>
              <TabsTrigger value="insurance">{t.insurance}</TabsTrigger>
              <TabsTrigger value="infrastructure">{t.infrastructure}</TabsTrigger>
              <TabsTrigger value="digital">{t.digital}</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Schemes List */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme, index) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-none shadow-lg hover:shadow-xl transition-all">
              <CardHeader className={`bg-gradient-to-r ${scheme.color} text-white rounded-t-lg`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 backdrop-blur-lg p-3 rounded-xl">
                      <scheme.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-1">{scheme.name}</CardTitle>
                      {scheme.nameHindi && language === 'hi' && (
                        <p className="text-sm opacity-90">{scheme.nameHindi}</p>
                      )}
                      <div className="flex gap-2 mt-2">
                        <Badge className="bg-white/30 hover:bg-white/40">
                          {scheme.amount}
                        </Badge>
                        <Badge className="bg-white/30 hover:bg-white/40">
                          {scheme.fundingType}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setExpandedScheme(expandedScheme === scheme.id ? null : scheme.id)}
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    {expandedScheme === scheme.id ? <ChevronUp /> : <ChevronDown />}
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <p className="text-gray-700 mb-4">{scheme.description}</p>

                {expandedScheme === scheme.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6"
                  >
                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        {t.benefits}
                      </h4>
                      <ul className="space-y-2">
                        {scheme.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <ArrowRight className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Eligibility */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        {t.eligibility}
                      </h4>
                      <ul className="space-y-2">
                        {scheme.eligibility.map((criteria, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>{criteria}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Documents Required */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-600" />
                        {t.documents}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {scheme.documents.map((doc, idx) => (
                          <Badge key={idx} variant="outline" className="justify-start">
                            <Package className="w-3 h-3 mr-1" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* How to Apply */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-orange-600" />
                        {t.howToApply}
                      </h4>
                      <ol className="space-y-2">
                        {scheme.howToApply.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                            <div className="bg-orange-100 text-orange-600 font-semibold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs">
                              {idx + 1}
                            </div>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Info className="w-5 h-5 text-indigo-600" />
                        {t.contactInfo}
                      </h4>
                      <div className="space-y-2 text-sm">
                        {scheme.contactInfo.website && (
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-gray-600" />
                            <a 
                              href={scheme.contactInfo.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {scheme.contactInfo.website}
                            </a>
                          </div>
                        )}
                        {scheme.contactInfo.helpline && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-700">{scheme.contactInfo.helpline}</span>
                          </div>
                        )}
                        {scheme.contactInfo.email && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-700">{scheme.contactInfo.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Impact */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        <strong className="text-green-700">{t.impact}:</strong> {scheme.impact}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => handleApply(scheme)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600"
                      >
                        {t.applyNow}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                      {scheme.contactInfo.website && (
                        <Button 
                          variant="outline"
                          onClick={() => window.open(scheme.contactInfo.website, '_blank')}
                        >
                          {t.learnMore}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Collapsed View Actions */}
                {expandedScheme !== scheme.id && (
                  <div className="flex gap-3 mt-4">
                    <Button 
                      onClick={() => setExpandedScheme(scheme.id)}
                      variant="outline"
                      className="flex-1"
                    >
                      View Details
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                    <Button 
                      onClick={() => handleApply(scheme)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600"
                    >
                      {t.applyNow}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Help Section */}
      <Card className="border-none shadow-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Info className="w-6 h-6" />
            Need Help with Applications?
          </h3>
          <p className="mb-4">Visit your nearest Common Service Center (CSC), Krishi Vigyan Kendra (KVK), or Agriculture Department office for assistance.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
              <Phone className="w-5 h-5 mb-2" />
              <p className="text-sm font-semibold">Kisan Call Center</p>
              <p className="text-lg font-bold">1800-180-1551</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
              <Globe className="w-5 h-5 mb-2" />
              <p className="text-sm font-semibold">Agriculture Portal</p>
              <p className="text-sm">agricoop.nic.in</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
              <MapPin className="w-5 h-5 mb-2" />
              <p className="text-sm font-semibold">Find Nearest</p>
              <p className="text-sm">CSC/KVK/Agri Office</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
