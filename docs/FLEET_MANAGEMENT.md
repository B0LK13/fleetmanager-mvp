# Fleet Management System - Comprehensive Documentation

## Overview

This is a state-of-the-art fleet management system built with Next.js, React, and modern web technologies. The system provides comprehensive vehicle tracking, driver management, maintenance scheduling, analytics, and real-time monitoring capabilities.

## Features

### 🚗 Vehicle Management
- **Complete Vehicle Tracking**: Monitor all vehicles in your fleet with detailed information including make, model, year, VIN, license plate, and current status
- **Vehicle Status Monitoring**: Track vehicle status (active, maintenance, inactive)
- **Registration & Insurance Tracking**: Monitor expiration dates and receive alerts
- **Mileage Tracking**: Automatic mileage recording and tracking
- **Vehicle Type Classification**: Organize vehicles by type (van, truck, sedan, etc.)

### 👨‍✈️ Driver Management
- **Driver Profiles**: Comprehensive driver information including contact details and employment history
- **License Management**: Track driver's license numbers and expiration dates
- **Performance Scoring**: Automated driver performance scoring based on:
  - Safety incidents
  - Fuel efficiency
  - On-time delivery performance
- **Driver Activity Tracking**: Monitor driver assignments and trip history

### 🔧 Maintenance Management
- **Maintenance Scheduling**: Schedule and track all vehicle maintenance activities
- **Maintenance History**: Complete maintenance records for each vehicle
- **Cost Tracking**: Track maintenance costs per vehicle and overall fleet
- **Predictive Maintenance**: AI-powered predictions for upcoming maintenance needs:
  - Oil change predictions based on mileage
  - Tire rotation scheduling
  - Service interval tracking
- **Maintenance Types**: Support for various maintenance types:
  - Oil changes
  - Tire rotations
  - Brake service
  - Inspections
  - General repairs

### 📊 Advanced Analytics
- **Fuel Efficiency Analysis**: Calculate and monitor fuel consumption metrics
  - Average MPG per vehicle
  - Total fuel consumption
  - Fuel cost analysis
- **Cost Analysis**: Comprehensive cost tracking
  - Cost per mile/kilometer
  - Maintenance costs
  - Fuel costs
  - Total cost of ownership
- **Vehicle Utilization**: Track how efficiently vehicles are being used
  - Utilization rates
  - Idle time analysis
  - Trip frequency
- **Fleet Performance Metrics**: Overall fleet health and performance indicators
  - Total distance traveled
  - Average driver scores
  - Fleet-wide efficiency metrics

### ⚠️ Alerts & Notifications
- **Real-time Alerts**: Immediate notifications for critical events
- **Maintenance Alerts**: Automated alerts for upcoming maintenance
- **Compliance Alerts**: Notifications for expiring licenses, registrations, and insurance
- **Custom Alert Configuration**: Configure alert types and severity levels

### 📋 Compliance & Reporting
- **Compliance Monitoring**: Track regulatory compliance for:
  - Vehicle registrations
  - Insurance coverage
  - Driver licenses
- **Automated Reports**: Generate compliance reports on demand
- **Issue Tracking**: Identify and track compliance issues

### 🎯 Dashboard Features
- **Real-time Statistics**: Live dashboard with key performance indicators
- **Visual Analytics**: Charts and graphs for quick insights
- **Alert Overview**: Immediate visibility of active alerts
- **Fleet Summary**: Quick overview of fleet status and health

## Architecture

### Technology Stack
- **Frontend**: Next.js 15+ with React 18
- **Styling**: Tailwind CSS 4.0
- **Backend**: Next.js API Routes
- **Data Storage**: In-memory database (can be extended to PostgreSQL, MongoDB, etc.)
- **Analytics Engine**: Custom fleet analytics library

### Project Structure
```
fleetmanager-mvp/
├── components/
│   └── Fleet/
│       └── Dashboard.js          # Main fleet dashboard component
├── lib/
│   └── fleet/
│       ├── database.js           # Fleet database operations
│       ├── analytics.js          # Analytics engine
│       └── sampleData.js         # Sample data initializer
├── pages/
│   ├── fleet.js                  # Fleet management page
│   └── api/
│       └── fleet/
│           ├── vehicles.js       # Vehicle API endpoints
│           ├── drivers.js        # Driver API endpoints
│           ├── analytics.js      # Analytics API endpoints
│           ├── alerts.js         # Alerts API endpoints
│           └── init.js           # Data initialization endpoint
└── fleet_manager.py              # Python CLI tool for deployment
```

## API Documentation

### Vehicle Endpoints

#### GET /api/fleet/vehicles
Get all vehicles with fleet statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "vehicles": [...],
    "stats": {
      "totalVehicles": 5,
      "activeVehicles": 4,
      "vehiclesByType": {...},
      "vehiclesByStatus": {...}
    }
  }
}
```

#### POST /api/fleet/vehicles
Add a new vehicle to the fleet.

**Request Body:**
```json
{
  "vehicle": {
    "make": "Ford",
    "model": "Transit",
    "year": 2022,
    "type": "van",
    "status": "active",
    "mileage": 15000,
    "vin": "1FTYE1YM8MKA12345",
    "licensePlate": "ABC-1234",
    "registrationExpiry": "2025-06-15",
    "insuranceExpiry": "2025-03-20",
    "fuelType": "diesel"
  }
}
```

### Driver Endpoints

#### GET /api/fleet/drivers
Get all drivers.

#### POST /api/fleet/drivers
Add a new driver.

**Request Body:**
```json
{
  "driver": {
    "name": "John Smith",
    "email": "john.smith@fleet.com",
    "phone": "+1-555-0101",
    "licenseNumber": "DL123456789",
    "licenseExpiry": "2026-04-15",
    "status": "active"
  }
}
```

### Analytics Endpoints

#### GET /api/fleet/analytics
Get fleet analytics. Supports multiple analysis types via query parameters.

**Query Parameters:**
- `type`: Analysis type (fuel-efficiency, maintenance-costs, driver-score, etc.)
- `vehicleId`: Vehicle ID for vehicle-specific analytics
- `driverId`: Driver ID for driver-specific analytics

**Examples:**
```
GET /api/fleet/analytics?type=fleet-performance
GET /api/fleet/analytics?type=fuel-efficiency&vehicleId=123
GET /api/fleet/analytics?type=driver-score&driverId=456
GET /api/fleet/analytics?type=compliance
```

**Analytics Types:**
- `fuel-efficiency`: Fuel consumption and efficiency metrics
- `maintenance-costs`: Maintenance cost analysis
- `driver-score`: Driver performance scoring
- `vehicle-utilization`: Vehicle usage analysis
- `cost-per-mile`: Cost per distance analysis
- `predictive-maintenance`: Upcoming maintenance predictions
- `fleet-performance`: Overall fleet metrics
- `compliance`: Compliance status report

### Alert Endpoints

#### GET /api/fleet/alerts
Get all active alerts.

#### POST /api/fleet/alerts
Create a new alert.

**Request Body:**
```json
{
  "alert": {
    "type": "maintenance",
    "severity": "high",
    "message": "Vehicle due for oil change",
    "vehicleId": "123"
  }
}
```

#### PATCH /api/fleet/alerts
Resolve an alert.

**Request Body:**
```json
{
  "alertId": "123"
}
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd fleetmanager-mvp
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Access the application:**
Open [http://localhost:3000/fleet](http://localhost:3000/fleet) in your browser.

### Initialize Sample Data

To populate the system with sample data for testing:

**Option 1: Via API**
```bash
curl -X POST http://localhost:3000/api/fleet/init
```

**Option 2: Via Browser**
Navigate to `/api/fleet/init` and send a POST request using a tool like Postman.

## Usage Guide

### Viewing the Dashboard
1. Navigate to `/fleet` to see the main dashboard
2. View real-time statistics for your fleet
3. Check active alerts in the alert banner
4. Review vehicle status and type breakdowns
5. Browse the fleet vehicles table

### Adding Vehicles
Use the vehicles API endpoint to add new vehicles:
```javascript
fetch('/api/fleet/vehicles', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    vehicle: {
      make: 'Ford',
      model: 'F-150',
      year: 2023,
      type: 'truck',
      status: 'active',
      mileage: 5000
    }
  })
})
```

### Monitoring Analytics
Query the analytics endpoint for insights:
```javascript
// Get fleet performance
fetch('/api/fleet/analytics?type=fleet-performance')

// Get vehicle fuel efficiency
fetch('/api/fleet/analytics?type=fuel-efficiency&vehicleId=123')

// Get compliance report
fetch('/api/fleet/analytics?type=compliance')
```

## Advanced Features

### Predictive Maintenance
The system uses historical maintenance data and mileage tracking to predict upcoming maintenance needs:

- **Oil Changes**: Predicted based on mileage intervals (typically 5,000 miles)
- **Tire Rotations**: Predicted based on mileage intervals (typically 8,000 miles)
- **Service Schedules**: Customizable intervals per vehicle type

### Performance Scoring
Driver performance is calculated using multiple factors:
- **Safety Record**: -10 points per incident
- **Fuel Efficiency**: Bonus points for >30 MPG, penalty for <20 MPG
- **On-Time Performance**: Bonus for >90%, penalty for <70%
- Score range: 0-100

### Cost Analysis
Comprehensive cost tracking includes:
- Fuel costs per trip
- Maintenance costs per vehicle
- Cost per mile/kilometer
- Total cost of ownership

## Deployment

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

### Environment Variables
Create a `.env.local` file for configuration:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=postgresql://... (for production)
```

## Extending the System

### Adding Database Persistence
Replace the in-memory database with a real database:

1. Install database client (e.g., `pg` for PostgreSQL)
2. Update `lib/fleet/database.js` to use database queries
3. Create database migration scripts
4. Update API endpoints as needed

### Adding Authentication
Implement authentication using:
- NextAuth.js
- JWT tokens
- OAuth providers

### Adding Real-time Updates
Implement WebSocket support for:
- Live vehicle tracking
- Real-time alerts
- Dashboard updates

## Support and Maintenance

### Logging
All API endpoints include error logging and proper HTTP status codes.

### Error Handling
Comprehensive error handling throughout the application with user-friendly error messages.

### Performance
- Optimized database queries
- Efficient component rendering
- Lazy loading for large datasets

## Future Enhancements

### Planned Features
- [ ] GPS tracking integration
- [ ] Route optimization
- [ ] Mobile app (React Native)
- [ ] Advanced reporting and exports
- [ ] Multi-tenant support
- [ ] Integration with telematics devices
- [ ] Weather and traffic integration
- [ ] Automated dispatching
- [ ] Driver mobile app
- [ ] Customer portal

## License
MIT License

## Contributing
Contributions are welcome! Please submit pull requests or open issues for bugs and feature requests.

## Contact
For support or questions, please open an issue in the repository.
