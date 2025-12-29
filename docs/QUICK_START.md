# Fleet Management System - Quick Start Guide

## 🎯 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Development Server
```bash
npm run dev
```

### Step 3: Initialize Sample Data
Open a new terminal and run:
```bash
curl -X POST http://localhost:3000/api/fleet/init
```

Or visit http://localhost:3000/api/fleet/init in your browser.

### Step 4: Explore the Application

#### Main Dashboard
Visit [http://localhost:3000/fleet](http://localhost:3000/fleet)
- View real-time fleet statistics
- Monitor active alerts
- Check vehicle status breakdown
- See key performance indicators

#### Vehicle Management
Visit [http://localhost:3000/vehicles](http://localhost:3000/vehicles)
- Browse all fleet vehicles
- Filter by status (active, maintenance, inactive)
- Search by make, model, or license plate
- View detailed vehicle information

#### Driver Management
Visit [http://localhost:3000/drivers](http://localhost:3000/drivers)
- View all fleet drivers
- Filter by driver status
- Search by name or license number
- Monitor license expiration dates

#### Analytics Dashboard
Visit [http://localhost:3000/analytics](http://localhost:3000/analytics)
- View fleet performance metrics
- Analyze cost data
- Check compliance status
- Review driver scores

## 📊 Sample Data Overview

The initialization creates:
- **5 vehicles** (vans and trucks from various manufacturers)
- **4 drivers** with complete profiles
- **Maintenance records** including oil changes, tire rotations, and inspections
- **Trip history** with fuel and distance tracking
- **Alerts** for maintenance and compliance

## 🔑 Key Features to Try

### 1. Dashboard Overview
```
Feature: Real-time Statistics
Location: /fleet
What to see: Total vehicles, drivers, pending maintenance, active alerts
```

### 2. Vehicle Tracking
```
Feature: Vehicle Cards
Location: /vehicles
What to try: 
- Filter vehicles by status
- Search for specific vehicles
- Check expiration dates (look for colored warnings)
```

### 3. Driver Performance
```
Feature: Driver Cards
Location: /drivers
What to see:
- Driver avatars with initials
- Years of experience
- License expiration tracking
```

### 4. Analytics Insights
```
Feature: Performance Metrics
Location: /analytics
What to analyze:
- Total distance traveled
- Fuel costs
- Driver performance scores
- Compliance status
```

## 🛠️ Common Tasks

### Add a New Vehicle
```bash
curl -X POST http://localhost:3000/api/fleet/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle": {
      "make": "Tesla",
      "model": "Model 3",
      "year": 2024,
      "type": "sedan",
      "status": "active",
      "mileage": 100,
      "vin": "5YJ3E1EA1KF123456",
      "licensePlate": "TESLA-01",
      "fuelType": "electric"
    }
  }'
```

### Add a New Driver
```bash
curl -X POST http://localhost:3000/api/fleet/drivers \
  -H "Content-Type: application/json" \
  -d '{
    "driver": {
      "name": "Alice Cooper",
      "email": "alice.cooper@fleet.com",
      "phone": "+1-555-0105",
      "licenseNumber": "DL555666777",
      "licenseExpiry": "2027-06-15",
      "status": "active"
    }
  }'
```

### Get Fleet Analytics
```bash
# Fleet performance
curl http://localhost:3000/api/fleet/analytics?type=fleet-performance

# Compliance report
curl http://localhost:3000/api/fleet/analytics?type=compliance
```

## 🎨 UI Features

### Color-Coded Status
- **Green**: Active/Compliant
- **Yellow**: Maintenance/Expiring Soon
- **Red**: Inactive/Expired
- **Gray**: Neutral/Unknown

### Visual Indicators
- 🚗 Vehicles with detailed info
- 👨‍✈️ Drivers with avatar initials
- ⚠️ Warning badges for expiring documents
- 📊 Bar charts for analytics

### Responsive Design
- Works on desktop, tablet, and mobile
- Dark mode support
- Tailwind CSS styling

## 🔍 Troubleshooting

### Issue: "No data showing on dashboard"
**Solution**: Initialize sample data first:
```bash
curl -X POST http://localhost:3000/api/fleet/init
```

### Issue: "Build errors"
**Solution**: Make sure dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Port 3000 already in use"
**Solution**: Use a different port:
```bash
PORT=3001 npm run dev
```

## 📱 Next Steps

1. **Explore all pages** - Navigate through dashboard, vehicles, drivers, and analytics
2. **Test filtering** - Try different status filters and search functions
3. **Check compliance** - Look for expiring documents in the analytics page
4. **Add custom data** - Use the API to add your own vehicles and drivers
5. **Review analytics** - Understand the performance metrics and cost analysis

## 📚 Learn More

- [Complete Documentation](FLEET_MANAGEMENT.md) - Full feature documentation
- [API Reference](FLEET_MANAGEMENT.md#api-documentation) - All API endpoints
- [Architecture Guide](FLEET_MANAGEMENT.md#architecture) - System design and structure

## 💡 Tips

- **Refresh data**: Reinitialize sample data anytime by calling `/api/fleet/init` again
- **Browser DevTools**: Use console to see API responses and debug
- **Dark Mode**: Toggle your system theme to see dark mode
- **Mobile View**: Resize browser or use device emulation to test responsive design

## 🚀 Production Deployment

When ready to deploy:

```bash
# Build for production
npm run build

# Start production server
npm start
```

For production environments, consider:
- Setting up a real database (PostgreSQL, MongoDB)
- Adding authentication (NextAuth.js)
- Implementing proper environment variables
- Setting up monitoring and logging
- Configuring CI/CD pipelines

Enjoy managing your fleet! 🎉
