import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Play, Pause, Volume2, VolumeX, Maximize, 
  Download, Share2, ThumbsUp, Eye, Clock, Star,
  ChevronRight, ChevronLeft, X, CheckCircle, Award,
  Users, TrendingUp, Filter, Search, Grid, List,
  PlayCircle, Book, FileText, Video, Smartphone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

interface VideoLesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: string;
  likes: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string[];
  videoUrl: string;
  instructor: string;
  thumbnail: string;
  keyPoints: string[];
  resources: string[];
  completed?: boolean;
}

const translations = {
  en: {
    title: 'Farmer Learning Hub',
    subtitle: 'Video tutorials, expert guidance, and practical farming knowledge',
    allCourses: 'All Courses',
    myCourses: 'My Progress',
    categories: 'Categories',
    searchPlaceholder: 'Search courses...',
    watchNow: 'Watch Now',
    continue: 'Continue Learning',
    completed: 'Completed',
    duration: 'Duration',
    views: 'views',
    likes: 'likes',
    instructor: 'Instructor',
    keyPoints: 'Key Learning Points',
    resources: 'Resources',
    downloadCertificate: 'Download Certificate',
    shareVideo: 'Share',
    markComplete: 'Mark as Complete',
    nextLesson: 'Next Lesson',
    previousLesson: 'Previous Lesson',
    courseProgress: 'Course Progress',
    totalCourses: 'Total Courses',
    completedCourses: 'Completed',
    hoursLearned: 'Hours Learned',
    gridView: 'Grid View',
    listView: 'List View',
    allCategories: 'All Categories',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    explanation: 'Detailed Explanation',
    closeVideo: 'Close Video'
  },
  hi: {
    title: 'किसान शिक्षा केंद्र',
    subtitle: 'वीडियो ट्यूटोरियल, विशेषज्ञ मार्गदर्शन और व्यावहारिक खेती ज्ञान',
    allCourses: 'सभी पाठ्यक्रम',
    myCourses: 'मेरी प्रगति',
    categories: 'श्रेणियां',
    searchPlaceholder: 'पाठ्यक्रम खोजें...',
    watchNow: 'अभी देखें',
    continue: 'सीखना जारी रखें',
    completed: 'पूर्ण',
    duration: 'अवधि',
    views: 'बार देखा गया',
    likes: 'पसंद',
    instructor: 'प्रशिक्षक',
    keyPoints: 'मुख्य सीखने के बिंदु',
    resources: 'संसाधन',
    downloadCertificate: 'प्रमाणपत्र डाउनलोड करें',
    shareVideo: 'साझा करें',
    markComplete: 'पूर्ण के रूप में चिह्नित करें',
    nextLesson: 'अगला पाठ',
    previousLesson: 'पिछला पाठ',
    courseProgress: 'पाठ्यक्रम प्रगति',
    totalCourses: 'कुल पाठ्यक्रम',
    completedCourses: 'पूर्ण',
    hoursLearned: 'घंटे सीखे',
    gridView: 'ग्रिड दृश्य',
    listView: 'सूची दृश्य',
    allCategories: 'सभी श्रेणियां',
    beginner: 'शुरुआती',
    intermediate: 'मध्यवर्ती',
    advanced: 'उन्नत',
    explanation: 'विस्तृत व्याख्या',
    closeVideo: 'वीडियो बंद करें'
  },
  te: {
    title: 'రైతు అభ్యసన కేంద్రం',
    subtitle: 'వీడియో ట్యుటోరియల్స్, నిపుణుల మార్గదర్శకత్వం మరియు ఆచరణాత్మక వ్యవసాయ జ్ఞానం',
    allCourses: 'అన్ని కోర్సులు',
    myCourses: 'నా పురోగతి',
    categories: 'వర్గాలు',
    searchPlaceholder: 'కోర్సులను శోధించండి...',
    watchNow: 'ఇప్పుడు చూడండి',
    continue: 'నేర్చుకోవడం కొనసాగించండి',
    completed: 'పూర్తయింది',
    duration: 'వ్యవధి',
    views: 'వీక్షణలు',
    likes: 'ఇష్టాలు',
    instructor: 'బోధకుడు',
    keyPoints: 'ముఖ్య అభ్యాస అంశాలు',
    resources: 'వనరులు',
    downloadCertificate: 'సర్టిఫికేట్ డౌన్‌లోడ్ చేయండి',
    shareVideo: 'షేర్ చేయండి',
    markComplete: 'పూర్తయినదిగా గుర్తించండి',
    nextLesson: 'తదుపరి పాఠం',
    previousLesson: 'మునుపటి పాఠం',
    courseProgress: 'కోర్సు పురోగతి',
    totalCourses: 'మొత్తం కోర్సులు',
    completedCourses: 'పూర్తయింది',
    hoursLearned: 'గంటలు నేర్చుకున్నారు',
    gridView: 'గ్రిడ్ వీక్షణ',
    listView: 'జాబితా వీక్షణ',
    allCategories: 'అన్ని వర్గాలు',
    beginner: 'ప్రారంభకుడు',
    intermediate: 'మధ్యస్థ',
    advanced: 'అధునాతన',
    explanation: 'వివరణాత్మక వివరణ',
    closeVideo: 'వీడియో మూసివేయండి'
  },
  ta: {
    title: 'விவசாயி கற்றல் மையம்',
    subtitle: 'வீடியோ பயிற்சிகள், நிபுணர் வழிகாட்டுதல் மற்றும் நடைமுறை விவசாய அறிவு',
    allCourses: 'அனைத்து பாடங்கள்',
    myCourses: 'எனது முன்னேற்றம்',
    categories: 'வகைகள்',
    searchPlaceholder: 'பாடங்களைத் தேடுங்கள்...',
    watchNow: 'இப்போது பார்க்கவும்',
    continue: 'கற்றலைத் தொடரவும்',
    completed: 'முடிந்தது',
    duration: 'காலம்',
    views: 'பார்வைகள்',
    likes: 'விருப்பங்கள்',
    instructor: 'பயிற்சியாளர்',
    keyPoints: 'முக்கிய கற்றல் புள்ளிகள்',
    resources: 'வளங்கள்',
    downloadCertificate: 'சான்றிதழைப் பதிவிறக்கவும்',
    shareVideo: 'பகிரவும்',
    markComplete: 'முடிந்ததாகக் குறிக்கவும்',
    nextLesson: 'அடுத்த பாடம்',
    previousLesson: 'முந்தைய பாடம்',
    courseProgress: 'பாட முன்னேற்றம்',
    totalCourses: 'மொத்த பாடங்கள்',
    completedCourses: 'முடிந்தது',
    hoursLearned: 'மணிநேரங்கள் கற்றுக்கொண்டார்',
    gridView: 'கட்டம் காட்சி',
    listView: 'பட்டியல் காட்சி',
    allCategories: 'அனைத்து வகைகள்',
    beginner: 'தொடக்கநிலை',
    intermediate: 'இடைநிலை',
    advanced: 'மேம்பட்ட',
    explanation: 'விரிவான விளக்கம்',
    closeVideo: 'வீடியோவை மூடு'
  },
  mr: {
    title: 'शेतकरी शिक्षण केंद्र',
    subtitle: 'व्हिडिओ ट्यूटोरियल, तज्ञ मार्गदर्शन आणि व्यावहारिक शेती ज्ञान',
    allCourses: 'सर्व अभ्यासक्रम',
    myCourses: 'माझी प्रगती',
    categories: 'श्रेणी',
    searchPlaceholder: 'अभ्यासक्रम शोधा...',
    watchNow: 'आता पहा',
    continue: 'शिकणे सुरू ठेवा',
    completed: 'पूर्ण',
    duration: 'कालावधी',
    views: 'दृश्ये',
    likes: 'आवडी',
    instructor: 'प्रशिक्षक',
    keyPoints: 'मुख्य शिकण्याचे मुद्दे',
    resources: 'संसाधने',
    downloadCertificate: 'प्रमाणपत्र डाउनलोड करा',
    shareVideo: 'शेअर करा',
    markComplete: 'पूर्ण म्हणून चिन्हांकित करा',
    nextLesson: 'पुढील धडा',
    previousLesson: 'मागील धडा',
    courseProgress: 'अभ्यासक्रम प्रगती',
    totalCourses: 'एकूण अभ्यासक्रम',
    completedCourses: 'पूर्ण',
    hoursLearned: 'तास शिकले',
    gridView: 'ग्रिड दृश्य',
    listView: 'यादी दृश्य',
    allCategories: 'सर्व श्रेणी',
    beginner: 'नवशिक्या',
    intermediate: 'मध्यम',
    advanced: 'प्रगत',
    explanation: 'तपशीलवार स्पष्टीकरण',
    closeVideo: 'व्हिडिओ बंद करा'
  },
  kn: {
    title: 'ರೈತ ಕಲಿಕಾ ಕೇಂದ್ರ',
    subtitle: 'ವೀಡಿಯೊ ಟ್ಯುಟೋರಿಯಲ್‌ಗಳು, ತಜ್ಞರ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಕೃಷಿ ಜ್ಞಾನ',
    allCourses: 'ಎಲ್ಲಾ ಕೋರ್ಸ್‌ಗಳು',
    myCourses: 'ನನ್ನ ಪ್ರಗತಿ',
    categories: 'ವರ್ಗಗಳು',
    searchPlaceholder: 'ಕೋರ್ಸ್‌ಗಳನ್ನು ಹುಡುಕಿ...',
    watchNow: 'ಈಗ ವೀಕ್ಷಿಸಿ',
    continue: 'ಕಲಿಕೆಯನ್ನು ಮುಂದುವರಿಸಿ',
    completed: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    duration: 'ಅವಧಿ',
    views: 'ವೀಕ್ಷಣೆಗಳು',
    likes: 'ಇಷ್ಟಗಳು',
    instructor: 'ಬೋಧಕ',
    keyPoints: 'ಪ್ರಮುಖ ಕಲಿಕಾ ಅಂಶಗಳು',
    resources: 'ಸಂಪನ್ಮೂಲಗಳು',
    downloadCertificate: 'ಪ್ರಮಾಣಪತ್ರ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    shareVideo: 'ಹಂಚಿಕೊಳ್ಳಿ',
    markComplete: 'ಪೂರ್ಣಗೊಂಡಿದೆ ಎಂದು ಗುರುತಿಸಿ',
    nextLesson: 'ಮುಂದಿನ ಪಾಠ',
    previousLesson: 'ಹಿಂದಿನ ಪಾಠ',
    courseProgress: 'ಕೋರ್ಸ್ ಪ್ರಗತಿ',
    totalCourses: 'ಒಟ್ಟು ಕೋರ್ಸ್‌ಗಳು',
    completedCourses: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    hoursLearned: 'ಕಲಿತ ಗಂಟೆಗಳು',
    gridView: 'ಗ್ರಿಡ್ ವೀಕ್ಷಣೆ',
    listView: 'ಪಟ್ಟಿ ವೀಕ್ಷಣೆ',
    allCategories: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
    beginner: 'ಆರಂಭಿಕ',
    intermediate: 'ಮಧ್ಯಮ',
    advanced: 'ಮುಂದುವರಿದ',
    explanation: 'ವಿವರವಾದ ವಿವರಣೆ',
    closeVideo: 'ವೀಡಿಯೊ ಮುಚ್ಚಿ'
  }
};

export default function LearningHub({ language }: { language: string }) {
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const t = translations[language as keyof typeof translations] || translations.en;

  const videoLessons: VideoLesson[] = [
    {
      id: '1',
      title: language === 'hi' ? 'ड्रिप सिंचाई सेटअप' : language === 'te' ? 'డ్రిప్ నీటిపారుదల సెటప్' : language === 'ta' ? 'சொட்டு நீர் பாசன அமைப்பு' : language === 'mr' ? 'ठिबक सिंचन सेटअप' : language === 'kn' ? 'ಡ್ರಿಪ್ ನೀರಾವರಿ ಸೆಟಪ್' : 'Drip Irrigation Setup',
      description: language === 'hi' ? 'अपने खेत में ड्रिप सिंचाई प्रणाली को कैसे स्थापित और रखरखाव करें सीखें। 40% पानी की बचत करें।' : language === 'te' ? 'మీ పొలంలో డ్రిప్ నీటిపారుదల వ్యవస్థను ఎలా ఇన్‌స్టాల్ మరియు నిర్వహించాలో నేర్చుకోండి. 40% నీటిని ఆదా చేయండి.' : language === 'ta' ? 'உங்கள் பண்ணையில் சொட்டு நீர் பாசன அமைப்பை எப்படி நிறுவுவது மற்றும் பராமரிப்பது என்பதை அறியுங்கள். 40% தண்ணீரை சேமிக்கவும்.' : language === 'mr' ? 'आपल्या शेतात ठिबक सिंचन प्रणाली कशी स्थापित आणि देखभाल करावी ते शिका. 40% पाणी वाचवा.' : language === 'kn' ? 'ನಿಮ್ಮ ಹೊಲದಲ್ಲಿ ಡ್ರಿಪ್ ನೀರಾವರಿ ವ್ಯವಸ್ಥೆಯನ್ನು ಹೇಗೆ ಸ್ಥಾಪಿಸುವುದು ಮತ್ತು ನಿರ್ವಹಿಸುವುದು ಎಂದು ತಿಳಿಯಿರಿ. 40% ನೀರನ್ನು ಉಳಿಸಿ.' : 'Learn how to install and maintain a drip irrigation system in your farm. Save 40% water.',
      duration: '12:30',
      views: '125K',
      likes: '8.5K',
      category: 'Irrigation',
      level: 'Beginner',
      language: ['en', 'hi', 'te', 'ta', 'mr', 'kn'],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instructor: 'Dr. Ramesh Kumar',
      thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500',
      keyPoints: [
        language === 'hi' ? 'ड्रिप सिस्टम के घटक' : language === 'te' ? 'డ్రిప్ సిస్టమ్ భాగాలు' : language === 'ta' ? 'சொட்டு அமைப்பு கூறுகள்' : language === 'mr' ? 'ठिबक प्रणाली घटक' : language === 'kn' ? 'ಡ್ರಿಪ್ ವ್ಯವಸ್ಥೆ ಘಟಕಗಳು' : 'Drip system components',
        language === 'hi' ? 'चरण-दर-चरण स्थापना' : language === 'te' ? 'దశల వారీ సంస్థాపన' : language === 'ta' ? 'படிப்படியான நிறுவல்' : language === 'mr' ? 'चरण-दर-चरण स्थापना' : language === 'kn' ? 'ಹಂತ-ಹಂತ ಸ್ಥಾಪನೆ' : 'Step-by-step installation',
        language === 'hi' ? 'रखरखाव युक्तियाँ' : language === 'te' ? 'నిర్వహణ చిట్కాలు' : language === 'ta' ? 'பராமரிப்பு குறிப்புகள்' : language === 'mr' ? 'देखभाल टिप्स' : language === 'kn' ? 'ನಿರ್ವಹಣೆ ಸಲಹೆಗಳು' : 'Maintenance tips',
        language === 'hi' ? 'लागत और बचत विश्लेषण' : language === 'te' ? 'ధర మరియు పొదుపు విశ్లేషణ' : language === 'ta' ? 'செலவு மற்றும் சேமிப்பு பகுப்பாய்வு' : language === 'mr' ? 'खर्च आणि बचत विश्लेषण' : language === 'kn' ? 'ವೆಚ್ಚ ಮತ್ತು ಉಳಿತಾಯ ವಿಶ್ಲೇಷಣೆ' : 'Cost and savings analysis'
      ],
      resources: ['Installation Guide PDF', 'Equipment Supplier List', 'Subsidy Application Form']
    },
    {
      id: '2',
      title: language === 'hi' ? 'जैविक कीट नियंत्रण' : language === 'te' ? 'సేంద్రీయ చీడ నియంత్రణ' : language === 'ta' ? 'இயற்கை பூச்சி கட்டுப்பாடு' : language === 'mr' ? 'सेंद्रिय किडा नियंत्रण' : language === 'kn' ? 'ಸಾವಯವ ಕೀಟ ನಿಯಂತ್ರಣ' : 'Organic Pest Control',
      description: language === 'hi' ? 'रासायनिक कीटनाशकों के बिना कीटों को प्रबंधित करने के लिए प्राकृतिक तरीके' : language === 'te' ? 'రసాయన పురుగుమందులు లేకుండా చీడలను నిర్వహించడానికి సహజ పద్ధతులు' : language === 'ta' ? 'இரசாயன பூச்சிக்கொல்லிகள் இல்லாமல் பூச்சிகளை நிர்வகிக்க இயற்கை முறைகள்' : language === 'mr' ? 'रासायनिक कीटकनाशकांशिवाय किड व्यवस्थापित करण्यासाठी नैसर्गिक पद्धती' : language === 'kn' ? 'ರಾಸಾಯನಿಕ ಕೀಟನಾಶಕಗಳಿಲ್ಲದೆ ಕೀಟಗಳನ್ನು ನಿರ್ವಹಿಸಲು ನೈಸರ್ಗಿಕ ವಿಧಾನಗಳು' : 'Natural methods to manage pests without chemical pesticides',
      duration: '18:45',
      views: '250K',
      likes: '15K',
      category: 'Pest Management',
      level: 'Intermediate',
      language: ['en', 'hi', 'te', 'ta', 'mr', 'kn'],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instructor: 'Prof. Anita Sharma',
      thumbnail: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500',
      keyPoints: [
        language === 'hi' ? 'नीम तेल स्प्रे तैयारी' : language === 'te' ? 'వేప నూనె స్ప్రే తయారీ' : language === 'ta' ? 'வேம்பு எண்ணெய் தெளிப்பு தயாரிப்பு' : language === 'mr' ? 'कडुलिंब तेल फवारणी तयारी' : language === 'kn' ? 'ಬೇವಿನ ಎಣ್ಣೆ ಸ್ಪ್ರೇ ತಯಾರಿಕೆ' : 'Neem oil spray preparation',
        language === 'hi' ? 'जैविक नियंत्रण एजेंट' : language === 'te' ? 'జీవ నియంత్రణ ఏజెంట్లు' : language === 'ta' ? 'உயிரியல் கட்டுப்பாட்டு முகவர்கள்' : language === 'mr' ? 'जैविक नियंत्रण एजंट' : language === 'kn' ? 'ಜೈವಿಕ ನಿಯಂತ್ರಣ ಏಜೆಂಟ್‌ಗಳು' : 'Biological control agents',
        language === 'hi' ? 'फंसाने की तकनीक' : language === 'te' ? 'ట్రాపింగ్ పద్ధతులు' : language === 'ta' ? 'பொறி வைத்தல் நுட்பங்கள்' : language === 'mr' ? 'सापळा तंत्र' : language === 'kn' ? 'ಬಲೆಗೊಳಿಸುವ ತಂತ್ರಗಳು' : 'Trapping techniques',
        language === 'hi' ? 'निवारक उपाय' : language === 'te' ? 'నివారణ చర్యలు' : language === 'ta' ? 'தடுப்பு நடவடிக்கைகள்' : language === 'mr' ? 'प्रतिबंधात्मक उपाय' : language === 'kn' ? 'ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳು' : 'Preventive measures'
      ],
      resources: ['Organic Pest Control Chart', 'Recipe Book', 'Supplier Directory']
    },
    {
      id: '3',
      title: language === 'hi' ? 'घर पर मिट्टी परीक्षण' : language === 'te' ? 'ఇంట్లో మట్టి పరీక్ష' : language === 'ta' ? 'வீட்டில் மண் சோதனை' : language === 'mr' ? 'घरी माती चाचणी' : language === 'kn' ? 'ಮನೆಯಲ್ಲಿ ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ' : 'Soil Testing at Home',
      description: language === 'hi' ? 'सरल उपकरणों का उपयोग करके अपनी मिट्टी का परीक्षण कैसे करें' : language === 'te' ? 'సాధారణ సాధనాలను ఉపయోగించి మీ మట్టిని ఎలా పరీక్షించాలి' : language === 'ta' ? 'எளிய கருவிகளைப் பயன்படுத்தி உங்கள் மண்ணை எவ்வாறு சோதிப்பது' : language === 'mr' ? 'साध्या साधनांचा वापर करून आपली माती कशी तपासावी' : language === 'kn' ? 'ಸರಳ ಉಪಕರಣಗಳನ್ನು ಬಳಸಿ ನಿಮ್ಮ ಮಣ್ಣನ್ನು ಹೇಗೆ ಪರೀಕ್ಷಿಸುವುದು' : 'How to test your soil using simple tools',
      duration: '15:20',
      views: '180K',
      likes: '12K',
      category: 'Soil Management',
      level: 'Beginner',
      language: ['en', 'hi', 'te', 'ta', 'mr', 'kn'],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instructor: 'Dr. Vijay Patil',
      thumbnail: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=500',
      keyPoints: [
        language === 'hi' ? 'pH परीक्षण विधि' : language === 'te' ? 'pH పరీక్ష పద్ధతి' : language === 'ta' ? 'pH சோதனை முறை' : language === 'mr' ? 'pH चाचणी पद्धत' : language === 'kn' ? 'pH ಪರೀಕ್ಷಾ ವಿಧಾನ' : 'pH testing method',
        language === 'hi' ? 'NPK मूल्यांकन' : language === 'te' ? 'NPK మూల్యాంకనం' : language === 'ta' ? 'NPK மதிப்பீடு' : language === 'mr' ? 'NPK मूल्यांकन' : language === 'kn' ? 'NPK ಮೌಲ್ಯಮಾಪನ' : 'NPK evaluation',
        language === 'hi' ? 'जल निकासी जांच' : language === 'te' ? 'డ్రైనేజ్ తనిఖీ' : language === 'ta' ? 'வடிகால் சோதனை' : language === 'mr' ? 'ड्रेनेज तपासणी' : language === 'kn' ? 'ಒಳಚರಂಡಿ ಪರಿಶೀಲನೆ' : 'Drainage check',
        language === 'hi' ? 'सुधार सिफारिशें' : language === 'te' ? 'మెరుగుదల సిఫార్సులు' : language === 'ta' ? 'மேம்பாட்டு பரிந்துரைகள்' : language === 'mr' ? 'सुधारणा शिफारसी' : language === 'kn' ? 'ಸುಧಾರಣೆ ಶಿಫಾರಸುಗಳು' : 'Improvement recommendations'
      ],
      resources: ['Soil Testing Kit', 'NPK Chart', 'Correction Guide']
    },
    {
      id: '4',
      title: language === 'hi' ? 'फसल चक्र मार्गदर्शिका' : language === 'te' ? 'పంట భ్రమణ మార్గదర్శి' : language === 'ta' ? 'பயிர் சுழற்சி வழிகாட்டி' : language === 'mr' ? 'पीक फेरबदल मार्गदर्शक' : language === 'kn' ? 'ಬೆಳೆ ತಿರುಗುವಿಕೆ ಮಾರ್ಗದರ್ಶಿ' : 'Crop Rotation Guide',
      description: language === 'hi' ? 'मिट्टी की उर्वरता बढ़ाने और कीटों को कम करने के लिए फसलों को घुमाएं' : language === 'te' ? 'మట్టి సారవంతత పెంచడానికి మరియు చీడలను తగ్గించడానికి పంటలను తిప్పండి' : language === 'ta' ? 'மண் வளத்தை அதிகரிக்கவும் பூச்சிகளை குறைக்கவும் பயிர்களை சுழற்றுங்கள்' : language === 'mr' ? 'माती सुपीकता वाढवण्यासाठी आणि किडे कमी करण्यासाठी पिके फिरवा' : language === 'kn' ? 'ಮಣ್ಣಿನ ಫಲವತ್ತತೆಯನ್ನು ಹೆಚ್ಚಿಸಲು ಮತ್ತು ಕೀಟಗಳನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಬೆಳೆಗಳನ್ನು ತಿರುಗಿಸಿ' : 'Rotate crops to increase soil fertility and reduce pests',
      duration: '22:10',
      views: '300K',
      likes: '20K',
      category: 'Crop Management',
      level: 'Advanced',
      language: ['en', 'hi', 'te', 'ta', 'mr', 'kn'],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instructor: 'Dr. Sunita Reddy',
      thumbnail: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500',
      keyPoints: [
        language === 'hi' ? '3-4 साल की घूर्णन योजना' : language === 'te' ? '3-4 సంవత్సరాల భ్రమణ ప్రణాళిక' : language === 'ta' ? '3-4 ஆண்டு சுழற்சி திட்டம்' : language === 'mr' ? '3-4 वर्षांची फेरबदल योजना' : language === 'kn' ? '3-4 ವರ್ಷಗಳ ತಿರುಗುವಿಕೆ ಯೋಜನೆ' : '3-4 year rotation plan',
        language === 'hi' ? 'फसल परिवार संगतता' : language === 'te' ? 'పంట కుటుంబ అనుకూలత' : language === 'ta' ? 'பயிர் குடும்ப இணக்கம்' : language === 'mr' ? 'पीक कुटुंब सुसंगतता' : language === 'kn' ? 'ಬೆಳೆ ಕುಟುಂಬ ಹೊಂದಾಣಿಕೆ' : 'Crop family compatibility',
        language === 'hi' ? 'हरी खाद एकीकरण' : language === 'te' ? 'పచ్చి ఎరువు ఏకీకరణ' : language === 'ta' ? 'பசுமை உர ஒருங்கிணைப்பு' : language === 'mr' ? 'हिरवे खत एकीकरण' : language === 'kn' ? 'ಹಸಿರು ಗೊಬ್ಬರ ಏಕೀಕರಣ' : 'Green manure integration',
        language === 'hi' ? 'आर्थिक लाभ' : language === 'te' ? 'ఆర్థిక ప్రయోజనాలు' : language === 'ta' ? 'பொருளாதார பலன்கள்' : language === 'mr' ? 'आर्थिक फायदे' : language === 'kn' ? 'ಆರ್ಥಿಕ ಪ್ರಯೋಜನಗಳು' : 'Economic benefits'
      ],
      resources: ['Rotation Calendar', 'Crop Family Chart', 'Planning Template']
    },
    {
      id: '5',
      title: language === 'hi' ? 'बाजार मूल्य विश्लेषण' : language === 'te' ? 'మార్కెట్ ధర విశ్లేషణ' : language === 'ta' ? 'சந்தை விலை பகுப்பாய்வு' : language === 'mr' ? 'बाजार किंमत विश्लेषण' : language === 'kn' ? 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ವಿಶ್ಲೇಷಣೆ' : 'Market Price Analysis',
      description: language === 'hi' ? 'बेहतर कीमतों के लिए बाजार के रुझान को समझें और अपनी फसल को सही समय पर बेचें' : language === 'te' ? 'మెరుగైన ధరల కోసం మార్కెట్ ట్రెండ్‌లను అర్థం చేసుకోండి మరియు సరైన సమయంలో మీ పంటను విక్రయించండి' : language === 'ta' ? 'சிறந்த விலைகளுக்கு சந்தை போக்குகளை புரிந்து கொண்டு சரியான நேரத்தில் உங்கள் பயிரை விற்கவும்' : language === 'mr' ? 'चांगल्या किमतीसाठी बाजाराचे कल समजून घ्या आणि योग्य वेळी आपले पीक विका' : language === 'kn' ? 'ಉತ್ತಮ ಬೆಲೆಗಳಿಗಾಗಿ ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ ಮತ್ತು ಸರಿಯಾದ ಸಮಯದಲ್ಲಿ ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಮಾರಾಟ ಮಾಡಿ' : 'Understand market trends and sell your crop at the right time for better prices',
      duration: '14:50',
      views: '150K',
      likes: '10K',
      category: 'Marketing',
      level: 'Intermediate',
      language: ['en', 'hi', 'te', 'ta', 'mr', 'kn'],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instructor: 'Mr. Rajesh Gupta',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
      keyPoints: [
        language === 'hi' ? 'मूल्य पूर्वानुमान तकनीक' : language === 'te' ? 'ధర అంచనా పద్ధతులు' : language === 'ta' ? 'விலை முன்னறிவிப்பு நுட்பங்கள்' : language === 'mr' ? 'किंमत अंदाज तंत्र' : language === 'kn' ? 'ಬೆಲೆ ಮುನ್ಸೂಚನೆ ತಂತ್ರಗಳು' : 'Price forecasting techniques',
        language === 'hi' ? 'मांडी बनाम ई-मंडी' : language === 'te' ? 'మండి vs ఈ-మండి' : language === 'ta' ? 'மண்டி vs இ-மண்டி' : language === 'mr' ? 'मंडी vs ई-मंडी' : language === 'kn' ? 'ಮಂಡಿ vs ಇ-ಮಂಡಿ' : 'Mandi vs e-Mandi',
        language === 'hi' ? 'मौसमी पैटर्न' : language === 'te' ? 'కాలానుగుణ నమూనాలు' : language === 'ta' ? 'பருவகால வடிவங்கள்' : language === 'mr' ? 'हंगामी नमुने' : language === 'kn' ? 'ಕಾಲೋಚಿತ ಮಾದರಿಗಳು' : 'Seasonal patterns',
        language === 'hi' ? 'बातचीत कौशल' : language === 'te' ? 'చర్చల నైపుణ్యాలు' : language === 'ta' ? 'பேச்சுவார்த்தை திறன்கள்' : language === 'mr' ? 'वाटाघाटी कौशल्ये' : language === 'kn' ? 'ಮಾತುಕತೆ ಕೌಶಲ್ಯಗಳು' : 'Negotiation skills'
      ],
      resources: ['Price Tracker App', 'Mandi Directory', 'Negotiation Guide']
    },
    {
      id: '6',
      title: language === 'hi' ? 'सरकारी योजनाएं' : language === 'te' ? 'ప్రభుత్వ పథకాలు' : language === 'ta' ? 'அரசு திட்டங்கள்' : language === 'mr' ? 'सरकारी योजना' : language === 'kn' ? 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು' : 'Government Schemes',
      description: language === 'hi' ? 'किसानों के लिए उपलब्ध सभी सरकारी योजनाओं और सब्सिडी के लिए आवेदन कैसे करें' : language === 'te' ? 'రైతుల కోసం అందుబాటులో ఉన్న అన్ని ప్రభుత్వ పథకాలు మరియు సబ్సిడీల కోసం ఎలా దరఖాస్తు చేసుకోవాలి' : language === 'ta' ? 'விவசாயிகளுக்கு கிடைக்கும் அனைத்து அரசு திட்டங்கள் மற்றும் மானியங்களுக்கு எவ்வாறு விண்ணப்பிப்பது' : language === 'mr' ? 'शेतकऱ्यांसाठी उपलब्ध सर्व सरकारी योजना आणि अनुदानासाठी अर्ज कसा करावा' : language === 'kn' ? 'ರೈತರಿಗೆ ಲಭ್ಯವಿರುವ ಎಲ್ಲಾ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ಸಬ್ಸಿಡಿಗಳಿಗೆ ಹೇಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು' : 'How to apply for all government schemes and subsidies available for farmers',
      duration: '20:00',
      views: '200K',
      likes: '14K',
      category: 'Government',
      level: 'Beginner',
      language: ['en', 'hi', 'te', 'ta', 'mr', 'kn'],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instructor: 'Mrs. Kavita Singh',
      thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500',
      keyPoints: [
        language === 'hi' ? 'PM-KISAN पंजीकरण' : language === 'te' ? 'PM-KISAN నమోదు' : language === 'ta' ? 'PM-KISAN பதிவு' : language === 'mr' ? 'PM-KISAN नोंदणी' : language === 'kn' ? 'PM-KISAN ನೋಂದಣಿ' : 'PM-KISAN registration',
        language === 'hi' ? 'PMFBY बीमा' : language === 'te' ? 'PMFBY బీమా' : language === 'ta' ? 'PMFBY காப்பீடு' : language === 'mr' ? 'PMFBY विमा' : language === 'kn' ? 'PMFBY ವಿಮೆ' : 'PMFBY insurance',
        language === 'hi' ? 'KCC ऋण' : language === 'te' ? 'KCC రుణం' : language === 'ta' ? 'KCC கடன்' : language === 'mr' ? 'KCC कर्ज' : language === 'kn' ? 'KCC ಸಾಲ' : 'KCC loan',
        language === 'hi' ? 'दस्तावेज़ आवश्यकताएं' : language === 'te' ? 'పత్రాల అవసరాలు' : language === 'ta' ? 'ஆவண தேவைகள்' : language === 'mr' ? 'कागदपत्रे आवश्यकता' : language === 'kn' ? 'ದಾಖಲೆ ಅವಶ್ಯಕತೆಗಳು' : 'Document requirements'
      ],
      resources: ['Scheme Checklist', 'Application Forms', 'Helpline Numbers']
    }
  ];

  const categories = ['All', 'Irrigation', 'Pest Management', 'Soil Management', 'Crop Management', 'Marketing', 'Government'];

  const filteredVideos = videoLessons.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleVideoSelect = (video: VideoLesson) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const handleMarkComplete = () => {
    if (selectedVideo && !completedVideos.includes(selectedVideo.id)) {
      setCompletedVideos([...completedVideos, selectedVideo.id]);
      toast.success(language === 'hi' ? 'पाठ पूर्ण के रूप में चिह्नित!' : language === 'te' ? 'పాఠం పూర్తయినదిగా గుర్తించబడింది!' : language === 'ta' ? 'பாடம் முடிந்ததாக குறிக்கப்பட்டது!' : language === 'mr' ? 'धडा पूर्ण म्हणून चिन्हांकित!' : language === 'kn' ? 'ಪಾಠ ಪೂರ್ಣಗೊಂಡಿದೆ ಎಂದು ಗುರುತಿಸಲಾಗಿದೆ!' : 'Lesson marked as complete!');
    }
  };

  const handleNextLesson = () => {
    if (selectedVideo) {
      const currentIndex = videoLessons.findIndex(v => v.id === selectedVideo.id);
      if (currentIndex < videoLessons.length - 1) {
        handleVideoSelect(videoLessons[currentIndex + 1]);
      }
    }
  };

  const handlePreviousLesson = () => {
    if (selectedVideo) {
      const currentIndex = videoLessons.findIndex(v => v.id === selectedVideo.id);
      if (currentIndex > 0) {
        handleVideoSelect(videoLessons[currentIndex - 1]);
      }
    }
  };

  const progressPercentage = (completedVideos.length / videoLessons.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-purple-600" />
          {t.title}
        </h2>
        <p className="text-gray-600 mt-2">{t.subtitle}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.totalCourses}</p>
                <p className="text-2xl font-bold text-blue-600">{videoLessons.length}</p>
              </div>
              <Video className="w-10 h-10 text-blue-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.completedCourses}</p>
                <p className="text-2xl font-bold text-green-600">{completedVideos.length}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.courseProgress}</p>
                <p className="text-2xl font-bold text-purple-600">{Math.round(progressPercentage)}%</p>
              </div>
              <Award className="w-10 h-10 text-purple-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.hoursLearned}</p>
                <p className="text-2xl font-bold text-orange-600">24.5</p>
              </div>
              <Clock className="w-10 h-10 text-orange-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="border-none shadow-md">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t.courseProgress}</span>
              <span className="font-semibold text-purple-600">{completedVideos.length}/{videoLessons.length} {t.completed}</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'All' ? t.allCategories : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Video Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredVideos.map((video) => {
          const isCompleted = completedVideos.includes(video.id);
          
          if (viewMode === 'list') {
            return (
              <Card key={video.id} className="hover:shadow-lg transition-shadow border-none">
                <div className="flex">
                  <div className="relative w-48 h-32 bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <PlayCircle className="w-12 h-12 text-white" />
                    </div>
                    {isCompleted && (
                      <Badge className="absolute top-2 right-2 bg-green-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {t.completed}
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{video.title}</h3>
                      <Badge variant="outline">{video.level}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {video.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        {video.likes}
                      </span>
                    </div>
                    <Button 
                      onClick={() => handleVideoSelect(video)} 
                      variant={isCompleted ? 'outline' : 'default'}
                      size="sm"
                      className="w-full"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isCompleted ? t.continue : t.watchNow}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          }

          return (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="hover:shadow-xl transition-shadow border-none overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-purple-400 to-indigo-600">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PlayCircle className="w-16 h-16 text-white cursor-pointer" onClick={() => handleVideoSelect(video)} />
                    </motion.div>
                  </div>
                  {isCompleted && (
                    <Badge className="absolute top-3 right-3 bg-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {t.completed}
                    </Badge>
                  )}
                  <Badge className="absolute bottom-3 right-3 bg-black/70">
                    {video.duration}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{video.title}</CardTitle>
                    <Badge variant="outline" className="ml-2 flex-shrink-0">{video.level}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {video.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      {video.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {video.instructor.split(' ')[1]}
                    </span>
                  </div>
                  <Button 
                    onClick={() => handleVideoSelect(video)} 
                    variant={isCompleted ? 'outline' : 'default'}
                    size="sm" 
                    className="w-full"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isCompleted ? t.continue : t.watchNow}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">{selectedVideo.title}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedVideo(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 space-y-6">
                {/* Video Player */}
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    src={selectedVideo.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Video Controls */}
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handlePreviousLesson} variant="outline" size="sm">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    {t.previousLesson}
                  </Button>
                  <Button onClick={handleNextLesson} variant="outline" size="sm">
                    {t.nextLesson}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                  <Button onClick={handleMarkComplete} variant="default" size="sm" className="bg-green-500 hover:bg-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {t.markComplete}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-1" />
                    {t.shareVideo}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    {t.downloadCertificate}
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Video Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-md">
                      <CardHeader>
                        <CardTitle className="text-lg">{t.explanation}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-700">{selectedVideo.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {t.instructor}: <strong>{selectedVideo.instructor}</strong>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {t.duration}: <strong>{selectedVideo.duration}</strong>
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {selectedVideo.views} {t.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {selectedVideo.likes} {t.likes}
                          </span>
                          <Badge>{selectedVideo.level}</Badge>
                          <Badge variant="outline">{selectedVideo.category}</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-md">
                      <CardHeader>
                        <CardTitle className="text-lg">{t.keyPoints}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {selectedVideo.keyPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Resources */}
                  <div className="space-y-6">
                    <Card className="border-none shadow-md">
                      <CardHeader>
                        <CardTitle className="text-lg">{t.resources}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {selectedVideo.resources.map((resource, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            {resource}
                          </Button>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-md bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                      <CardContent className="p-6 text-center">
                        <Award className="w-16 h-16 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          {language === 'hi' ? 'प्रमाणपत्र अर्जित करें!' : 
                           language === 'te' ? 'సర్టిఫికేట్ సంపాదించండి!' : 
                           language === 'ta' ? 'சான்றிதழ் பெறுங்கள்!' : 
                           language === 'mr' ? 'प्रमाणपत्र मिळवा!' : 
                           language === 'kn' ? 'ಪ್ರಮಾಣಪತ್ರ ಗಳಿಸಿ!' : 
                           'Earn a Certificate!'}
                        </h3>
                        <p className="text-sm opacity-90 mb-4">
                          {language === 'hi' ? 'सभी पाठ पूरे करें और अपना प्रमाणपत्र डाउनलोड करें' : 
                           language === 'te' ? 'అన్ని పాఠాలను పూర్తి చేసి మీ సర్టిఫికేట్‌ను డౌన్‌లోడ్ చేసుకోండి' : 
                           language === 'ta' ? 'அனைத்து பாடங்களையும் முடித்து உங்கள் சான்றிதழைப் பதிவிறக்கவும்' : 
                           language === 'mr' ? 'सर्व धडे पूर्ण करा आणि आपले प्रमाणपत्र डाउनलोड करा' : 
                           language === 'kn' ? 'ಎಲ್ಲಾ ಪಾಠಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ' : 
                           'Complete all lessons and download your certificate'}
                        </p>
                        <Progress value={progressPercentage} className="h-2 bg-white/30" />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
