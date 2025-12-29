# Fleet Manager MVP - Comprehensive Fleet Management System

## 🚀 Overview

A state-of-the-art fleet management system built with Next.js, React, and modern web technologies. This comprehensive solution provides real-time vehicle tracking, driver management, maintenance scheduling, advanced analytics, and compliance monitoring.

## ✨ Key Features

### 🚗 Vehicle Management
- Complete vehicle tracking and monitoring
- Real-time status updates (active, maintenance, inactive)
- Registration and insurance expiration tracking
- Mileage tracking and history
- Vehicle categorization by type

### 👨‍✈️ Driver Management
- Comprehensive driver profiles
- License tracking and expiration alerts
- Performance scoring system
- Driver activity monitoring
- Contact information management

### 🔧 Maintenance System
- Automated maintenance scheduling
- Predictive maintenance alerts
- Complete maintenance history
- Cost tracking per vehicle
- Service interval monitoring

### 📊 Advanced Analytics
- Fuel efficiency analysis
- Cost per mile/kilometer tracking
- Vehicle utilization metrics
- Driver performance scoring
- Fleet-wide performance dashboards

### ⚠️ Alerts & Compliance
- Real-time alert notifications
- Compliance monitoring (registrations, insurance, licenses)
- Automated compliance reports
- Issue tracking and resolution

## 🛠️ Technology Stack

- **Frontend**: Next.js 15+ with React 18
- **Styling**: Tailwind CSS 4.0
- **Backend**: Next.js API Routes
- **Database**: In-memory (extensible to PostgreSQL/MongoDB)
- **Analytics**: Custom fleet analytics engine

## 📁 Project Structure

```
fleetmanager-mvp/
├── components/
│   └── Fleet/
│       ├── Dashboard.js          # Main fleet dashboard
│       ├── VehicleCard.js        # Vehicle display component
│       ├── DriverCard.js         # Driver display component
│       └── AnalyticsChart.js     # Analytics visualization
├── lib/
│   └── fleet/
│       ├── database.js           # Fleet database operations
│       ├── analytics.js          # Analytics engine
│       └── sampleData.js         # Sample data initializer
├── pages/
│   ├── fleet.js                  # Main fleet page
│   ├── vehicles.js               # Vehicles management
│   ├── drivers.js                # Drivers management
│   ├── analytics.js              # Analytics dashboard
│   └── api/fleet/                # Fleet API endpoints
├── docs/
│   └── FLEET_MANAGEMENT.md       # Detailed documentation
└── fleet_manager.py              # Python CLI deployment tool
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd fleetmanager-mvp
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Initialize sample data**
```bash
curl -X POST http://localhost:3000/api/fleet/init
```

5. **Access the application**
- Main Dashboard: http://localhost:3000/fleet
- Vehicles: http://localhost:3000/vehicles
- Drivers: http://localhost:3000/drivers
- Analytics: http://localhost:3000/analytics

## 📖 API Documentation

### Vehicles API
- `GET /api/fleet/vehicles` - Get all vehicles with statistics
- `POST /api/fleet/vehicles` - Add new vehicle

### Drivers API
- `GET /api/fleet/drivers` - Get all drivers
- `POST /api/fleet/drivers` - Add new driver

### Analytics API
- `GET /api/fleet/analytics?type=fleet-performance` - Fleet metrics
- `GET /api/fleet/analytics?type=compliance` - Compliance report
- `GET /api/fleet/analytics?type=fuel-efficiency&vehicleId=X` - Fuel analysis

### Alerts API
- `GET /api/fleet/alerts` - Get active alerts
- `POST /api/fleet/alerts` - Create new alert
- `PATCH /api/fleet/alerts` - Resolve alert

For complete API documentation, see [docs/FLEET_MANAGEMENT.md](docs/FLEET_MANAGEMENT.md)

## 🎯 Core Features

### Real-time Dashboard
- Live fleet statistics
- Active alerts overview
- Vehicle status breakdown
- Quick access to key metrics

### Vehicle Tracking
- Comprehensive vehicle information
- Status monitoring
- Document expiration alerts
- Maintenance history

### Driver Performance
- Automated performance scoring
- Safety record tracking
- Fuel efficiency monitoring
- On-time delivery metrics

### Predictive Maintenance
- AI-powered maintenance predictions
- Mileage-based scheduling
- Cost optimization
- Service interval tracking

### Compliance Monitoring
- Automated compliance checks
- Expiration date tracking
- Regulatory compliance reports
- Issue identification and tracking

## 🔧 Build & Deploy

### Production Build
```bash
npm run build
npm start
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📚 Documentation

- [Complete Fleet Management Documentation](docs/FLEET_MANAGEMENT.md)
- [Live Dashboard Plan](docs/plan.md)

## 🚀 Future Enhancements

- [ ] GPS tracking integration
- [ ] Route optimization
- [ ] Mobile app (React Native)
- [ ] Advanced reporting and exports
- [ ] Multi-tenant support
- [ ] Telematics device integration
- [ ] Weather and traffic integration
- [ ] Automated dispatching
- [ ] Driver mobile app
- [ ] Customer portal

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please submit pull requests or open issues for bugs and feature requests.

## 📧 Support

For support or questions, please open an issue in the repository
