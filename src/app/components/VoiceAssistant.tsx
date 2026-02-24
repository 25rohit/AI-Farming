import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, MicOff, Volume2, VolumeX, MessageSquare, Video, 
  Camera, Upload, X, Play, Pause, StopCircle, Send,
  Languages, Phone, RefreshCw, Download, Image as ImageIcon
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  type?: 'text' | 'voice' | 'video' | 'image';
  mediaUrl?: string;
  timestamp?: string;
}

const translations = {
  en: {
    title: 'Smart Voice & Video Assistant',
    subtitle: 'Offline voice support • Video crop analysis • Multi-language',
    conversation: 'Conversation',
    voiceMode: 'Voice Mode',
    videoMode: 'Video Mode',
    quickQueries: 'Quick Queries',
    offlineMode: 'Offline Mode',
    offlineDesc: 'Works completely offline in rural areas using on-device AI models. No internet required!',
    tapToSpeak: 'Tap to speak',
    listening: 'Listening... Speak now',
    recording: 'Recording video...',
    analyzing: 'Analyzing video...',
    uploadVideo: 'Upload Video',
    recordVideo: 'Record Video',
    takePhoto: 'Take Photo',
    stopRecording: 'Stop Recording',
    sendMessage: 'Send Message',
    typePlaceholder: 'Type your question...',
    videoAnalysis: 'Video Crop Analysis',
    voiceEnabled: 'Voice output enabled',
    voiceDisabled: 'Voice output disabled',
    greeting: 'Namaste! I am your agricultural assistant. How can I help you today?'
  },
  hi: {
    title: 'स्मार्ट आवाज और वीडियो सहायक',
    subtitle: 'ऑफलाइन आवाज सपोर्ट • वीडियो फसल विश्लेषण • बहुभाषी',
    conversation: 'बातचीत',
    voiceMode: 'आवाज मोड',
    videoMode: 'वीडियो मोड',
    quickQueries: 'त्वरित प्रश्न',
    offlineMode: 'ऑफलाइन मोड',
    offlineDesc: 'ग्रामीण क्षेत्रों में पूरी तरह से ऑफलाइन काम करता है। इंटरनेट की जरूरत नहीं!',
    tapToSpeak: 'बोलने के लिए टैप करें',
    listening: 'सुन रहे हैं... अब बोलें',
    recording: 'वीडियो रिकॉर्ड हो रहा है...',
    analyzing: 'वीडियो का विश्लेषण हो रहा है...',
    uploadVideo: 'वीडियो अपलोड करें',
    recordVideo: 'वीडियो रिकॉर्ड करें',
    takePhoto: 'फोटो लें',
    stopRecording: 'रिकॉर्डिंग बंद करें',
    sendMessage: 'संदेश भेजें',
    typePlaceholder: 'अपना प्रश्न लिखें...',
    videoAnalysis: 'वीडियो फसल विश्लेषण',
    voiceEnabled: 'आवाज आउटपुट सक्षम',
    voiceDisabled: 'आवाज आउटपुट अक्षम',
    greeting: 'नमस्ते! मैं आपका कृषि सहायक हूं। मैं आज आपकी कैसे मदद कर सकता हूं?'
  },
  te: {
    title: 'స్మార్ట్ వాయిస్ & వీడియో అసిస్టెంట్',
    subtitle: 'ఆఫ్‌లైన్ వాయిస్ సపోర్ట్ • వీడియో పంట విశ్లేషణ • బహుభాషా',
    conversation: 'సంభాషణ',
    voiceMode: 'వాయిస్ మోడ్',
    videoMode: 'వీడియో మోడ్',
    quickQueries: 'త్వరిత ప్రశ్నలు',
    offlineMode: 'ఆఫ్‌లైన్ మోడ్',
    offlineDesc: 'గ్రామీణ ప్రాంతాల్లో పూర్తిగా ఆఫ్‌లైన్‌లో పనిచేస్తుంది. ఇంటర్నెట్ అవసరం లేదు!',
    tapToSpeak: 'మాట్లాడటానికి ట్యాప్ చేయండి',
    listening: 'వింటున్నాం... ఇప్పుడు మాట్లాడండి',
    recording: 'వీడియో రికార్డ్ అవుతోంది...',
    analyzing: 'వీడియో విశ్లేషణ...',
    uploadVideo: 'వీడియో అప్‌లోడ్ చేయండి',
    recordVideo: 'వీడియో రికార్డ్ చేయండి',
    takePhoto: 'ఫోటో తీయండి',
    stopRecording: 'రికార్డింగ్ ఆపండి',
    sendMessage: 'సందేశం పంపండి',
    typePlaceholder: 'మీ ప్రశ్నను టైప్ చేయండి...',
    videoAnalysis: 'వీడియో పంట విశ్లేషణ',
    voiceEnabled: 'వాయిస్ అవుట్‌పుట్ ప్రారంభించబడింది',
    voiceDisabled: 'వాయిస్ అవుట్‌పుట్ నిలిపివేయబడింది',
    greeting: 'నమస్కారం! నేను మీ వ్యవసాయ సహాయకుడను. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?'
  },
  ta: {
    title: 'ஸ்மார்ட் குரல் & வீடியோ உதவியாளர்',
    subtitle: 'ஆஃப்லைன் குரல் ஆதரவு • வீடியோ பயிர் பகுப்பாய்வு • பல மொழி',
    conversation: 'உரையாடல்',
    voiceMode: 'குரல் பயன்முறை',
    videoMode: 'வீடியோ பயன்முறை',
    quickQueries: 'விரைவு கேள்விகள்',
    offlineMode: 'ஆஃப்லைன் பயன்முறை',
    offlineDesc: 'கிராமப்புற பகுதிகளில் முழுவதுமாக ஆஃப்லைனில் வேலை செய்கிறது. இணையம் தேவையில்லை!',
    tapToSpeak: 'பேச தட்டவும்',
    listening: 'கேட்கிறது... இப்போது பேசுங்கள்',
    recording: 'வீடியோ பதிவு செய்யப்படுகிறது...',
    analyzing: 'வீடியோ பகுப்பாய்வு...',
    uploadVideo: 'வீடியோவை பதிவேற்றவும்',
    recordVideo: 'வீடியோவை பதிவு செய்யவும்',
    takePhoto: 'புகைப்படம் எடுக்கவும்',
    stopRecording: 'பதிவை நிறுத்தவும்',
    sendMessage: 'செய்தி அனுப்பவும்',
    typePlaceholder: 'உங்கள் கேள்வியை தட்டச்சு செய்யவும்...',
    videoAnalysis: 'வீடியோ பயிர் பகுப்பாய்வு',
    voiceEnabled: 'குரல் வெளியீடு இயக்கப்பட்டது',
    voiceDisabled: 'குரல் வெளியீடு முடக்கப்பட்டது',
    greeting: 'வணக்கம்! நான் உங்கள் விவசாய உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?'
  },
  mr: {
    title: 'स्मार्ट व्हॉइस आणि व्हिडिओ सहाय्यक',
    subtitle: 'ऑफलाइन व्हॉइस सपोर्ट • व्हिडिओ पीक विश्लेषण • बहुभाषिक',
    conversation: 'संभाषण',
    voiceMode: 'व्हॉइस मोड',
    videoMode: 'व्हिडिओ मोड',
    quickQueries: 'जलद प्रश्न',
    offlineMode: 'ऑफलाइन मोड',
    offlineDesc: 'ग्रामीण भागात पूर्णपणे ऑफलाइन काम करते. इंटरनेटची गरज नाही!',
    tapToSpeak: 'बोलण्यासाठी टॅप करा',
    listening: 'ऐकत आहे... आता बोला',
    recording: 'व्हिडिओ रेकॉर्ड होत आहे...',
    analyzing: 'व्हिडिओ विश्लेषण करत आहे...',
    uploadVideo: 'व्हिडिओ अपलोड करा',
    recordVideo: 'व्हिडिओ रेकॉर्ड करा',
    takePhoto: 'फोटो काढा',
    stopRecording: 'रेकॉर्डिंग थांबवा',
    sendMessage: 'संदेश पाठवा',
    typePlaceholder: 'तुमचा प्रश्न टाइप करा...',
    videoAnalysis: 'व्हिडिओ पीक विश्लेषण',
    voiceEnabled: 'व्हॉइस आउटपुट सक्षम',
    voiceDisabled: 'व्हॉइस आउटपुट अक्षम',
    greeting: 'नमस्कार! मी तुमचा कृषी सहाय्यक आहे. आज मी तुम्हाला कशी मदत करू शकतो?'
  },
  kn: {
    title: 'ಸ್ಮಾರ್ಟ್ ಧ್ವನಿ ಮತ್ತು ವೀಡಿಯೊ ಸಹಾಯಕ',
    subtitle: 'ಆಫ್‌ಲೈನ್ ಧ್ವನಿ ಬೆಂಬಲ • ವೀಡಿಯೊ ಬೆಳೆ ವಿಶ್ಲೇಷಣೆ • ಬಹು ಭಾಷೆ',
    conversation: 'ಸಂವಾದ',
    voiceMode: 'ಧ್ವನಿ ಮೋಡ್',
    videoMode: 'ವೀಡಿಯೊ ಮೋಡ್',
    quickQueries: 'ತ್ವರಿತ ಪ್ರಶ್ನೆಗಳು',
    offlineMode: 'ಆಫ್‌ಲೈನ್ ಮೋಡ್',
    offlineDesc: 'ಗ್ರಾಮೀಣ ಪ್ರದೇಶಗಳಲ್ಲಿ ಸಂಪೂರ್ಣವಾಗಿ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ. ಇಂಟರ್ನೆಟ್ ಅಗತ್ಯವಿಲ್ಲ!',
    tapToSpeak: 'ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ',
    listening: 'ಕೇಳುತ್ತಿದೆ... ಈಗ ಮಾತನಾಡಿ',
    recording: 'ವೀಡಿಯೊ ರೆಕಾರ್ಡ್ ಆಗುತ್ತಿದೆ...',
    analyzing: 'ವೀಡಿಯೊ ವಿಶ್ಲೇಷಣೆ...',
    uploadVideo: 'ವೀಡಿಯೊ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    recordVideo: 'ವೀಡಿಯೊ ರೆಕಾರ್ಡ್ ಮಾಡಿ',
    takePhoto: 'ಫೋಟೋ ತೆಗೆಯಿರಿ',
    stopRecording: 'ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ',
    sendMessage: 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
    typePlaceholder: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...',
    videoAnalysis: 'ವೀಡಿಯೊ ಬೆಳೆ ವಿಶ್ಲೇಷಣೆ',
    voiceEnabled: 'ಧ್ವನಿ ಔಟ್‌ಪುಟ್ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ',
    voiceDisabled: 'ಧ್ವನಿ ಔಟ್‌ಪುಟ್ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ',
    greeting: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕೃಷಿ ಸಹಾಯಕ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?'
  }
};

export default function VoiceAssistant({ language }: { language: string }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [mode, setMode] = useState<'voice' | 'video' | 'text'>('voice');
  const [activeTab, setActiveTab] = useState('voice');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const t = translations[language as keyof typeof translations] || translations.en;

  useEffect(() => {
    // Add initial greeting message
    if (messages.length === 0) {
      setMessages([{ 
        role: 'assistant', 
        text: t.greeting,
        type: 'text',
        timestamp: new Date().toISOString()
      }]);
    }
  }, []);

  // Voice Recognition
  const toggleListening = async () => {
    if (!isListening) {
      setIsListening(true);
      toast.success(t.listening);
      
      // Simulate voice recognition with Web Speech API
      try {
        // In production, use: const recognition = new webkitSpeechRecognition();
        // For demo, simulate after 2 seconds
        setTimeout(() => {
          const farmerQuestions = [
            'What fertilizer should I use for rice?',
            'When should I irrigate my crops?',
            'How can I prevent pests in wheat?',
            'What is the market price for cotton today?',
            'Tell me about PM-KISAN scheme',
            'How to increase crop yield?',
            'Best time to sow maize?',
            'Organic farming tips'
          ];
          const question = farmerQuestions[Math.floor(Math.random() * farmerQuestions.length)];
          
          setMessages(prev => [...prev, { 
            role: 'user', 
            text: question,
            type: 'voice',
            timestamp: new Date().toISOString()
          }]);
          setIsListening(false);

          // Generate AI response
          setTimeout(() => {
            const response = generateResponse(question);
            setMessages(prev => [...prev, { 
              role: 'assistant', 
              text: response,
              type: 'text',
              timestamp: new Date().toISOString()
            }]);
            
            // Speak response if enabled
            if (isSpeaking) {
              speakText(response);
            }
          }, 1000);
        }, 2000);
      } catch (error) {
        console.error('Voice recognition error:', error);
        toast.error('Voice recognition not supported');
        setIsListening(false);
      }
    } else {
      setIsListening(false);
      toast.info('Stopped listening');
    }
  };

  // Text to Speech
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : language === 'ta' ? 'ta-IN' : 'en-IN';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
      toast.info('Reading response...');
    }
  };

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
    toast.success(isSpeaking ? t.voiceDisabled : t.voiceEnabled);
  };

  // Video Recording
  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);
        setVideoPreview(videoUrl);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        
        // Analyze video for crop health/pest detection
        await analyzeVideo(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success(t.recording);
    } catch (error) {
      console.error('Video recording error:', error);
      toast.error('Camera access denied or not available');
    }
  };

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.info('Recording stopped');
    }
  };

  // Video Upload
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
      analyzeVideo(file);
    } else {
      toast.error('Please select a valid video file');
    }
  };

  // Photo Upload
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      
      setMessages(prev => [...prev, { 
        role: 'user', 
        text: 'Uploaded crop photo for analysis',
        type: 'image',
        mediaUrl: imageUrl,
        timestamp: new Date().toISOString()
      }]);

      // Simulate image analysis
      toast.info('Analyzing image...');
      setTimeout(() => {
        const analysis = analyzeImage();
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          text: analysis,
          type: 'text',
          timestamp: new Date().toISOString()
        }]);
      }, 2000);
    }
  };

  // Analyze uploaded video
  const analyzeVideo = async (videoBlob: Blob | File) => {
    toast.info(t.analyzing);
    
    setMessages(prev => [...prev, { 
      role: 'user', 
      text: 'Uploaded crop video for analysis',
      type: 'video',
      mediaUrl: videoPreview || URL.createObjectURL(videoBlob as Blob),
      timestamp: new Date().toISOString()
    }]);

    // Simulate AI video analysis
    setTimeout(() => {
      const analysis = `🎥 Video Analysis Results:

✅ Crop Health Status: Good (NDVI: 0.75)
🌱 Growth Stage: Vegetative (Day 45)
💧 Moisture Level: Adequate (78%)
🐛 Pest Detection: 2 aphids detected in sector B
🍂 Leaf Discoloration: Minor yellowing (3% area)

📊 Recommendations:
• Apply neem oil spray for aphid control
• Monitor nitrogen levels - slight deficiency detected
• Maintain current irrigation schedule
• Expect harvest in 35-40 days

📍 Analyzed Area: 2.5 acres
⏱️ Analysis Time: 3.2 seconds`;

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: analysis,
        type: 'text',
        timestamp: new Date().toISOString()
      }]);

      if (isSpeaking) {
        speakText('Video analysis complete. Good crop health detected with minor aphid presence.');
      }
    }, 3000);
  };

  // Analyze uploaded image
  const analyzeImage = () => {
    const diseases = ['Leaf Blight', 'Bacterial Spot', 'Healthy', 'Powdery Mildew', 'Rust'];
    const detected = diseases[Math.floor(Math.random() * diseases.length)];
    
    if (detected === 'Healthy') {
      return `📷 Image Analysis: Your crop appears HEALTHY! ✅\n\nNo diseases detected. Continue current care routine.`;
    } else {
      return `📷 Image Analysis: ${detected} detected ⚠️\n\nConfidence: 87%\n\nTreatment:\n• Apply appropriate fungicide\n• Remove affected leaves\n• Improve air circulation\n• Reduce humidity\n\nPrevention:\n• Use resistant varieties\n• Practice crop rotation\n• Maintain field hygiene`;
    }
  };

  // Generate AI response
  const generateResponse = (question: string) => {
    const q = question.toLowerCase();
    
    if (q.includes('fertilizer') || q.includes('npk')) {
      return `For ${q.includes('rice') ? 'rice' : 'general'} cultivation:\n\n🌾 Vegetative Stage:\n• NPK 20:10:10 - 150kg/acre\n• Apply 15 days after planting\n\n🌸 Flowering Stage:\n• NPK 10:20:20 - 100kg/acre\n• Apply at flower initiation\n\n💰 Cost: ₹3,500-4,500/acre\n📈 Expected Yield Increase: 20-25%`;
    }
    
    if (q.includes('irrigate') || q.includes('water')) {
      return `💧 Irrigation Schedule:\n\n🌱 Vegetative: Every 3 days\n🌸 Flowering: Every 2 days\n🌾 Grain Filling: Every 4 days\n\n💡 Tips:\n• Irrigate early morning (6-8 AM)\n• Maintain 2-3 inches standing water for rice\n• Use drip irrigation to save 40% water\n• Check soil moisture before watering`;
    }
    
    if (q.includes('pest') || q.includes('insect')) {
      return `🐛 Organic Pest Control:\n\n✅ Neem Oil Spray:\n• 5ml neem oil per liter water\n• Spray weekly, early morning\n\n✅ Yellow Sticky Traps:\n• Install 8-10 per acre\n• Replace every 2 weeks\n\n✅ Biological Control:\n• Introduce ladybugs for aphids\n• Use Trichogramma for stem borer\n\n🔬 For severe infestation, contact local agriculture officer`;
    }
    
    if (q.includes('price') || q.includes('market')) {
      return `💰 Current Market Prices (Today):\n\n🌾 Rice: ₹2,100/quintal (↑ 8%)\n🌾 Wheat: ₹2,050/quintal (→ stable)\n🌾 Cotton: ₹5,800/quintal (↑ 12%)\n\n📈 Best Time to Sell:\n• Rice: Next 2-3 weeks (price rising)\n• Cotton: Sell now (peak price)\n\n📍 Best Market: District Mandi (15km)\n💡 Register on e-NAM for better prices`;
    }
    
    if (q.includes('scheme') || q.includes('subsidy') || q.includes('pm-kisan')) {
      return `🏛️ Government Benefits:\n\n✅ PM-KISAN: ₹6,000/year\n• Direct bank transfer\n• Apply: pmkisan.gov.in\n\n✅ PMFBY Insurance:\n• 2% premium for Kharif\n• Covers natural disasters\n\n✅ Soil Health Card:\n• Free soil testing\n• Visit nearest KVK\n\n📞 Helpline: 1800-180-1551`;
    }
    
    if (q.includes('yield') || q.includes('production')) {
      return `📊 Yield Increase Strategies:\n\n1️⃣ Precision Agriculture (AI)\n• Use our yield prediction tool\n• 20-30% increase expected\n\n2️⃣ Quality Seeds\n• Use certified hybrid seeds\n• 15% yield boost\n\n3️⃣ Balanced Fertilization\n• Soil testing first\n• Apply based on NPK levels\n\n4️⃣ Pest Management\n• Early detection crucial\n• Use integrated approach\n\n💡 Total potential increase: 50-70%`;
    }
    
    return `I can help you with:\n\n🌾 Crop Management\n💰 Market Prices\n🐛 Pest Control\n💧 Irrigation Planning\n🏛️ Government Schemes\n📊 Yield Predictions\n🎥 Video Crop Analysis\n\nPlease ask a specific question!`;
  };

  // Send text message
  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages(prev => [...prev, { 
        role: 'user', 
        text: inputText,
        type: 'text',
        timestamp: new Date().toISOString()
      }]);

      const response = generateResponse(inputText);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          text: response,
          type: 'text',
          timestamp: new Date().toISOString()
        }]);

        if (isSpeaking) {
          speakText(response);
        }
      }, 1000);

      setInputText('');
    }
  };

  const quickQueries = [
    'Soil testing',
    'Pest control',
    'Market prices',
    'Weather forecast',
    'Irrigation tips',
    'Government schemes',
    'Crop rotation',
    'Yield prediction'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Video className="w-8 h-8 text-purple-600" />
          {t.title}
        </h2>
        <p className="text-gray-600 mt-2">{t.subtitle}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="voice" className="flex items-center gap-2">
            <Mic className="w-4 h-4" />
            {t.voiceMode}
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            {t.videoMode}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="voice" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-none shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t.conversation}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleSpeech}
                      className={isSpeaking ? 'bg-green-50' : ''}
                    >
                      {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </Button>
                    <Badge variant="outline" className="bg-green-50">
                      <Languages className="w-3 h-3 mr-1" />
                      {language.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96 pr-4">
                  <div className="space-y-4">
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.role === 'user' 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {msg.type === 'image' && msg.mediaUrl && (
                            <img src={msg.mediaUrl} alt="Uploaded" className="rounded-lg mb-2 max-w-full" />
                          )}
                          {msg.type === 'video' && msg.mediaUrl && (
                            <video src={msg.mediaUrl} controls className="rounded-lg mb-2 max-w-full" />
                          )}
                          <p className="text-sm whitespace-pre-line">{msg.text}</p>
                          {msg.type === 'voice' && (
                            <Badge className="mt-2 bg-white/20">
                              <Mic className="w-3 h-3 mr-1" />
                              Voice
                            </Badge>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="mt-6 space-y-4">
                  {/* Voice Button */}
                  <div className="flex justify-center">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleListening}
                      className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all ${
                        isListening 
                          ? 'bg-gradient-to-r from-red-500 to-pink-600' 
                          : 'bg-gradient-to-r from-purple-500 to-indigo-600'
                      }`}
                    >
                      {isListening ? (
                        <MicOff className="w-8 h-8 text-white" />
                      ) : (
                        <Mic className="w-8 h-8 text-white" />
                      )}

                      <AnimatePresence>
                        {isListening && (
                          <>
                            <motion.div
                              initial={{ scale: 1, opacity: 0.5 }}
                              animate={{ scale: 2, opacity: 0 }}
                              exit={{ scale: 1, opacity: 0 }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="absolute inset-0 rounded-full bg-red-500"
                            />
                            <motion.div
                              initial={{ scale: 1, opacity: 0.5 }}
                              animate={{ scale: 2.5, opacity: 0 }}
                              exit={{ scale: 1, opacity: 0 }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                              className="absolute inset-0 rounded-full bg-pink-500"
                            />
                          </>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>

                  <p className="text-center text-sm text-gray-600">
                    {isListening ? t.listening : t.tapToSpeak}
                  </p>

                  {/* Text Input */}
                  <div className="flex gap-2">
                    <Input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={t.typePlaceholder}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} className="bg-gradient-to-r from-green-500 to-emerald-600">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Photo Upload */}
                  <div className="flex gap-2">
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => photoInputRef.current?.click()}
                      className="flex-1"
                    >
                      <ImageIcon className="w-4 h-4 mr-2" />
                      {t.takePhoto}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-sm">{t.quickQueries}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickQueries.map((query, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left"
                      onClick={() => {
                        setInputText(query);
                        handleSendMessage();
                      }}
                    >
                      <MessageSquare className="w-3 h-3 mr-2" />
                      {query}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                <CardHeader>
                  <CardTitle className="text-sm">{t.offlineMode}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm opacity-90">{t.offlineDesc}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="video" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Video Recording/Upload */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>{t.videoAnalysis}</CardTitle>
                <CardDescription>
                  Record or upload crop video for AI-powered health analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Video Preview */}
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  {isRecording ? (
                    <video ref={videoRef} className="w-full h-full object-cover" muted />
                  ) : videoPreview ? (
                    <video src={videoPreview} controls className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-gray-400">
                      <Video className="w-16 h-16 mx-auto mb-2" />
                      <p className="text-sm">No video selected</p>
                    </div>
                  )}
                </div>

                {/* Video Controls */}
                <div className="grid grid-cols-2 gap-3">
                  {!isRecording ? (
                    <>
                      <Button
                        onClick={startVideoRecording}
                        className="bg-gradient-to-r from-red-500 to-pink-600"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        {t.recordVideo}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {t.uploadVideo}
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                    </>
                  ) : (
                    <Button
                      onClick={stopVideoRecording}
                      className="col-span-2 bg-gradient-to-r from-red-500 to-pink-600"
                    >
                      <StopCircle className="w-4 h-4 mr-2" />
                      {t.stopRecording}
                    </Button>
                  )}
                </div>

                {videoPreview && (
                  <Button
                    variant="outline"
                    onClick={() => setVideoPreview(null)}
                    className="w-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear & Record New
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Analysis Results */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {messages.filter(m => m.type === 'video' || (m.role === 'assistant' && messages.some(msg => msg.type === 'video'))).map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50 rounded-lg p-4"
                      >
                        <p className="text-sm whitespace-pre-line">{msg.text}</p>
                      </motion.div>
                    ))}
                    
                    {messages.filter(m => m.type === 'video').length === 0 && (
                      <div className="text-center text-gray-400 py-12">
                        <Video className="w-16 h-16 mx-auto mb-4" />
                        <p className="text-sm">Upload or record a video to see analysis</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
