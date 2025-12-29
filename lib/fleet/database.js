/**
 * Fleet Management Database Schema and Operations
 * Handles all database operations for the fleet management system
 */

class FleetDatabase {
  constructor() {
    this.vehicles = new Map();
    this.drivers = new Map();
    this.maintenance = new Map();
    this.trips = new Map();
    this.alerts = new Map();
  }

  // Vehicle Operations
  addVehicle(vehicle) {
    const id = vehicle.id || this.generateId();
    this.vehicles.set(id, {
      id,
      ...vehicle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return id;
  }

  getVehicle(id) {
    return this.vehicles.get(id);
  }

  getAllVehicles() {
    return Array.from(this.vehicles.values());
  }

  updateVehicle(id, updates) {
    const vehicle = this.vehicles.get(id);
    if (!vehicle) return null;
    
    this.vehicles.set(id, {
      ...vehicle,
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    return this.vehicles.get(id);
  }

  deleteVehicle(id) {
    return this.vehicles.delete(id);
  }

  // Driver Operations
  addDriver(driver) {
    const id = driver.id || this.generateId();
    this.drivers.set(id, {
      id,
      ...driver,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return id;
  }

  getDriver(id) {
    return this.drivers.get(id);
  }

  getAllDrivers() {
    return Array.from(this.drivers.values());
  }

  updateDriver(id, updates) {
    const driver = this.drivers.get(id);
    if (!driver) return null;
    
    this.drivers.set(id, {
      ...driver,
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    return this.drivers.get(id);
  }

  // Maintenance Operations
  addMaintenance(maintenance) {
    const id = maintenance.id || this.generateId();
    this.maintenance.set(id, {
      id,
      ...maintenance,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return id;
  }

  getMaintenanceByVehicle(vehicleId) {
    return Array.from(this.maintenance.values()).filter(
      m => m.vehicleId === vehicleId
    );
  }

  getAllMaintenance() {
    return Array.from(this.maintenance.values());
  }

  // Trip Operations
  addTrip(trip) {
    const id = trip.id || this.generateId();
    this.trips.set(id, {
      id,
      ...trip,
      createdAt: new Date().toISOString(),
    });
    return id;
  }

  getTripsByVehicle(vehicleId) {
    return Array.from(this.trips.values()).filter(
      t => t.vehicleId === vehicleId
    );
  }

  getTripsByDriver(driverId) {
    return Array.from(this.trips.values()).filter(
      t => t.driverId === driverId
    );
  }

  // Alert Operations
  addAlert(alert) {
    const id = alert.id || this.generateId();
    this.alerts.set(id, {
      id,
      ...alert,
      createdAt: new Date().toISOString(),
      resolved: false,
    });
    return id;
  }

  getActiveAlerts() {
    return Array.from(this.alerts.values()).filter(a => !a.resolved);
  }

  resolveAlert(id) {
    const alert = this.alerts.get(id);
    if (!alert) return null;
    
    alert.resolved = true;
    alert.resolvedAt = new Date().toISOString();
    this.alerts.set(id, alert);
    return alert;
  }

  // Utility Methods
  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Analytics
  getFleetStats() {
    const vehicles = this.getAllVehicles();
    const drivers = this.getAllDrivers();
    const activeAlerts = this.getActiveAlerts();
    const maintenance = this.getAllMaintenance();

    return {
      totalVehicles: vehicles.length,
      activeVehicles: vehicles.filter(v => v.status === 'active').length,
      totalDrivers: drivers.length,
      activeDrivers: drivers.filter(d => d.status === 'active').length,
      pendingMaintenance: maintenance.filter(m => m.status === 'pending').length,
      activeAlerts: activeAlerts.length,
      vehiclesByType: this.groupByType(vehicles),
      vehiclesByStatus: this.groupByStatus(vehicles),
    };
  }

  groupByType(vehicles) {
    return vehicles.reduce((acc, vehicle) => {
      acc[vehicle.type] = (acc[vehicle.type] || 0) + 1;
      return acc;
    }, {});
  }

  groupByStatus(vehicles) {
    return vehicles.reduce((acc, vehicle) => {
      acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
      return acc;
    }, {});
  }
}

// Singleton instance
let dbInstance = null;

export function getFleetDB() {
  if (!dbInstance) {
    dbInstance = new FleetDatabase();
  }
  return dbInstance;
}

export default FleetDatabase;
