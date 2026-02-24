# 📊 Datasets for AgriBot AI - Comprehensive Guide

This document provides a complete list of recommended datasets and data sources for implementing all 17+ features of the AgriBot AI agricultural platform.

---

## 🌾 1. Yield Prediction (LSTM & Random Forest)

### Datasets Required:
- **ICRISAT Crop Yield Data** - Historical yield data for Indian crops
  - Source: https://data.icrisat.org/
  - Format: CSV, Excel
  - Coverage: Multiple states, 20+ years of data

- **FAO Crop Production Database** - Global agricultural statistics
  - Source: https://www.fao.org/faostat/
  - API: Available
  - Coverage: Country-level production data

- **State Agriculture Department Data** - State-wise crop yield records
  - Source: Individual state agriculture portals
  - Example: Punjab: https://agripb.gov.in/

- **District-level Crop Statistics**
  - Source: Directorate of Economics & Statistics (DES)
  - Portal: https://aps.dac.gov.in/

### Implementation:
```python
# Example data structure needed
{
  "crop_type": "rice",
  "year": 2023,
  "district": "Thanjavur",
  "yield_kg_per_acre": 2800,
  "rainfall_mm": 950,
  "soil_type": "alluvial",
  "fertilizer_used": "NPK 10:26:26"
}
```

---

## 🛰️ 2. Satellite Crop Health Monitoring (NDVI)

### Satellite Data Sources:

#### Free & Open Source:
1. **Sentinel-2 (ESA Copernicus)**
   - Resolution: 10m, 20m, 60m
   - Revisit time: 5 days
   - Access: https://scihub.copernicus.eu/
   - API: Yes (free registration required)

2. **Landsat 8/9 (NASA/USGS)**
   - Resolution: 30m
   - Revisit time: 16 days
   - Access: https://earthexplorer.usgs.gov/
   - API: Yes

3. **ISRO Bhuvan Platform**
   - Source: Indian Space Research Organisation
   - Portal: https://bhuvan.nrsc.gov.in/
   - Features: Indian satellite imagery, geo-spatial data
   - Access: Free for Indian users

4. **MODIS NDVI Products**
   - Resolution: 250m, 500m, 1km
   - Frequency: Daily, 8-day, 16-day composites
   - Access: https://modis.gsfc.nasa.gov/

### NDVI Calculation:
```
NDVI = (NIR - Red) / (NIR + Red)

Where:
- NIR = Near-Infrared band
- Red = Red visible band
- Range: -1 to +1
- Healthy vegetation: 0.6 to 0.9
```

### Tools for Processing:
- **Google Earth Engine** - Cloud-based geospatial processing
- **QGIS** - Open-source GIS software
- **Python Libraries**: `rasterio`, `geopandas`, `sentinelsat`

---

## 💰 3. Market Price Prediction

### Data Sources:

1. **Agmarknet API/Portal**
   - Source: Government of India
   - Portal: https://agmarknet.gov.in/
   - Data: Daily mandi prices across 2,800+ markets
   - Access: Web scraping or official API (if available)
   - Coverage: All major crops

2. **eNAM (National Agriculture Market)**
   - Portal: https://www.enam.gov.in/
   - Features: Real-time bidding data, price trends
   - API: Available for registered users

3. **NCDEX/MCX Commodity Data**
   - Source: Commodity futures exchanges
   - Data: Forward prices, futures contracts
   - Access: NCDEX website, MCX portal

4. **State Marketing Board Data**
   - Regional price variations
   - State-specific portals

### Historical Price Data Format:
```json
{
  "date": "2024-02-15",
  "market": "Azadpur Mandi, Delhi",
  "crop": "Wheat",
  "variety": "Sharbati",
  "min_price": 2050,
  "max_price": 2200,
  "modal_price": 2150,
  "arrivals_quintals": 45000
}
```

---

## 🌦️ 4. Weather & Climate Data

### APIs & Sources:

1. **IMD (India Meteorological Department)**
   - Portal: https://mausam.imd.gov.in/
   - Data: Weather forecasts, historical data
   - Access: Official website, some data via API

2. **OpenWeatherMap API**
   - URL: https://openweathermap.org/api
   - Features: Current weather, 7-day forecast
   - Pricing: Free tier available (60 calls/min)
   - Coverage: Global

3. **Visual Crossing Weather API**
   - URL: https://www.visualcrossing.com/
   - Features: Historical weather data, forecasts
   - Pricing: Free tier (1000 records/day)

4. **NASA POWER API**
   - URL: https://power.larc.nasa.gov/
   - Features: Agricultural meteorology data
   - Data: Solar radiation, temperature, humidity, wind
   - Access: Free

### Weather Parameters Needed:
- Temperature (min/max/avg)
- Rainfall (mm)
- Humidity (%)
- Wind speed (km/h)
- Solar radiation
- Evapotranspiration

---

## 🏛️ 5. Government Subsidies & Schemes

### Data Sources:

1. **PM-KISAN Database**
   - Portal: https://pmkisan.gov.in/
   - Data: Beneficiary records, payment status
   - API: Limited access for verification

2. **Pradhan Mantri Fasal Bima Yojana (PMFBY)**
   - Portal: https://pmfby.gov.in/
   - Data: Insurance enrollment, claims
   - API: Available for registered entities

3. **mKisan Portal**
   - Portal: https://mkisan.gov.in/
   - Data: Government advisory services, SMS alerts

4. **State Agriculture Department Portals**
   - Local scheme information
   - State-specific subsidies

### Scheme Information Structure:
```json
{
  "scheme_name": "PM-KISAN",
  "eligibility": {
    "land_size_max_acres": 2,
    "farmer_category": "all"
  },
  "benefit_amount": 6000,
  "frequency": "yearly",
  "installments": 3,
  "how_to_apply": "https://pmkisan.gov.in/",
  "documents_required": ["Aadhaar", "Land Records", "Bank Account"]
}
```

---

## 🐛 6. Pest & Disease Detection

### Image Datasets:

1. **PlantVillage Dataset**
   - Source: https://github.com/spMohanty/PlantVillage-Dataset
   - Content: 54,000+ images of diseased plants
   - Categories: 14 crops, 38 disease classes
   - Format: JPG images, labeled

2. **Kaggle Plant Disease Datasets**
   - Multiple datasets available
   - Search: "Plant Disease Classification"
   - Common crops: Tomato, Potato, Rice, Wheat

3. **ICAR-NBAIR Database**
   - Source: National Bureau of Agricultural Insect Resources
   - Data: Pest occurrence records
   - Access: Research institutions

4. **Plant Pathology Dataset**
   - Source: Kaggle, agricultural research institutes
   - Focus: Leaf disease classification

### Training Data Structure:
```
plant_disease_dataset/
├── rice/
│   ├── bacterial_leaf_blight/
│   │   ├── image001.jpg
│   │   ├── image002.jpg
│   ├── brown_spot/
│   ├── healthy/
├── wheat/
│   ├── rust/
│   ├── blight/
```

---

## 🌱 7. Soil Testing Data

### Sources:

1. **Soil Health Card Portal**
   - Portal: https://soilhealth.dac.gov.in/
   - Data: Soil test results across India
   - Coverage: 14+ crore samples tested

2. **ICAR-NBSS&LUP**
   - Institute: National Bureau of Soil Survey & Land Use Planning
   - Data: Soil resource inventories, maps
   - Access: Research collaboration

3. **FAO Soil Database**
   - Portal: https://www.fao.org/soils-portal/
   - Coverage: Global soil properties
   - Format: GIS layers, CSV

4. **State Soil Testing Labs**
   - Regional soil nutrient data
   - Contact: State agriculture universities

### Soil Parameters:
- pH (6.0-7.5 optimal)
- Nitrogen (N) - kg/ha
- Phosphorus (P) - kg/ha
- Potassium (K) - kg/ha
- Organic Carbon (%)
- Electrical Conductivity
- Micronutrients (Zn, Fe, Mn, Cu, B)

---

## 💧 8. Irrigation Data

### Sources:

1. **India-WRIS (Water Resources Information System)**
   - Portal: https://indiawris.gov.in/
   - Data: Water availability, groundwater levels

2. **FAO AQUASTAT**
   - Portal: https://www.fao.org/aquastat/
   - Data: Water and agriculture database

3. **Central Ground Water Board**
   - Data: Groundwater level monitoring
   - Access: State-wise reports

4. **Evapotranspiration Data**
   - Source: Weather APIs (NASA POWER, FAO Penman-Monteith)

### Crop Water Requirements:
```
Rice: 1500-2000 mm/season
Wheat: 450-650 mm/season
Cotton: 700-1300 mm/season
Sugarcane: 2000-2500 mm/season
Maize: 500-800 mm/season
```

---

## 🛡️ 9. Crop Insurance Risk Data

### Sources:

1. **PMFBY Claim Data**
   - Portal: https://pmfby.gov.in/
   - Data: Historical insurance claims
   - Coverage: Crop loss due to natural calamities

2. **Disaster Management Data**
   - Portal: https://ndma.gov.in/
   - Data: Natural calamity records
   - Types: Drought, flood, cyclone, hailstorm

3. **Crop Loss Statistics**
   - Source: State agriculture departments
   - Data: Crop damage assessments

---

## 🌿 10. Organic Farming Data

### Resources:

1. **NPOP Database**
   - Program: National Programme for Organic Production
   - Portal: https://npop.in/
   - Data: Certification records

2. **PGS-India (Participatory Guarantee System)**
   - Portal: https://pgsindia-ncof.gov.in/
   - Data: Organic certification for small farmers

3. **APEDA Organic Certification**
   - Portal: https://apeda.gov.in/
   - Focus: Export quality organic products

---

## 📚 11. Farmer Training & Learning

### Content Sources:

1. **ICAR e-Learning Courses**
   - Portal: https://icar.org.in/
   - Content: Agricultural education videos

2. **KVK (Krishi Vigyan Kendra) Resources**
   - Centers: 700+ across India
   - Content: Training materials, demonstrations

3. **MANAGE e-Content**
   - Institute: National Institute of Agricultural Extension Management
   - Portal: https://www.manage.gov.in/

---

## 🔄 12. Crop Rotation Data

### Sources:

1. **ICAR Crop Rotation Guidelines**
   - Research-based recommendations
   - Crop-wise compatibility data

2. **State Agricultural Universities**
   - Regional best practices
   - Soil-crop suitability charts

3. **FAO Crop Rotation Database**
   - Global patterns and recommendations

---

## 📡 API Integration Examples

### 1. Weather API (OpenWeatherMap)
```javascript
const API_KEY = 'your_api_key';
const url = `https://api.openweathermap.org/data/2.5/weather?lat=28.6139&lon=77.2090&appid=${API_KEY}`;

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));
```

### 2. Sentinel Hub API (Satellite Data)
```python
from sentinelhub import SHConfig, SentinelHubRequest, DataCollection

config = SHConfig()
config.sh_client_id = 'your_client_id'
config.sh_client_secret = 'your_client_secret'

# Request NDVI data
request = SentinelHubRequest(
    data_folder='data',
    evalscript=ndvi_evalscript,
    input_data=[
        SentinelHubRequest.input_data(
            data_collection=DataCollection.SENTINEL2_L2A,
            time_interval=('2024-01-01', '2024-01-31'),
        )
    ],
    responses=[
        SentinelHubRequest.output_response('ndvi', MimeType.TIFF)
    ],
    bbox=bbox,
    size=size,
    config=config
)
```

---

## 📥 Data Format Recommendations

### Training Data:
- **Format**: CSV, JSON, Parquet
- **Storage**: Cloud (AWS S3, Google Cloud Storage)
- **Version Control**: DVC (Data Version Control)

### Satellite Imagery:
- **Format**: GeoTIFF, HDF, NetCDF
- **Processing**: Cloud-based (Google Earth Engine)

### Time Series:
- **Format**: JSON, CSV with timestamps
- **Database**: TimescaleDB, InfluxDB

### Geospatial:
- **Format**: GeoJSON, Shapefiles, KML
- **Database**: PostGIS

---

## 🔗 Quick Reference Links

| Category | Source | URL |
|----------|--------|-----|
| Crop Yield | ICRISAT | https://data.icrisat.org/ |
| Satellite | Sentinel Hub | https://www.sentinel-hub.com/ |
| Weather | OpenWeatherMap | https://openweathermap.org/ |
| Market Prices | Agmarknet | https://agmarknet.gov.in/ |
| Government Schemes | PM-KISAN | https://pmkisan.gov.in/ |
| Soil Health | Soil Health Portal | https://soilhealth.dac.gov.in/ |
| Plant Disease | PlantVillage | https://github.com/spMohanty/PlantVillage-Dataset |
| Water Resources | India-WRIS | https://indiawris.gov.in/ |

---

## 🚀 Getting Started with Datasets

### Step 1: Priority Datasets (MVP)
1. Historical crop yield data (any state)
2. Weather API integration (OpenWeatherMap - free tier)
3. Agmarknet price scraping or CSV download
4. PlantVillage dataset for pest detection

### Step 2: Advanced Features
1. Sentinel-2 satellite access via Google Earth Engine
2. Soil Health Card data collaboration
3. Government scheme APIs integration
4. Real-time market price APIs

### Step 3: Production Ready
1. Multiple satellite sources (redundancy)
2. Commercial weather APIs (higher accuracy)
3. IoT sensor integration (real-time soil/weather data)
4. Blockchain crop traceability

---

## 📝 Data Collection Best Practices

1. **Start Small**: Use publicly available datasets
2. **Validate Data**: Cross-check with multiple sources
3. **Respect Privacy**: Anonymize farmer data
4. **Regular Updates**: Set up automated data pipelines
5. **Backup**: Maintain data backups (3-2-1 rule)
6. **Documentation**: Document data sources and preprocessing steps

---

## 🤝 Data Partnerships

Consider partnerships with:
- **ICAR** - Indian Council of Agricultural Research
- **IARI** - Indian Agricultural Research Institute
- **SAUs** - State Agricultural Universities
- **KVKs** - Krishi Vigyan Kendras (700+ centers)
- **NABARD** - For financial data integration
- **Private Agri-Tech Companies** - For sensor data

---

## ⚖️ Legal & Compliance

- **Data Privacy**: Comply with DPDP Act 2023 (India)
- **Satellite Data**: Follow ISRO licensing for commercial use
- **API Terms**: Respect rate limits and terms of service
- **Open Data**: Credit sources appropriately
- **Farmer Consent**: Obtain consent for data collection

---

---

## 🎯 Implementation Status

### ✅ Currently Connected to Backend:
- Government Schemes Data (10+ schemes with complete details)
- Farmer Profit Calculations (personalized income doubling strategies)
- AI Yield Predictions (LSTM + Random Forest algorithms)
- Market Price Predictions (Agmarknet simulation)
- Soil Testing Analysis
- Irrigation Planning
- Weather Forecasts
- Financial Tracking
- All data stored in Supabase KV database

### 🔄 Ready for Integration:
- Real satellite data APIs (Sentinel-2, Landsat, ISRO Bhuvan)
- Live Agmarknet price feeds
- Weather API integration (OpenWeatherMap, IMD)
- Government scheme API connections
- Soil Health Card portal data

### 📊 Dataset Recommendations for Production:

**Priority 1 (MVP):**
1. Historical crop yield data (CSV from state agriculture departments)
2. Weather API (OpenWeatherMap free tier)
3. Market prices (Agmarknet web scraping or CSV downloads)
4. Plant disease images (PlantVillage dataset)

**Priority 2 (Enhanced Features):**
1. Sentinel-2 satellite imagery (via Google Earth Engine)
2. Soil Health Card data (collaborate with agriculture dept)
3. Real-time government scheme APIs
4. Live market price feeds (e-NAM API)

**Priority 3 (Production Ready):**
1. Multiple satellite sources for redundancy
2. Commercial weather APIs (higher accuracy)
3. IoT sensor integration (real-time soil/weather data)
4. Blockchain crop traceability
5. ML model training on local datasets

---

## 🌾 Government Schemes Dataset

The application now includes complete information for:

1. **PM-KISAN** - Income support scheme
   - Eligibility: All landholding farmers
   - Benefit: ₹6,000/year in 3 installments
   - Application: https://pmkisan.gov.in
   - Helpline: 011-24300606, 155261

2. **PMFBY** - Crop insurance
   - Premium: 2% for Kharif, 1.5% for Rabi
   - Coverage: Natural disasters, pests, diseases
   - Application: https://pmfby.gov.in
   - Helpline: 011-23382012

3. **PMKSY** - Irrigation subsidy
   - Subsidy: Up to 90% on drip/sprinkler systems
   - Application: State agriculture department
   - Portal: https://pmksy.gov.in

4. **Digital Agriculture Mission**
   - Support: AI, Blockchain, Drone technology
   - Portal: https://agricoop.nic.in
   - Helpline: 011-23070964

5. **Agriculture Infrastructure Fund**
   - Fund: ₹1 lakh crore available
   - Interest: 3% subvention
   - Application: https://agriinfra.dac.gov.in
   - Helpline: 1800-180-1551

6. **NABARD Funding**
   - Focus: Rural innovation, agri-tech startups
   - Portal: https://www.nabard.org
   - Helpline: 022-26539895

7. **Soil Health Card Scheme**
   - Service: Free soil testing
   - Portal: https://soilhealth.dac.gov.in
   - Access: Via KVK or agriculture office

8. **PKVY - Organic Farming**
   - Support: ₹50,000/hectare for 3 years
   - Requirements: Cluster of 50+ farmers
   - Portal: https://pgsindia-ncof.gov.in

9. **e-NAM** - National Agriculture Market
   - Service: Online trading platform
   - Registration: https://www.enam.gov.in
   - Helpline: 1800-270-0224

10. **RKVY-RAFTAAR** - Startup support
    - Funding: Up to ₹25 lakhs for agri-startups
    - Portal: https://rkvy.nic.in
    - Helpline: 011-23070964

---

## 💰 Farmer Income Strategies Dataset

**10 Proven Income Increase Methods:**

1. **Precision Agriculture**
   - Impact: 20-30% yield increase
   - Cost: ₹10,000-₹25,000 initial investment
   - ROI: ₹25,000-₹40,000/acre annually
   - Timeframe: 6-12 months

2. **Crop Diversification**
   - Impact: 15-25% income boost
   - Method: Intercropping, crop rotation
   - Gain: ₹15,000-₹30,000 annually
   - Timeframe: 1 season

3. **Direct Market Access**
   - Impact: 10-20% better prices
   - Platform: e-NAM, direct buyer connections
   - Gain: ₹8,000-₹20,000 per season
   - Timeframe: 1-2 months

4. **Value Addition**
   - Impact: 100-200% margin increase
   - Method: Processing, packaging, branding
   - Gain: ₹50,000-₹1,00,000 annually
   - Timeframe: 6-18 months

5. **Organic Farming**
   - Impact: 30-50% price premium
   - Certification: PGS/NPOP (3 years)
   - Gain: ₹35,000-₹60,000/acre
   - Support: PKVY scheme ₹50,000/hectare

6. **Allied Activities**
   - Options: Dairy, poultry, beekeeping, fish farming
   - Investment: ₹20,000-₹50,000
   - Income: ₹20,000-₹50,000 annually
   - Timeframe: 3-6 months

7. **Cost Reduction**
   - Methods: Organic compost, IPM, soil testing
   - Savings: 25-40% on inputs
   - Gain: ₹10,000-₹25,000 annually
   - Timeframe: 3-6 months

8. **Government Schemes**
   - PM-KISAN: ₹6,000/year
   - PMFBY: Risk coverage
   - PMKSY: Irrigation subsidy
   - Total: ₹15,000-₹60,000 annually

9. **Contract Farming**
   - Benefit: Assured prices, reduced risk
   - Partners: Agri-companies
   - Income: ₹20,000-₹40,000/acre
   - Timeframe: 1 season

10. **Mechanization**
    - Method: Custom Hiring Centers
    - Savings: Labor cost reduction
    - Gain: ₹15,000-₹30,000 annually
    - Timeframe: 1 month

---

**Last Updated**: February 19, 2026  
**Maintained by**: AgriBot AI Team

*For questions, dataset suggestions, or implementation support, please contact the development team.*

**Note:** All government scheme data is accurate as of February 2026. Please verify current details on official government portals before applying.

