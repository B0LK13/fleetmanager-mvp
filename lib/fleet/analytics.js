/**
 * Fleet Analytics Engine
 * Provides advanced analytics and insights for fleet operations
 */

export class FleetAnalytics {
  constructor(db) {
    this.db = db;
  }

  /**
   * Calculate fuel efficiency metrics
   */
  calculateFuelEfficiency(vehicleId, timeRange = 30) {
    const trips = this.db.getTripsByVehicle(vehicleId);
    const recentTrips = this.filterByTimeRange(trips, timeRange);
    
    if (recentTrips.length === 0) return null;

    const totalDistance = recentTrips.reduce((sum, trip) => sum + (trip.distance || 0), 0);
    const totalFuel = recentTrips.reduce((sum, trip) => sum + (trip.fuelUsed || 0), 0);

    return {
      averageMPG: totalFuel > 0 ? totalDistance / totalFuel : 0,
      totalDistance,
      totalFuel,
      tripCount: recentTrips.length,
    };
  }

  /**
   * Calculate maintenance costs
   */
  calculateMaintenanceCosts(vehicleId, timeRange = 365) {
    const maintenance = this.db.getMaintenanceByVehicle(vehicleId);
    const recentMaintenance = this.filterByTimeRange(maintenance, timeRange);

    const totalCost = recentMaintenance.reduce((sum, m) => sum + (m.cost || 0), 0);
    const averageCost = recentMaintenance.length > 0 
      ? totalCost / recentMaintenance.length 
      : 0;

    return {
      totalCost,
      averageCost,
      maintenanceCount: recentMaintenance.length,
      costPerDay: totalCost / timeRange,
    };
  }

  /**
   * Driver performance scoring
   */
  calculateDriverScore(driverId) {
    const trips = this.db.getTripsByDriver(driverId);
    
    if (trips.length === 0) return 0;

    let score = 100;
    
    // Factor in safety incidents
    const incidents = trips.filter(t => t.hasIncident).length;
    score -= incidents * 10;

    // Factor in fuel efficiency
    const avgFuelEfficiency = trips.reduce((sum, t) => sum + (t.fuelEfficiency || 0), 0) / trips.length;
    if (avgFuelEfficiency > 30) score += 10;
    if (avgFuelEfficiency < 20) score -= 10;

    // Factor in on-time performance
    const onTimeTrips = trips.filter(t => t.onTime).length;
    const onTimePercentage = (onTimeTrips / trips.length) * 100;
    if (onTimePercentage > 90) score += 10;
    if (onTimePercentage < 70) score -= 10;

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Vehicle utilization analysis
   */
  calculateVehicleUtilization(vehicleId, timeRange = 30) {
    const trips = this.db.getTripsByVehicle(vehicleId);
    const recentTrips = this.filterByTimeRange(trips, timeRange);

    const totalHours = timeRange * 24;
    const usedHours = recentTrips.reduce((sum, trip) => {
      const duration = trip.duration || 0; // in hours
      return sum + duration;
    }, 0);

    const utilizationRate = (usedHours / totalHours) * 100;

    return {
      utilizationRate,
      totalHours,
      usedHours,
      idleHours: totalHours - usedHours,
      tripCount: recentTrips.length,
    };
  }

  /**
   * Cost per mile/km analysis
   */
  calculateCostPerMile(vehicleId, timeRange = 365) {
    const trips = this.db.getTripsByVehicle(vehicleId);
    const maintenance = this.db.getMaintenanceByVehicle(vehicleId);
    
    const recentTrips = this.filterByTimeRange(trips, timeRange);
    const recentMaintenance = this.filterByTimeRange(maintenance, timeRange);

    const totalDistance = recentTrips.reduce((sum, t) => sum + (t.distance || 0), 0);
    const fuelCost = recentTrips.reduce((sum, t) => sum + (t.fuelCost || 0), 0);
    const maintenanceCost = recentMaintenance.reduce((sum, m) => sum + (m.cost || 0), 0);
    const totalCost = fuelCost + maintenanceCost;

    return {
      costPerMile: totalDistance > 0 ? totalCost / totalDistance : 0,
      totalCost,
      fuelCost,
      maintenanceCost,
      totalDistance,
    };
  }

  /**
   * Predictive maintenance analysis
   */
  predictMaintenanceNeeds(vehicleId) {
    const vehicle = this.db.getVehicle(vehicleId);
    const maintenance = this.db.getMaintenanceByVehicle(vehicleId);
    const trips = this.db.getTripsByVehicle(vehicleId);

    if (!vehicle) return null;

    const predictions = [];
    const currentMileage = vehicle.mileage || 0;

    // Oil change prediction
    const lastOilChange = maintenance
      .filter(m => m.type === 'oil_change')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    
    if (lastOilChange) {
      const mileageSinceOilChange = currentMileage - (lastOilChange.mileage || 0);
      if (mileageSinceOilChange > 4500) {
        predictions.push({
          type: 'oil_change',
          urgency: 'high',
          estimatedMiles: 5000 - mileageSinceOilChange,
        });
      } else if (mileageSinceOilChange > 4000) {
        predictions.push({
          type: 'oil_change',
          urgency: 'medium',
          estimatedMiles: 5000 - mileageSinceOilChange,
        });
      }
    }

    // Tire rotation prediction
    const lastTireRotation = maintenance
      .filter(m => m.type === 'tire_rotation')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    
    if (lastTireRotation) {
      const mileageSinceTireRotation = currentMileage - (lastTireRotation.mileage || 0);
      if (mileageSinceTireRotation > 7000) {
        predictions.push({
          type: 'tire_rotation',
          urgency: 'medium',
          estimatedMiles: 8000 - mileageSinceTireRotation,
        });
      }
    }

    return predictions;
  }

  /**
   * Fleet-wide performance metrics
   */
  getFleetPerformanceMetrics() {
    const vehicles = this.db.getAllVehicles();
    const drivers = this.db.getAllDrivers();
    const trips = this.db.trips ? Array.from(this.db.trips.values()) : [];

    const totalDistance = trips.reduce((sum, t) => sum + (t.distance || 0), 0);
    const totalFuelCost = trips.reduce((sum, t) => sum + (t.fuelCost || 0), 0);
    const activeVehicles = vehicles.filter(v => v.status === 'active').length;

    const driverScores = drivers.map(d => this.calculateDriverScore(d.id));
    const avgDriverScore = driverScores.length > 0 
      ? driverScores.reduce((sum, s) => sum + s, 0) / driverScores.length 
      : 0;

    return {
      totalVehicles: vehicles.length,
      activeVehicles,
      totalDrivers: drivers.length,
      totalDistance,
      totalFuelCost,
      avgDriverScore,
      tripsCompleted: trips.length,
      avgCostPerMile: totalDistance > 0 ? totalFuelCost / totalDistance : 0,
    };
  }

  /**
   * Helper method to filter records by time range
   */
  filterByTimeRange(records, days) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return records.filter(record => {
      const recordDate = new Date(record.createdAt);
      return recordDate >= cutoffDate;
    });
  }

  /**
   * Generate compliance report
   */
  generateComplianceReport() {
    const vehicles = this.db.getAllVehicles();
    const drivers = this.db.getAllDrivers();
    
    const compliance = {
      vehicles: {
        total: vehicles.length,
        compliant: 0,
        nonCompliant: 0,
        issues: [],
      },
      drivers: {
        total: drivers.length,
        compliant: 0,
        nonCompliant: 0,
        issues: [],
      },
    };

    // Check vehicle compliance
    vehicles.forEach(vehicle => {
      const issues = [];
      
      if (vehicle.registrationExpiry) {
        const expiryDate = new Date(vehicle.registrationExpiry);
        const now = new Date();
        if (expiryDate < now) {
          issues.push('Expired registration');
        }
      }

      if (vehicle.insuranceExpiry) {
        const expiryDate = new Date(vehicle.insuranceExpiry);
        const now = new Date();
        if (expiryDate < now) {
          issues.push('Expired insurance');
        }
      }

      if (issues.length > 0) {
        compliance.vehicles.nonCompliant++;
        compliance.vehicles.issues.push({ vehicleId: vehicle.id, issues });
      } else {
        compliance.vehicles.compliant++;
      }
    });

    // Check driver compliance
    drivers.forEach(driver => {
      const issues = [];
      
      if (driver.licenseExpiry) {
        const expiryDate = new Date(driver.licenseExpiry);
        const now = new Date();
        if (expiryDate < now) {
          issues.push('Expired license');
        }
      }

      if (issues.length > 0) {
        compliance.drivers.nonCompliant++;
        compliance.drivers.issues.push({ driverId: driver.id, issues });
      } else {
        compliance.drivers.compliant++;
      }
    });

    return compliance;
  }
}

export default FleetAnalytics;
