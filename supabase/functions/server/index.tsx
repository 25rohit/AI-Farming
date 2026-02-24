// @ts-nocheck
import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-8bff1720/health", (c) => {
  return c.json({ status: "ok" });
});

// ============ AI/ML Prediction Endpoints ============

// 1️⃣ AI-Based Yield Prediction System (LSTM + Random Forest)
app.post("/make-server-8bff1720/predict-yield", async (c) => {
  try {
    const { cropType, landSize, soilType, location, weatherData, historicalYield } = await c.req.json();
    
    // Simulated LSTM + Random Forest prediction
    const baseYield = {
      'rice': 2500,
      'wheat': 3000,
      'cotton': 1800,
      'sugarcane': 7000,
      'maize': 2200,
      'pulses': 1000,
      'vegetables': 3500,
      'soybean': 1200,
      'groundnut': 1500
    }[cropType.toLowerCase()] || 2000;
    
    const soilMultiplier = {
      'alluvial': 1.2,
      'black': 1.15,
      'red': 0.95,
      'laterite': 0.85,
      'sandy': 0.75,
      'loamy': 1.1,
      'clay': 1.0
    }[soilType.toLowerCase()] || 1.0;
    
    // AI-based weather and historical score calculation
    const historicalScore = historicalYield ? (historicalYield / baseYield) : 1.0;
    const seasonalFactor = 0.95 + Math.random() * 0.15; // Simulates seasonal variations
    
    const predictedYield = baseYield * soilMultiplier * historicalScore * seasonalFactor;
    const marketPrice = Math.floor(1500 + Math.random() * 1000);
    const profitEstimation = predictedYield * landSize * marketPrice;
    const riskPercentage = Math.floor(15 + Math.random() * 20);
    
    const result = {
      expectedYieldPerAcre: Math.floor(predictedYield),
      totalYield: Math.floor(predictedYield * landSize),
      profitEstimation: Math.floor(profitEstimation),
      riskPercentage,
      confidence: Math.floor(75 + Math.random() * 20),
      recommendations: [
        `Based on ${soilType} soil, consider adding organic matter`,
        `Expected rainfall is ${weatherData?.rainfall || 800}mm - plan irrigation accordingly`,
        `Market price trending at ₹${marketPrice}/quintal`
      ]
    };
    
    // Store prediction
    await kv.set(`yield_prediction:${Date.now()}`, JSON.stringify(result));
    
    return c.json(result);
  } catch (error) {
    console.error("Error in yield prediction:", error);
    return c.json({ error: "Yield prediction failed" }, 500);
  }
});

// 2️⃣ Satellite Crop Health Monitoring (NDVI Analysis)
app.post("/make-server-8bff1720/satellite-analysis", async (c) => {
  try {
    const { latitude, longitude, cropType, fieldArea } = await c.req.json();
    
    // Simulated NDVI analysis from ISRO/NASA satellite data
    const ndviValue = 0.5 + Math.random() * 0.4; // 0.5-0.9 range
    const healthStatus = ndviValue > 0.75 ? 'Excellent' : ndviValue > 0.6 ? 'Good' : ndviValue > 0.45 ? 'Moderate' : 'Poor';
    
    const dryPatches = Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0;
    const stressAreas = Math.random() > 0.6 ? ['Northeast sector', 'Central area'] : [];
    
    const result = {
      ndvi: parseFloat(ndviValue.toFixed(3)),
      healthStatus,
      cropStress: ndviValue < 0.6,
      dryPatches,
      stressAreas,
      diseaseRisk: ndviValue < 0.55 ? 'High' : 'Low',
      recommendations: [
        ndviValue < 0.6 ? 'Increase irrigation in stressed areas' : 'Maintain current irrigation',
        stressAreas.length > 0 ? `Focus on: ${stressAreas.join(', ')}` : 'Uniform crop health detected',
        'Next satellite scan recommended in 7 days'
      ],
      lastUpdated: new Date().toISOString()
    };
    
    await kv.set(`satellite:${latitude}_${longitude}`, JSON.stringify(result));
    
    return c.json(result);
  } catch (error) {
    console.error("Error in satellite analysis:", error);
    return c.json({ error: "Satellite analysis failed" }, 500);
  }
});

// 3️⃣ Market Price Prediction AI
app.post("/make-server-8bff1720/predict-price", async (c) => {
  try {
    const { cropType, currentLocation } = await c.req.json();
    
    // Simulated Agmarknet data + AI price prediction
    const basePrice = {
      'rice': 2100,
      'wheat': 2000,
      'cotton': 5500,
      'sugarcane': 275,
      'maize': 1700,
      'pulses': 5000
    }[cropType.toLowerCase()] || 2000;
    
    const trend = Math.random() > 0.5 ? 'increasing' : 'decreasing';
    const trendPercent = Math.floor(5 + Math.random() * 15);
    
    const futurePrice = trend === 'increasing' 
      ? basePrice * (1 + trendPercent / 100)
      : basePrice * (1 - trendPercent / 100);
    
    const markets = [
      { name: 'Local Mandi', distance: '5 km', price: basePrice + Math.floor(Math.random() * 200 - 100) },
      { name: 'District Market', distance: '25 km', price: basePrice + Math.floor(Math.random() * 300 - 50) },
      { name: 'Regional Hub', distance: '60 km', price: basePrice + Math.floor(Math.random() * 400) }
    ].sort((a, b) => b.price - a.price);
    
    const result = {
      currentPrice: basePrice,
      predictedPrice: Math.floor(futurePrice),
      trend,
      trendPercent,
      bestTimeToSell: trend === 'increasing' ? '2-3 weeks' : 'Sell now',
      nearbyMarkets: markets,
      confidence: Math.floor(70 + Math.random() * 25)
    };
    
    return c.json(result);
  } catch (error) {
    console.error("Error in price prediction:", error);
    return c.json({ error: "Price prediction failed" }, 500);
  }
});

// 4️⃣ Marketplace - Farmer Listings
app.post("/make-server-8bff1720/marketplace/create-listing", async (c) => {
  try {
    const { farmerId, cropType, quantity, pricePerUnit, location, harvestDate } = await c.req.json();
    
    const listingId = `listing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const listing = {
      id: listingId,
      farmerId,
      cropType,
      quantity,
      pricePerUnit,
      location,
      harvestDate,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`marketplace:${listingId}`, JSON.stringify(listing));
    
    return c.json({ success: true, listingId, listing });
  } catch (error) {
    console.error("Error creating marketplace listing:", error);
    return c.json({ error: "Failed to create listing" }, 500);
  }
});

app.get("/make-server-8bff1720/marketplace/listings", async (c) => {
  try {
    const listings = await kv.getByPrefix("marketplace:");
    return c.json({ listings: listings.map(item => JSON.parse(item)) });
  } catch (error) {
    console.error("Error fetching marketplace listings:", error);
    return c.json({ error: "Failed to fetch listings" }, 500);
  }
});

// 6️⃣ Climate Risk Alert System
app.post("/make-server-8bff1720/climate-risk", async (c) => {
  try {
    const { location, cropType, season } = await c.req.json();
    
    // Simulated climate risk prediction using ML classification
    const droughtRisk = Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low';
    const floodRisk = Math.random() > 0.8 ? 'High' : Math.random() > 0.5 ? 'Medium' : 'Low';
    const heatwaveRisk = Math.random() > 0.6 ? 'High' : Math.random() > 0.3 ? 'Medium' : 'Low';
    
    const alerts = [];
    if (droughtRisk === 'High') alerts.push({ type: 'drought', severity: 'high', message: 'Severe drought expected in next 2 weeks' });
    if (floodRisk === 'High') alerts.push({ type: 'flood', severity: 'high', message: 'Heavy rainfall warning - prepare drainage' });
    if (heatwaveRisk === 'High') alerts.push({ type: 'heatwave', severity: 'high', message: 'Extreme temperatures expected - increase irrigation' });
    
    const result = {
      droughtRisk,
      floodRisk,
      heatwaveRisk,
      alerts,
      recommendations: [
        droughtRisk === 'High' ? 'Store water, plan drip irrigation' : 'Normal irrigation schedule',
        floodRisk === 'High' ? 'Clear drainage channels, protect crops' : 'Monitor weather daily',
        'Check crop insurance coverage'
      ]
    };
    
    return c.json(result);
  } catch (error) {
    console.error("Error in climate risk analysis:", error);
    return c.json({ error: "Climate risk analysis failed" }, 500);
  }
});

// 7️⃣ Automatic Subsidy Eligibility Checker
app.post("/make-server-8bff1720/check-subsidy", async (c) => {
  try {
    const { landSize, cropType, incomeCategory, farmerType } = await c.req.json();
    
    const eligibleSchemes = [];
    
    // PM-KISAN eligibility
    if (landSize <= 2) {
      eligibleSchemes.push({
        name: 'PM-KISAN',
        benefit: '₹6,000/year in 3 installments',
        eligible: true,
        howToApply: 'Visit pmkisan.gov.in or nearest CSC'
      });
    }
    
    // Crop Insurance
    if (landSize > 0) {
      eligibleSchemes.push({
        name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        benefit: 'Crop insurance at 2% premium for Kharif, 1.5% for Rabi',
        eligible: true,
        howToApply: 'Through bank or agriculture office'
      });
    }
    
    // Soil Health Card
    eligibleSchemes.push({
      name: 'Soil Health Card Scheme',
      benefit: 'Free soil testing and recommendations',
      eligible: true,
      howToApply: 'Agriculture department or Krishi Vigyan Kendra'
    });
    
    // Small farmer subsidies
    if (landSize <= 5) {
      eligibleSchemes.push({
        name: 'National Agriculture Market (e-NAM)',
        benefit: 'Better market access and prices',
        eligible: true,
        howToApply: 'Register at enam.gov.in'
      });
    }
    
    // Organic farming subsidy
    if (farmerType === 'organic') {
      eligibleSchemes.push({
        name: 'Paramparagat Krishi Vikas Yojana (PKVY)',
        benefit: '₹50,000/hectare for 3 years',
        eligible: true,
        howToApply: 'State agriculture department'
      });
    }
    
    const totalBenefit = eligibleSchemes.reduce((sum, scheme) => {
      const match = scheme.benefit.match(/₹([\d,]+)/);
      return sum + (match ? parseInt(match[1].replace(/,/g, '')) : 0);
    }, 0);
    
    return c.json({
      eligible: eligibleSchemes.length > 0,
      eligibleSchemes,
      totalEstimatedBenefit: totalBenefit,
      nextSteps: [
        'Gather required documents (Aadhaar, land records)',
        'Visit nearest CSC or agriculture office',
        'Apply online through respective portals'
      ]
    });
  } catch (error) {
    console.error("Error checking subsidy eligibility:", error);
    return c.json({ error: "Subsidy check failed" }, 500);
  }
});

// 9️⃣ AI Personalized Farming Plan Generator
app.post("/make-server-8bff1720/generate-farming-plan", async (c) => {
  try {
    const { location, soilType, budget, cropHistory, season } = await c.req.json();
    
    const recommendedCrops = [];
    if (soilType === 'alluvial') recommendedCrops.push('Rice', 'Wheat', 'Sugarcane');
    else if (soilType === 'black') recommendedCrops.push('Cotton', 'Soybean', 'Wheat');
    else if (soilType === 'red') recommendedCrops.push('Pulses', 'Groundnut', 'Millets');
    else recommendedCrops.push('Maize', 'Rice', 'Vegetables');
    
    const weeklyTasks = [
      { week: 1, task: 'Land preparation and plowing', cost: 2000 },
      { week: 2, task: 'Soil testing and amendment', cost: 1500 },
      { week: 3, task: 'Seed selection and treatment', cost: 3000 },
      { week: 4, task: 'Sowing and initial irrigation', cost: 2500 },
      { week: 6, task: 'First fertilizer application', cost: 4000 },
      { week: 8, task: 'Weed control and pest monitoring', cost: 2000 },
      { week: 12, task: 'Second fertilizer dose', cost: 4000 },
      { week: 16, task: 'Disease management check', cost: 1500 },
      { week: 20, task: 'Pre-harvest preparations', cost: 1000 },
      { week: 24, task: 'Harvesting', cost: 5000 }
    ];
    
    const totalCost = weeklyTasks.reduce((sum, task) => sum + task.cost, 0);
    
    return c.json({
      recommendedCrops,
      selectedCrop: recommendedCrops[0],
      duration: '6 months',
      weeklyTasks,
      totalEstimatedCost: totalCost,
      expectedRevenue: totalCost * 1.8,
      profitMargin: '80%',
      riskFactors: ['Weather dependency', 'Market price fluctuation'],
      mitigationStrategies: ['Crop insurance', 'Drip irrigation', 'Organic methods']
    });
  } catch (error) {
    console.error("Error generating farming plan:", error);
    return c.json({ error: "Failed to generate farming plan" }, 500);
  }
});

// 🛡 1️⃣0️⃣ Crop Insurance Risk Prediction
app.post("/make-server-8bff1720/insurance-risk", async (c) => {
  try {
    const { cropType, location, landSize, soilType, season } = await c.req.json();
    
    const failureRisk = Math.floor(10 + Math.random() * 30);
    const riskCategory = failureRisk > 30 ? 'High' : failureRisk > 20 ? 'Medium' : 'Low';
    
    const insurancePlans = [
      {
        name: 'PMFBY Basic',
        premium: Math.floor(landSize * 500),
        coverage: Math.floor(landSize * 40000),
        recommended: riskCategory === 'Low'
      },
      {
        name: 'PMFBY Comprehensive',
        premium: Math.floor(landSize * 800),
        coverage: Math.floor(landSize * 65000),
        recommended: riskCategory === 'Medium' || riskCategory === 'High'
      }
    ];
    
    return c.json({
      failureProbability: failureRisk,
      riskCategory,
      insurancePlans,
      claimProcess: [
        '1. Report crop loss within 72 hours',
        '2. Submit loss assessment form',
        '3. Insurance company survey',
        '4. Claim settlement in 2-4 weeks'
      ],
      recommendation: riskCategory === 'High' 
        ? 'Highly recommended to get comprehensive insurance'
        : 'Basic insurance should suffice'
    });
  } catch (error) {
    console.error("Error in insurance risk prediction:", error);
    return c.json({ error: "Insurance risk prediction failed" }, 500);
  }
});

// 🧬 1️⃣1️⃣ AI Disease Spread Prediction
app.post("/make-server-8bff1720/disease-alert", async (c) => {
  try {
    const { diseaseType, location, cropType } = await c.req.json();
    
    // Simulate community disease tracking
    const nearbyReports = Math.floor(Math.random() * 10);
    const spreadRisk = nearbyReports > 5 ? 'High' : nearbyReports > 2 ? 'Medium' : 'Low';
    
    const affectedVillages = ['Village A', 'Village B', 'Village C'].slice(0, nearbyReports > 3 ? 3 : nearbyReports);
    
    return c.json({
      diseaseType,
      nearbyReports,
      spreadRisk,
      affectedVillages,
      alert: spreadRisk === 'High' ? 'OUTBREAK WARNING: Take immediate preventive action' : 'Monitor your crops daily',
      preventiveMeasures: [
        'Apply recommended fungicide/pesticide',
        'Remove infected plants immediately',
        'Increase field monitoring frequency',
        'Ensure proper drainage'
      ],
      communityAlertSent: true
    });
  } catch (error) {
    console.error("Error in disease alert:", error);
    return c.json({ error: "Disease alert failed" }, 500);
  }
});

// 1️⃣5️⃣ AI Crop Rotation Recommender
app.post("/make-server-8bff1720/crop-rotation", async (c) => {
  try {
    const { currentCrop, soilType, lastTwoSeasons } = await c.req.json();
    
    const rotationMap = {
      'rice': ['Pulses', 'Wheat', 'Vegetables'],
      'wheat': ['Cotton', 'Sugarcane', 'Pulses'],
      'cotton': ['Wheat', 'Soybean', 'Sorghum'],
      'sugarcane': ['Pulses', 'Wheat', 'Vegetables'],
      'maize': ['Pulses', 'Wheat', 'Oilseeds']
    };
    
    const recommendations = rotationMap[currentCrop.toLowerCase()] || ['Pulses', 'Wheat'];
    
    const profitability = recommendations.map(crop => ({
      crop,
      expectedProfit: Math.floor(20000 + Math.random() * 30000),
      soilBenefit: ['High', 'Medium', 'Medium'][Math.floor(Math.random() * 3)],
      marketDemand: ['High', 'Medium', 'High'][Math.floor(Math.random() * 3)]
    })).sort((a, b) => b.expectedProfit - a.expectedProfit);
    
    return c.json({
      currentCrop,
      recommendedNextCrops: profitability,
      nitrogenDepletion: Math.floor(30 + Math.random() * 40) + '%',
      phosphorusLevel: Math.floor(40 + Math.random() * 30) + '%',
      organicMatter: Math.floor(1 + Math.random() * 3) + '%',
      soilHealthImprovement: 'Growing legumes recommended to restore nitrogen',
      longTermBenefits: [
        'Improved soil fertility',
        'Pest and disease reduction',
        'Better water retention',
        'Increased biodiversity'
      ]
    });
  } catch (error) {
    console.error("Error in crop rotation recommendation:", error);
    return c.json({ error: "Crop rotation recommendation failed" }, 500);
  }
});

// ============ Government Schemes & Farmer Profit Guide Endpoints ============

// Get all government schemes
app.get("/make-server-8bff1720/government-schemes", async (c) => {
  try {
    const schemes = await kv.getByPrefix("govt_scheme:");
    
    // If no schemes in database, return default schemes
    if (schemes.length === 0) {
      const defaultSchemes = [
        {
          id: 'pm-kisan',
          name: 'PM-KISAN',
          amount: '₹6,000/year',
          category: 'income',
          description: 'Direct income support to farmers',
          eligibility: 'All landholding farmers',
          applicationUrl: 'https://pmkisan.gov.in'
        },
        {
          id: 'pmfby',
          name: 'PMFBY',
          amount: '2% premium for Kharif',
          category: 'insurance',
          description: 'Crop insurance scheme',
          eligibility: 'All farmers',
          applicationUrl: 'https://pmfby.gov.in'
        },
        {
          id: 'pmksy',
          name: 'PMKSY',
          amount: 'Up to 90% subsidy',
          category: 'infrastructure',
          description: 'Irrigation subsidy scheme',
          eligibility: 'All farmers with land',
          applicationUrl: 'https://pmksy.gov.in'
        }
      ];
      
      // Store default schemes
      for (const scheme of defaultSchemes) {
        await kv.set(`govt_scheme:${scheme.id}`, JSON.stringify(scheme));
      }
      
      return c.json({ schemes: defaultSchemes });
    }
    
    return c.json({ schemes: schemes.map(s => JSON.parse(s)) });
  } catch (error) {
    console.error("Error fetching government schemes:", error);
    return c.json({ error: "Failed to fetch schemes" }, 500);
  }
});

// Calculate farmer profit path
app.post("/make-server-8bff1720/calculate-profit-path", async (c) => {
  try {
    const { currentIncome, landSize, cropType, language } = await c.req.json();
    
    if (!currentIncome || !landSize) {
      return c.json({ error: "Current income and land size are required" }, 400);
    }
    
    const income = parseFloat(currentIncome);
    const land = parseFloat(landSize);
    const targetIncome = income * 2;
    
    // Calculate potential gains from different strategies
    const strategies = [
      {
        name: 'Precision Agriculture with AI',
        nameHi: 'एआई के साथ सटीक खेती',
        expectedGain: 30000 * land,
        timeframe: '6-12 months',
        difficulty: 'medium',
        category: 'technology'
      },
      {
        name: 'Crop Diversification',
        nameHi: 'फसल विविधीकरण',
        expectedGain: 20000 * land,
        timeframe: '1 season',
        difficulty: 'easy',
        category: 'farming'
      },
      {
        name: 'Direct Market Access (e-NAM)',
        nameHi: 'सीधी बाजार पहुंच',
        expectedGain: 15000 * land,
        timeframe: '1-2 months',
        difficulty: 'easy',
        category: 'marketing'
      },
      {
        name: 'Value Addition & Processing',
        nameHi: 'मूल्य संवर्धन',
        expectedGain: 75000 * land,
        timeframe: '6-18 months',
        difficulty: 'hard',
        category: 'value-add'
      },
      {
        name: 'Organic Farming Premium',
        nameHi: 'जैविक खेती',
        expectedGain: 45000 * land,
        timeframe: '3 years',
        difficulty: 'medium',
        category: 'farming'
      }
    ];
    
    const totalPotentialGain = strategies.reduce((sum, s) => sum + s.expectedGain, 0);
    const projectedIncome = income + totalPotentialGain;
    const achievementPercent = Math.min((projectedIncome / targetIncome) * 100, 150);
    
    const result = {
      currentIncome: income,
      targetIncome,
      projectedIncome,
      potentialGain: totalPotentialGain,
      achievementPercent,
      strategies: strategies.map(s => ({
        ...s,
        name: language === 'hi' ? s.nameHi : s.name
      })),
      timeline: '12-24 months',
      quickWins: strategies.filter(s => s.difficulty === 'easy'),
      mediumTerm: strategies.filter(s => s.difficulty === 'medium'),
      longTerm: strategies.filter(s => s.difficulty === 'hard')
    };
    
    // Store calculation
    await kv.set(`profit_calc:${Date.now()}`, JSON.stringify({
      ...result,
      landSize: land,
      cropType,
      calculatedAt: new Date().toISOString()
    }));
    
    return c.json(result);
  } catch (error) {
    console.error("Error calculating profit path:", error);
    return c.json({ error: "Profit calculation failed" }, 500);
  }
});

// Get farmer income history
app.get("/make-server-8bff1720/farmer-income-history/:farmerId", async (c) => {
  try {
    const farmerId = c.req.param('farmerId');
    const calculations = await kv.getByPrefix(`profit_calc:`);
    
    const history = calculations.map(calc => JSON.parse(calc))
      .sort((a, b) => new Date(b.calculatedAt).getTime() - new Date(a.calculatedAt).getTime())
      .slice(0, 10);
    
    return c.json({ history });
  } catch (error) {
    console.error("Error fetching income history:", error);
    return c.json({ error: "Failed to fetch history" }, 500);
  }
});

// Save farmer awareness completion
app.post("/make-server-8bff1720/farmer-awareness/complete", async (c) => {
  try {
    const { farmerId, topicId, language } = await c.req.json();
    
    const completionId = `awareness:${farmerId}:${topicId}`;
    const completion = {
      farmerId,
      topicId,
      language,
      completedAt: new Date().toISOString()
    };
    
    await kv.set(completionId, JSON.stringify(completion));
    
    return c.json({ success: true, completion });
  } catch (error) {
    console.error("Error saving awareness completion:", error);
    return c.json({ error: "Failed to save completion" }, 500);
  }
});

// Pest Detection from Image
app.post("/make-server-8bff1720/detect-pest", async (c) => {
  try {
    const { imageData, cropType } = await c.req.json();
    
    // Simulated AI image recognition
    const pests = ['Aphids', 'Whitefly', 'Leaf Miner', 'Bollworm', 'Stem Borer'];
    const detectedPest = pests[Math.floor(Math.random() * pests.length)];
    const confidence = Math.floor(75 + Math.random() * 20);
    
    const treatments = {
      'Aphids': ['Neem oil spray', 'Introduce ladybugs', 'Soap water solution'],
      'Whitefly': ['Yellow sticky traps', 'Neem-based pesticide', 'Remove infected leaves'],
      'Leaf Miner': ['Remove affected leaves', 'Neem oil', 'Biological control with parasitic wasps'],
      'Bollworm': ['Bt spray', 'Pheromone traps', 'Early detection and removal'],
      'Stem Borer': ['Pheromone traps', 'Remove and destroy stubble', 'Timely planting']
    };
    
    return c.json({
      detected: true,
      pestName: detectedPest,
      confidence,
      severity: confidence > 85 ? 'High' : 'Medium',
      organicTreatment: treatments[detectedPest],
      chemicalOption: 'Consult local agriculture officer for approved pesticides',
      preventiveMeasures: [
        'Regular field monitoring',
        'Crop rotation',
        'Maintain field hygiene',
        'Use resistant varieties'
      ]
    });
  } catch (error) {
    console.error("Error in pest detection:", error);
    return c.json({ error: "Pest detection failed" }, 500);
  }
});

// Soil Testing Analysis
app.post("/make-server-8bff1720/soil-analysis", async (c) => {
  try {
    const { location, cropType } = await c.req.json();
    
    const result = {
      ph: (6.0 + Math.random() * 2).toFixed(1),
      nitrogen: Math.floor(200 + Math.random() * 100),
      phosphorus: Math.floor(20 + Math.random() * 30),
      potassium: Math.floor(150 + Math.random() * 100),
      organicCarbon: (0.5 + Math.random() * 1.0).toFixed(2),
      soilType: ['Loamy', 'Clay Loam', 'Sandy Loam', 'Clay'][Math.floor(Math.random() * 4)],
      recommendations: [
        'Add organic manure to improve soil structure',
        'Apply balanced NPK fertilizer',
        'Consider lime application if pH is below 6.5',
        'Increase organic matter through green manure'
      ],
      fertilizerPlan: {
        urea: '150 kg/acre',
        dap: '100 kg/acre',
        potash: '50 kg/acre',
        organic: '2 tons farmyard manure/acre'
      }
    };
    
    await kv.set(`soil_test:${location}`, JSON.stringify(result));
    
    return c.json(result);
  } catch (error) {
    console.error("Error in soil analysis:", error);
    return c.json({ error: "Soil analysis failed" }, 500);
  }
});

// Irrigation Recommendations
app.post("/make-server-8bff1720/irrigation-plan", async (c) => {
  try {
    const { cropType, soilType, season, currentWeather } = await c.req.json();
    
    const waterRequirement = {
      'rice': 1500,
      'wheat': 450,
      'cotton': 700,
      'sugarcane': 2500,
      'maize': 500
    }[cropType.toLowerCase()] || 600;
    
    const schedule = [
      { stage: 'Germination', frequency: 'Daily', amount: '20mm', duration: '2 weeks' },
      { stage: 'Vegetative', frequency: 'Every 3 days', amount: '25mm', duration: '4 weeks' },
      { stage: 'Flowering', frequency: 'Every 2 days', amount: '30mm', duration: '3 weeks' },
      { stage: 'Maturity', frequency: 'Every 5 days', amount: '15mm', duration: '3 weeks' }
    ];
    
    return c.json({
      totalWaterRequirement: `${waterRequirement}mm per season`,
      irrigationSchedule: schedule,
      method: 'Drip irrigation recommended for 40% water saving',
      soilMoisture: Math.floor(30 + Math.random() * 40) + '%',
      nextIrrigation: 'In 2 days',
      tips: [
        'Irrigate early morning or evening',
        'Check soil moisture before watering',
        'Avoid over-irrigation to prevent diseases',
        'Use mulching to retain moisture'
      ]
    });
  } catch (error) {
    console.error("Error in irrigation planning:", error);
    return c.json({ error: "Irrigation planning failed" }, 500);
  }
});

// Weather Forecast
app.get("/make-server-8bff1720/weather/:location", async (c) => {
  try {
    const location = c.req.param('location');
    
    const forecast = Array.from({ length: 7 }, (_, i) => ({
      day: new Date(Date.now() + i * 86400000).toLocaleDateString('en-IN', { weekday: 'short' }),
      temp: Math.floor(25 + Math.random() * 10),
      condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
      rainfall: Math.floor(Math.random() * 30),
      humidity: Math.floor(60 + Math.random() * 30),
      windSpeed: Math.floor(5 + Math.random() * 15)
    }));
    
    return c.json({
      location,
      forecast,
      alerts: forecast.some(d => d.rainfall > 20) ? ['Heavy rainfall expected - protect crops'] : []
    });
  } catch (error) {
    console.error("Error fetching weather:", error);
    return c.json({ error: "Weather fetch failed" }, 500);
  }
});

// Save farmer profile
app.post("/make-server-8bff1720/farmer/profile", async (c) => {
  try {
    const profile = await c.req.json();
    const farmerId = `farmer_${Date.now()}`;
    
    await kv.set(`farmer:${farmerId}`, JSON.stringify({ ...profile, id: farmerId }));
    
    return c.json({ success: true, farmerId });
  } catch (error) {
    console.error("Error saving farmer profile:", error);
    return c.json({ error: "Failed to save profile" }, 500);
  }
});

// Financial tracking
app.post("/make-server-8bff1720/finance/record", async (c) => {
  try {
    const { farmerId, type, category, amount, description, date } = await c.req.json();
    
    const recordId = `finance_${Date.now()}`;
    const record = { id: recordId, farmerId, type, category, amount, description, date };
    
    await kv.set(`finance:${farmerId}:${recordId}`, JSON.stringify(record));
    
    return c.json({ success: true, recordId });
  } catch (error) {
    console.error("Error recording finance:", error);
    return c.json({ error: "Failed to record finance" }, 500);
  }
});

app.get("/make-server-8bff1720/finance/:farmerId", async (c) => {
  try {
    const farmerId = c.req.param('farmerId');
    const records = await kv.getByPrefix(`finance:${farmerId}:`);
    
    const parsed = records.map(r => JSON.parse(r));
    const totalIncome = parsed.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0);
    const totalExpense = parsed.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0);
    
    return c.json({
      records: parsed,
      summary: {
        totalIncome,
        totalExpense,
        profit: totalIncome - totalExpense,
        profitMargin: totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1) : 0
      }
    });
  } catch (error) {
    console.error("Error fetching finance data:", error);
    return c.json({ error: "Failed to fetch finance data" }, 500);
  }
});

Deno.serve(app.fetch);