import React from 'react';
import { motion } from 'motion/react';
import { 
  Play, Video, BookOpen, CheckCircle, Download, 
  Share2, Award, Clock, Eye, Star, Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

const translations = {
  en: {
    title: 'How to Use the Learning Hub',
    subtitle: 'Complete video tutorial guide for farmers',
    gettingStarted: 'Getting Started',
    watchingVideos: 'Watching Videos',
    trackingProgress: 'Tracking Your Progress',
    certificates: 'Earning Certificates',
    tips: 'Pro Tips',
    step1Title: 'Browse & Search Courses',
    step1Desc: 'Use the search bar to find specific topics or browse by category (Irrigation, Pest Management, Soil, etc.)',
    step2Title: 'Select a Video',
    step2Desc: 'Click on any video card to see details. Check the duration, level, and description before starting.',
    step3Title: 'Watch & Learn',
    step3Desc: 'The video player supports fullscreen, pause/play, and volume controls. Videos are available in your preferred language.',
    step4Title: 'Review Key Points',
    step4Desc: 'After watching, review the key learning points and download additional resources.',
    step5Title: 'Mark as Complete',
    step5Desc: 'Click the "Mark as Complete" button to track your progress and unlock your certificate.',
    progressTitle: 'Your Learning Journey',
    progressDesc: 'Track completed courses, total hours learned, and overall progress percentage.',
    certTitle: 'Get Certified',
    certDesc: 'Complete all courses in a category to earn a downloadable certificate you can share.',
    tip1: 'Watch videos at your own pace - you can pause and rewatch anytime',
    tip2: 'Download resources for offline reference',
    tip3: 'Share videos with other farmers in your community',
    tip4: 'Videos work offline once downloaded',
    tip5: 'Use voice assistant for hands-free learning',
    features: 'Key Features',
    feature1: 'Multi-language Support',
    feature1Desc: 'Videos available in English, Hindi, Telugu, Tamil, Marathi, and Kannada',
    feature2: 'Expert Instructors',
    feature2Desc: 'Learn from agricultural experts and experienced farmers',
    feature3: 'Practical Knowledge',
    feature3Desc: 'Real-world farming techniques you can apply immediately',
    feature4: 'Free Resources',
    feature4Desc: 'Download guides, checklists, and reference materials',
    whatYouLearn: 'What You Will Learn',
    categories: 'Course Categories'
  },
  hi: {
    title: 'लर्निंग हब का उपयोग कैसे करें',
    subtitle: 'किसानों के लिए संपूर्ण वीडियो ट्यूटोरियल गाइड',
    gettingStarted: 'शुरुआत करना',
    watchingVideos: 'वीडियो देखना',
    trackingProgress: 'अपनी प्रगति ट्रैक करना',
    certificates: 'प्रमाणपत्र अर्जित करना',
    tips: 'प्रो टिप्स',
    step1Title: 'पाठ्यक्रम ब्राउज़ करें और खोजें',
    step1Desc: 'विशिष्ट विषयों को खोजने के लिए खोज बार का उपयोग करें या श्रेणी (सिंचाई, कीट प्रबंधन, मिट्टी, आदि) द्वारा ब्राउज़ करें',
    step2Title: 'एक वीडियो चुनें',
    step2Desc: 'विवरण देखने के लिए किसी भी वीडियो कार्ड पर क्लिक करें। शुरू करने से पहले अवधि, स्तर और विवरण की जांच करें।',
    step3Title: 'देखें और सीखें',
    step3Desc: 'वीडियो प्लेयर फुलस्क्रीन, पॉज़/प्ले और वॉल्यूम नियंत्रण का समर्थन करता है। वीडियो आपकी पसंदीदा भाषा में उपलब्ध हैं।',
    step4Title: 'मुख्य बिंदुओं की समीक्षा करें',
    step4Desc: 'देखने के बाद, मुख्य सीखने के बिंदुओं की समीक्षा करें और अतिरिक्त संसाधन डाउनलोड करें।',
    step5Title: 'पूर्ण के रूप में चिह्नित करें',
    step5Desc: 'अपनी प्रगति को ट्रैक करने और अपना प्रमाणपत्र अनलॉक करने के लिए "पूर्ण के रूप में चिह्नित करें" बटन पर क्लिक करें।',
    progressTitle: 'आपकी सीखने की यात्रा',
    progressDesc: 'पूर्ण पाठ्यक्रम, कुल घंटे सीखे और समग्र प्रगति प्रतिशत को ट्रैक करें।',
    certTitle: 'प्रमाणित हो जाओ',
    certDesc: 'डाउनलोड करने योग्य प्रमाणपत्र अर्जित करने के लिए एक श्रेणी में सभी पाठ्यक्रम पूरे करें जिसे आप साझा कर सकते हैं।',
    tip1: 'अपनी गति से वीडियो देखें - आप कभी भी रोक सकते हैं और दोबारा देख सकते हैं',
    tip2: 'ऑफ़लाइन संदर्भ के लिए संसाधन डाउनलोड करें',
    tip3: 'अपने समुदाय के अन्य किसानों के साथ वीडियो साझा करें',
    tip4: 'एक बार डाउनलोड होने के बाद वीडियो ऑफ़लाइन काम करते हैं',
    tip5: 'हैंड्स-फ्री सीखने के लिए वॉयस असिस्टेंट का उपयोग करें',
    features: 'मुख्य विशेषताएं',
    feature1: 'बहु-भाषा समर्थन',
    feature1Desc: 'अंग्रेजी, हिंदी, तेलुगु, तमिल, मराठी और कन्नड़ में वीडियो उपलब्ध',
    feature2: 'विशेषज्ञ प्रशिक्षक',
    feature2Desc: 'कृषि विशेषज्ञों और अनुभवी किसानों से सीखें',
    feature3: 'व्यावहारिक ज्ञान',
    feature3Desc: 'वास्तविक दुनिया की खेती तकनीकें जिन्हें आप तुरंत लागू कर सकते हैं',
    feature4: 'मुफ्त संसाधन',
    feature4Desc: 'गाइड, चेकलिस्ट और संदर्भ सामग्री डाउनलोड करें',
    whatYouLearn: 'आप क्या सीखेंगे',
    categories: 'पाठ्यक्रम श्रेणियां'
  },
  te: {
    title: 'లర్నింగ్ హబ్‌ను ఎలా ఉపయోగించాలి',
    subtitle: 'రైతుల కోసం పూర్తి వీడియో ట్యుటోరియల్ గైడ్',
    gettingStarted: 'ప్రారంభించడం',
    watchingVideos: 'వీడియోలు చూడటం',
    trackingProgress: 'మీ పురోగతిని ట్రాక్ చేయడం',
    certificates: 'సర్టిఫికేట్లు సంపాదించడం',
    tips: 'ప్రో చిట్కాలు',
    step1Title: 'కోర్సులను బ్రౌజ్ చేయండి & శోధించండి',
    step1Desc: 'నిర్దిష్ట అంశాలను కనుగొనడానికి శోధన బార్‌ను ఉపయోగించండి లేదా వర్గం ద్వారా బ్రౌజ్ చేయండి',
    step2Title: 'వీడియోను ఎంచుకోండి',
    step2Desc: 'వివరాలను చూడటానికి ఏదైనా వీడియో కార్డ్‌పై క్లిక్ చేయండి. ప్రారంభించే ముందు వ్యవధి, స్థాయి మరియు వివరణను తనిఖీ చేయండి.',
    step3Title: 'చూడండి & నేర్చుకోండి',
    step3Desc: 'వీడియో ప్లేయర్ పూర్తి స్క్రీన్, పాజ్/ప్లే మరియు వాల్యూమ్ నియంత్రణలకు మద్దతు ఇస్తుంది. మీ ఇష్టమైన భాషలో వీడియోలు అందుబాటులో ఉన్నాయి.',
    step4Title: 'ముఖ్య అంశాలను సమీక్షించండి',
    step4Desc: 'చూసిన తర్వాత, ముఖ్య అభ్యాస అంశాలను సమీక్షించండి మరియు అదనపు వనరులను డౌన్‌లోడ్ చేసుకోండి.',
    step5Title: 'పూర్తయినదిగా గుర్తించండి',
    step5Desc: 'మీ పురోగతిని ట్రాక్ చేయడానికి మరియు మీ సర్టిఫికేట్‌ను అన్‌లాక్ చేయడానికి "పూర్తయినదిగా గుర్తించు" బటన్‌ను క్లిక్ చేయండి.',
    progressTitle: 'మీ అభ్యాస ప్రయాణం',
    progressDesc: 'పూర్తి చేసిన కోర్సులు, మొత్తం గంటలు నేర్చుకున్నారు మరియు మొత్తం పురోగతి శాతాన్ని ట్రాక్ చేయండి.',
    certTitle: 'ప్రమాణీకరించబడండి',
    certDesc: 'మీరు షేర్ చేయగల డౌన్‌లోడ్ చేయదగిన సర్టిఫికేట్‌ను సంపాదించడానికి వర్గంలోని అన్ని కోర్సులను పూర్తి చేయండి.',
    tip1: 'మీ స్వంత వేగంతో వీడియోలు చూడండి - మీరు ఎప్పుడైనా పాజ్ చేయవచ్చు మరియు మళ్లీ చూడవచ్చు',
    tip2: 'ఆఫ్‌లైన్ సూచన కోసం వనరులను డౌన్‌లోడ్ చేసుకోండి',
    tip3: 'మీ సమాజంలోని ఇతర రైతులతో వీడియోలను షేర్ చేయండి',
    tip4: 'ఒకసారి డౌన్‌లోడ్ చేసిన తర్వాత వీడియోలు ఆఫ్‌లైన్‌లో పనిచేస్తాయి',
    tip5: 'హ్యాండ్స్-ఫ్రీ లెర్నింగ్ కోసం వాయిస్ అసిస్టెంట్‌ను ఉపయోగించండి',
    features: 'ముఖ్య లక్షణాలు',
    feature1: 'బహుభాషా మద్దతు',
    feature1Desc: 'ఆంగ్లం, హిందీ, తెలుగు, తమిళం, మరాఠీ మరియు కన్నడలో వీడియోలు అందుబాటులో ఉన్నాయి',
    feature2: 'నిపుణుల బోధకులు',
    feature2Desc: 'వ్యవసాయ నిపుణులు మరియు అనుభవజ్ఞులైన రైతుల నుండి నేర్చుకోండి',
    feature3: 'ఆచరణాత్మక జ్ఞానం',
    feature3Desc: 'మీరు వెంటనే అన్వయించగల వాస్తవ-ప్రపంచ వ్యవసాయ పద్ధతులు',
    feature4: 'ఉచిత వనరులు',
    feature4Desc: 'గైడ్‌లు, చెక్‌లిస్ట్‌లు మరియు సూచన పత్రాలను డౌన్‌లోడ్ చేసుకోండి',
    whatYouLearn: 'మీరు ఏమి నేర్చుకుంటారు',
    categories: 'కోర్సు వర్గాలు'
  },
  ta: {
    title: 'கற்றல் மையத்தை எவ்வாறு பயன்படுத்துவது',
    subtitle: 'விவசாயிகளுக்கான முழுமையான வீடியோ பயிற்சி வழிகாட்டி',
    gettingStarted: 'தொடங்குதல்',
    watchingVideos: 'வீடியோக்களைப் பார்ப்பது',
    trackingProgress: 'உங்கள் முன்னேற்றத்தைக் கண்காணித்தல்',
    certificates: 'சான்றிதழ்களைப் பெறுதல்',
    tips: 'சிறந்த குறிப்புகள்',
    step1Title: 'பாடங்களை உலாவவும் & தேடவும்',
    step1Desc: 'குறிப்பிட்ட தலைப்புகளைக் கண்டறிய தேடல் பட்டியைப் பயன்படுத்தவும் அல்லது வகை மூலம் உலாவவும்',
    step2Title: 'ஒரு வீடியோவைத் தேர்ந்தெடுக்கவும்',
    step2Desc: 'விவரங்களைக் காண எந்த வீடியோ அட்டையிலும் கிளிக் செய்யவும். தொடங்கும் முன் காலம், நிலை மற்றும் விளக்கத்தை சரிபார்க்கவும்.',
    step3Title: 'பார்க்கவும் & கற்றுக்கொள்ளவும்',
    step3Desc: 'வீடியோ பிளேயர் முழுத்திரை, இடைநிறுத்தம்/இயக்கம் மற்றும் ஒலியளவு கட்டுப்பாடுகளை ஆதரிக்கிறது. உங்கள் விருப்ப மொழியில் வீடியோக்கள் கிடைக்கின்றன.',
    step4Title: 'முக்கிய புள்ளிகளை மதிப்பாய்வு செய்யவும்',
    step4Desc: 'பார்த்த பிறகு, முக்கிய கற்றல் புள்ளிகளை மதிப்பாய்வு செய்து கூடுதல் வளங்களைப் பதிவிறக்கவும்.',
    step5Title: 'முடிந்ததாகக் குறிக்கவும்',
    step5Desc: 'உங்கள் முன்னேற்றத்தைக் கண்காணிக்கவும் உங்கள் சான்றிதழைத் திறக்கவும் "முடிந்ததாகக் குறிக்கவும்" பொத்தானைக் கிளிக் செய்யவும்.',
    progressTitle: 'உங்கள் கற்றல் பயணம்',
    progressDesc: 'முடிக்கப்பட்ட பாடங்கள், மொத்த மணிநேரங்கள் கற்றுக்கொண்டது மற்றும் ஒட்டுமொத்த முன்னேற்ற சதவீதத்தைக் கண்காணிக்கவும்.',
    certTitle: 'சான்றிதழ் பெறுங்கள்',
    certDesc: 'நீங்கள் பகிரக்கூடிய பதிவிறக்கக்கூடிய சான்றிதழைப் பெற ஒரு வகையில் அனைத்து பாடங்களையும் முடிக்கவும்.',
    tip1: 'உங்கள் சொந்த வேகத்தில் வீடியோக்களைப் பாருங்கள் - நீங்கள் எப்போது வேண்டுமானாலும் இடைநிறுத்தலாம் மற்றும் மீண்டும் பார்க்கலாம்',
    tip2: 'ஆஃப்லைன் குறிப்புக்கு வளங்களைப் பதிவிறக்கவும்',
    tip3: 'உங்கள் சமூகத்தில் உள்ள மற்ற விவசாயிகளுடன் வீடியோக்களைப் பகிரவும்',
    tip4: 'ஒருமுறை பதிவிறக்கப்பட்டால் வீடியோக்கள் ஆஃப்லைனில் வேலை செய்யும்',
    tip5: 'கைகள் இல்லாத கற்றலுக்கு குரல் உதவியாளரைப் பயன்படுத்தவும்',
    features: 'முக்கிய அம்சங்கள்',
    feature1: 'பல மொழி ஆதரவு',
    feature1Desc: 'ஆங்கிலம், இந்தி, தெலுங்கு, தமிழ், மராத்தி மற்றும் கன்னடத்தில் வீடியோக்கள் கிடைக்கின்றன',
    feature2: 'நிபுணர் பயிற்றுவிப்பாளர்கள்',
    feature2Desc: 'விவசாய நிபுணர்கள் மற்றும் அனுபவமிக்க விவசாயிகளிடமிருந்து கற்றுக்கொள்ளுங்கள்',
    feature3: 'நடைமுறை அறிவு',
    feature3Desc: 'நீங்கள் உடனடியாக பயன்படுத்தக்கூடிய நிஜ-உலக விவசாய நுட்பங்கள்',
    feature4: 'இலவச வளங்கள்',
    feature4Desc: 'வழிகாட்டிகள், சரிபார்ப்பு பட்டியல்கள் மற்றும் குறிப்பு பொருட்களைப் பதிவிறக்கவும்',
    whatYouLearn: 'நீங்கள் என்ன கற்றுக்கொள்வீர்கள்',
    categories: 'பாட வகைகள்'
  },
  mr: {
    title: 'लर्निंग हब कसे वापरावे',
    subtitle: 'शेतकऱ्यांसाठी संपूर्ण व्हिडिओ ट्यूटोरियल मार्गदर्शक',
    gettingStarted: 'सुरुवात करणे',
    watchingVideos: 'व्हिडिओ पाहणे',
    trackingProgress: 'तुमची प्रगती ट्रॅक करणे',
    certificates: 'प्रमाणपत्रे मिळवणे',
    tips: 'प्रो टिप्स',
    step1Title: 'अभ्यासक्रम ब्राउझ करा आणि शोधा',
    step1Desc: 'विशिष्ट विषय शोधण्यासाठी शोध बार वापरा किंवा श्रेणीनुसार ब्राउझ करा',
    step2Title: 'व्हिडिओ निवडा',
    step2Desc: 'तपशील पाहण्यासाठी कोणत्याही व्हिडिओ कार्डवर क्लिक करा. सुरू करण्यापूर्वी कालावधी, स्तर आणि वर्णन तपासा.',
    step3Title: 'पहा आणि शिका',
    step3Desc: 'व्हिडिओ प्लेयर फुलस्क्रीन, पॉज/प्ले आणि व्हॉल्यूम नियंत्रणे समर्थित करतो. तुमच्या पसंतीच्या भाषेत व्हिडिओ उपलब्ध आहेत.',
    step4Title: 'मुख्य मुद्द्यांचे पुनरावलोकन करा',
    step4Desc: 'पाहिल्यानंतर, मुख्य शिकण्याचे मुद्दे पुन्हा पहा आणि अतिरिक्त संसाधने डाउनलोड करा.',
    step5Title: 'पूर्ण म्हणून चिन्हांकित करा',
    step5Desc: 'तुमची प्रगती ट्रॅक करण्यासाठी आणि तुमचे प्रमाणपत्र अनलॉक करण्यासाठी "पूर्ण म्हणून चिन्हांकित करा" बटण क्लिक करा.',
    progressTitle: 'तुमचा शिकण्याचा प्रवास',
    progressDesc: 'पूर्ण झालेले अभ्यासक्रम, एकूण तास शिकलो आणि एकूण प्रगती टक्केवारी ट्रॅक करा.',
    certTitle: 'प्रमाणित व्हा',
    certDesc: 'डाउनलोड करण्यायोग्य प्रमाणपत्र मिळवण्यासाठी श्रेणीतील सर्व अभ्यासक्रम पूर्ण करा जे तुम्ही शेअर करू शकता.',
    tip1: 'तुमच्या स्वतःच्या गतीने व्हिडिओ पहा - तुम्ही कधीही थांबवू शकता आणि पुन्हा पाहू शकता',
    tip2: 'ऑफलाइन संदर्भासाठी संसाधने डाउनलोड करा',
    tip3: 'तुमच्या समुदायातील इतर शेतकऱ्यांसोबत व्हिडिओ शेअर करा',
    tip4: 'एकदा डाउनलोड केल्यावर व्हिडिओ ऑफलाइन काम करतात',
    tip5: 'हँड्स-फ्री शिकण्यासाठी व्हॉइस असिस्टंट वापरा',
    features: 'मुख्य वैशिष्ट्ये',
    feature1: 'बहु-भाषा समर्थन',
    feature1Desc: 'इंग्रजी, हिंदी, तेलुगू, तमिळ, मराठी आणि कन्नड मध्ये व्हिडिओ उपलब्ध',
    feature2: 'तज्ञ प्रशिक्षक',
    feature2Desc: 'कृषी तज्ञ आणि अनुभवी शेतकऱ्यांकडून शिका',
    feature3: 'व्यावहारिक ज्ञान',
    feature3Desc: 'वास्तविक-जगातील शेती तंत्रे जी तुम्ही लगेच लागू करू शकता',
    feature4: 'मोफत संसाधने',
    feature4Desc: 'मार्गदर्शक, चेकलिस्ट आणि संदर्भ साहित्य डाउनलोड करा',
    whatYouLearn: 'तुम्ही काय शिकाल',
    categories: 'अभ्यासक्रम श्रेणी'
  },
  kn: {
    title: 'ಕಲಿಕಾ ಕೇಂದ್ರವನ್ನು ಹೇಗೆ ಬಳಸುವುದು',
    subtitle: 'ರೈತರಿಗೆ ಸಂಪೂರ್ಣ ವೀಡಿಯೊ ಟ್ಯುಟೋರಿಯಲ್ ಮಾರ್ಗದರ್ಶಿ',
    gettingStarted: 'ಪ್ರಾರಂಭಿಸುವುದು',
    watchingVideos: 'ವೀಡಿಯೊಗಳನ್ನು ವೀಕ್ಷಿಸುವುದು',
    trackingProgress: 'ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುವುದು',
    certificates: 'ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಗಳಿಸುವುದು',
    tips: 'ಪ್ರೊ ಸಲಹೆಗಳು',
    step1Title: 'ಕೋರ್ಸ್‌ಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ & ಹುಡುಕಿ',
    step1Desc: 'ನಿರ್ದಿಷ್ಟ ವಿಷಯಗಳನ್ನು ಹುಡುಕಲು ಹುಡುಕಾಟ ಪಟ್ಟಿಯನ್ನು ಬಳಸಿ ಅಥವಾ ವರ್ಗದ ಮೂಲಕ ಬ್ರೌಸ್ ಮಾಡಿ',
    step2Title: 'ವೀಡಿಯೊವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    step2Desc: 'ವಿವರಗಳನ್ನು ನೋಡಲು ಯಾವುದೇ ವೀಡಿಯೊ ಕಾರ್ಡ್‌ನಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ. ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು ಅವಧಿ, ಮಟ್ಟ ಮತ್ತು ವಿವರಣೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.',
    step3Title: 'ವೀಕ್ಷಿಸಿ & ಕಲಿಯಿರಿ',
    step3Desc: 'ವೀಡಿಯೊ ಪ್ಲೇಯರ್ ಪೂರ್ಣಪರದೆ, ವಿರಾಮ/ಪ್ಲೇ ಮತ್ತು ವಾಲ್ಯೂಮ್ ನಿಯಂತ್ರಣಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ. ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯಲ್ಲಿ ವೀಡಿಯೊಗಳು ಲಭ್ಯವಿದೆ.',
    step4Title: 'ಪ್ರಮುಖ ಅಂಶಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
    step4Desc: 'ವೀಕ್ಷಿಸಿದ ನಂತರ, ಪ್ರಮುಖ ಕಲಿಕಾ ಅಂಶಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಹೆಚ್ಚುವರಿ ಸಂಪನ್ಮೂಲಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.',
    step5Title: 'ಪೂರ್ಣಗೊಂಡಿದೆ ಎಂದು ಗುರುತಿಸಿ',
    step5Desc: 'ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಮತ್ತು ನಿಮ್ಮ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಅನ್‌ಲಾಕ್ ಮಾಡಲು "ಪೂರ್ಣಗೊಂಡಿದೆ ಎಂದು ಗುರುತಿಸಿ" ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.',
    progressTitle: 'ನಿಮ್ಮ ಕಲಿಕಾ ಪ್ರಯಾಣ',
    progressDesc: 'ಪೂರ್ಣಗೊಂಡ ಕೋರ್ಸ್‌ಗಳು, ಒಟ್ಟು ಗಂಟೆಗಳು ಕಲಿತರು ಮತ್ತು ಒಟ್ಟಾರೆ ಪ್ರಗತಿ ಶೇಕಡಾವಾರು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
    certTitle: 'ಪ್ರಮಾಣೀಕರಣ ಪಡೆಯಿರಿ',
    certDesc: 'ನೀವು ಹಂಚಿಕೊಳ್ಳಬಹುದಾದ ಡೌನ್‌ಲೋಡ್ ಮಾಡಬಹುದಾದ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಗಳಿಸಲು ವರ್ಗದಲ್ಲಿನ ಎಲ್ಲಾ ಕೋರ್ಸ್‌ಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.',
    tip1: 'ನಿಮ್ಮ ಸ್ವಂತ ವೇಗದಲ್ಲಿ ವೀಡಿಯೊಗಳನ್ನು ವೀಕ್ಷಿಸಿ - ನೀವು ಯಾವಾಗ ಬೇಕಾದರೂ ವಿರಾಮಗೊಳಿಸಬಹುದು ಮತ್ತು ಮರುವೀಕ್ಷಿಸಬಹುದು',
    tip2: 'ಆಫ್‌ಲೈನ್ ಉಲ್ಲೇಖಕ್ಕಾಗಿ ಸಂಪನ್ಮೂಲಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    tip3: 'ನಿಮ್ಮ ಸಮುದಾಯದಲ್ಲಿರುವ ಇತರ ರೈತರೊಂದಿಗೆ ವೀಡಿಯೊಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ',
    tip4: 'ಒಮ್ಮೆ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿದ ನಂತರ ವೀಡಿಯೊಗಳು ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ',
    tip5: 'ಹ್ಯಾಂಡ್ಸ್-ಫ್ರೀ ಕಲಿಕೆಗಾಗಿ ಧ್ವನಿ ಸಹಾಯಕವನ್ನು ಬಳಸಿ',
    features: 'ಪ್ರಮುಖ ವೈಶಿಷ್ಟ್ಯಗಳು',
    feature1: 'ಬಹು-ಭಾಷಾ ಬೆಂಬಲ',
    feature1Desc: 'ಆಂಗ್ಲ, ಹಿಂದಿ, ತೆಲುಗು, ತಮಿಳು, ಮರಾಠಿ ಮತ್ತು ಕನ್ನಡದಲ್ಲಿ ವೀಡಿಯೊಗಳು ಲಭ್ಯವಿದೆ',
    feature2: 'ತಜ್ಞ ಬೋಧಕರು',
    feature2Desc: 'ಕೃಷಿ ತಜ್ಞರು ಮತ್ತು ಅನುಭವಿ ರೈತರಿಂದ ಕಲಿಯಿರಿ',
    feature3: 'ಪ್ರಾಯೋಗಿಕ ಜ್ಞಾನ',
    feature3Desc: 'ನೀವು ತಕ್ಷಣ ಅನ್ವಯಿಸಬಹುದಾದ ನಿಜ-ಪ್ರಪಂಚದ ಕೃಷಿ ತಂತ್ರಗಳು',
    feature4: 'ಉಚಿತ ಸಂಪನ್ಮೂಲಗಳು',
    feature4Desc: 'ಮಾರ್ಗದರ್ಶಿಗಳು, ಪರಿಶೀಲನಾಪಟ್ಟಿಗಳು ಮತ್ತು ಉಲ್ಲೇಖ ವಸ್ತುಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    whatYouLearn: 'ನೀವು ಏನು ಕಲಿಯುತ್ತೀರಿ',
    categories: 'ಕೋರ್ಸ್ ವರ್ಗಗಳು'
  }
};

interface VideoTutorialGuideProps {
  language: string;
}

export default function VideoTutorialGuide({ language }: VideoTutorialGuideProps) {
  const t = translations[language as keyof typeof translations] || translations.en;

  const steps = [
    { icon: <BookOpen className="w-6 h-6" />, title: t.step1Title, desc: t.step1Desc },
    { icon: <Play className="w-6 h-6" />, title: t.step2Title, desc: t.step2Desc },
    { icon: <Video className="w-6 h-6" />, title: t.step3Title, desc: t.step3Desc },
    { icon: <Star className="w-6 h-6" />, title: t.step4Title, desc: t.step4Desc },
    { icon: <CheckCircle className="w-6 h-6" />, title: t.step5Title, desc: t.step5Desc }
  ];

  const features = [
    { icon: <Users className="w-8 h-8" />, title: t.feature1, desc: t.feature1Desc, color: 'from-blue-500 to-cyan-500' },
    { icon: <Award className="w-8 h-8" />, title: t.feature2, desc: t.feature2Desc, color: 'from-purple-500 to-pink-500' },
    { icon: <CheckCircle className="w-8 h-8" />, title: t.feature3, desc: t.feature3Desc, color: 'from-green-500 to-emerald-500' },
    { icon: <Download className="w-8 h-8" />, title: t.feature4, desc: t.feature4Desc, color: 'from-orange-500 to-red-500' }
  ];

  const tips = [t.tip1, t.tip2, t.tip3, t.tip4, t.tip5];

  return (
    <div className="space-y-8 p-6 bg-gray-50 rounded-xl">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block"
        >
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full p-4 mb-4 inline-block">
            <BookOpen className="w-12 h-12" />
          </div>
        </motion.div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-lg text-gray-600">{t.subtitle}</p>
      </div>

      {/* Getting Started */}
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
          <CardTitle className="text-2xl">{t.gettingStarted}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full flex items-center justify-center">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t.features}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow h-full">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} text-white rounded-xl flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <Card className="border-none shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            {t.tips}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {tips.map((tip, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{tip}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Progress Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-6 h-6" />
              {t.progressTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700">{t.progressDesc}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg">
          <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6" />
              {t.certTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700">{t.certDesc}</p>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl p-8 text-center"
      >
        <Play className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">
          {language === 'hi' ? 'अभी सीखना शुरू करें!' : 
           language === 'te' ? 'ఇప్పుడు నేర్చుకోవడం ప్రారంభించండి!' : 
           language === 'ta' ? 'இப்போது கற்றலைத் தொடங்குங்கள்!' : 
           language === 'mr' ? 'आता शिकणे सुरू करा!' : 
           language === 'kn' ? 'ಈಗ ಕಲಿಯಲು ಪ್ರಾರಂಭಿಸಿ!' : 
           'Start Learning Now!'}
        </h3>
        <p className="text-white/90 mb-6">
          {language === 'hi' ? 'हजारों किसान पहले से ही लाभान्वित हो रहे हैं' : 
           language === 'te' ? 'వేలాది మంది రైతులు ఇప్పటికే లాభం పొందుతున్నారు' : 
           language === 'ta' ? 'ஏற்கனவே ஆயிரக்கணக்கான விவசாயிகள் பயனடைந்து வருகின்றனர்' : 
           language === 'mr' ? 'हजारो शेतकरी आधीच लाभ घेत आहेत' : 
           language === 'kn' ? 'ಸಾವಿರಾರು ರೈತರು ಈಗಾಗಲೇ ಪ್ರಯೋಜನ ಪಡೆಯುತ್ತಿದ್ದಾರೆ' : 
           'Thousands of farmers are already benefiting'}
        </p>
      </motion.div>
    </div>
  );
}
