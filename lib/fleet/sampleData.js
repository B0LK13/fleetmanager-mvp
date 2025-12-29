/**
 * Fleet Data Initializer
 * Creates sample data for testing and demonstration
 */

import { getFleetDB } from './database';

export function initializeSampleData() {
  const db = getFleetDB();

  // Sample Vehicles
  const vehicles = [
    {
      make: 'Ford',
      model: 'Transit',
      year: 2022,
      type: 'van',
      status: 'active',
      mileage: 15420,
      vin: '1FTYE1YM8MKA12345',
      licensePlate: 'ABC-1234',
      registrationExpiry: '2025-06-15',
      insuranceExpiry: '2025-03-20',
      fuelType: 'diesel',
    },
    {
      make: 'Chevrolet',
      model: 'Silverado',
      year: 2021,
      type: 'truck',
      status: 'active',
      mileage: 32150,
      vin: '1GCUYEED3MZ123456',
      licensePlate: 'XYZ-5678',
      registrationExpiry: '2025-08-10',
      insuranceExpiry: '2025-04-15',
      fuelType: 'gasoline',
    },
    {
      make: 'Mercedes-Benz',
      model: 'Sprinter',
      year: 2023,
      type: 'van',
      status: 'active',
      mileage: 8900,
      vin: 'WD3PE8CC5P5123456',
      licensePlate: 'DEF-9012',
      registrationExpiry: '2026-01-05',
      insuranceExpiry: '2025-12-01',
      fuelType: 'diesel',
    },
    {
      make: 'Toyota',
      model: 'Tacoma',
      year: 2020,
      type: 'truck',
      status: 'maintenance',
      mileage: 45670,
      vin: '3TMCZ5AN6LM123456',
      licensePlate: 'GHI-3456',
      registrationExpiry: '2025-05-20',
      insuranceExpiry: '2025-02-28',
      fuelType: 'gasoline',
    },
    {
      make: 'Ram',
      model: 'ProMaster',
      year: 2022,
      type: 'van',
      status: 'active',
      mileage: 22300,
      vin: '3C6TRVPG5NE123456',
      licensePlate: 'JKL-7890',
      registrationExpiry: '2025-09-15',
      insuranceExpiry: '2025-07-10',
      fuelType: 'diesel',
    },
  ];

  vehicles.forEach(vehicle => db.addVehicle(vehicle));

  // Sample Drivers
  const drivers = [
    {
      name: 'John Smith',
      email: 'john.smith@fleet.com',
      phone: '+1-555-0101',
      licenseNumber: 'DL123456789',
      licenseExpiry: '2026-04-15',
      status: 'active',
      hireDate: '2020-03-15',
    },
    {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@fleet.com',
      phone: '+1-555-0102',
      licenseNumber: 'DL987654321',
      licenseExpiry: '2025-11-20',
      status: 'active',
      hireDate: '2019-07-22',
    },
    {
      name: 'Michael Brown',
      email: 'michael.brown@fleet.com',
      phone: '+1-555-0103',
      licenseNumber: 'DL456789123',
      licenseExpiry: '2026-01-10',
      status: 'active',
      hireDate: '2021-01-10',
    },
    {
      name: 'Emily Davis',
      email: 'emily.davis@fleet.com',
      phone: '+1-555-0104',
      licenseNumber: 'DL789123456',
      licenseExpiry: '2025-08-05',
      status: 'active',
      hireDate: '2020-09-01',
    },
  ];

  drivers.forEach(driver => db.addDriver(driver));

  // Sample Maintenance Records
  const vehicleIds = db.getAllVehicles().map(v => v.id);
  
  if (vehicleIds.length > 0) {
    const maintenanceRecords = [
      {
        vehicleId: vehicleIds[0],
        type: 'oil_change',
        description: 'Regular oil change and filter replacement',
        cost: 89.99,
        mileage: 15000,
        status: 'completed',
        completedDate: '2024-11-15',
      },
      {
        vehicleId: vehicleIds[1],
        type: 'tire_rotation',
        description: 'Tire rotation and balance',
        cost: 65.00,
        mileage: 30000,
        status: 'completed',
        completedDate: '2024-10-20',
      },
      {
        vehicleId: vehicleIds[3],
        type: 'brake_service',
        description: 'Brake pad replacement - front and rear',
        cost: 425.00,
        mileage: 45000,
        status: 'pending',
        scheduledDate: '2025-01-15',
      },
      {
        vehicleId: vehicleIds[2],
        type: 'inspection',
        description: 'Annual safety inspection',
        cost: 45.00,
        mileage: 8500,
        status: 'completed',
        completedDate: '2024-12-01',
      },
    ];

    maintenanceRecords.forEach(record => db.addMaintenance(record));
  }

  // Sample Trips
  const driverIds = db.getAllDrivers().map(d => d.id);
  
  if (vehicleIds.length > 0 && driverIds.length > 0) {
    const trips = [
      {
        vehicleId: vehicleIds[0],
        driverId: driverIds[0],
        startLocation: 'Warehouse A',
        endLocation: 'Customer Site 1',
        distance: 45.5,
        duration: 1.2,
        fuelUsed: 2.3,
        fuelCost: 8.50,
        fuelEfficiency: 19.8,
        onTime: true,
        hasIncident: false,
      },
      {
        vehicleId: vehicleIds[1],
        driverId: driverIds[1],
        startLocation: 'Warehouse B',
        endLocation: 'Customer Site 2',
        distance: 78.2,
        duration: 2.1,
        fuelUsed: 4.1,
        fuelCost: 15.20,
        fuelEfficiency: 19.1,
        onTime: true,
        hasIncident: false,
      },
      {
        vehicleId: vehicleIds[2],
        driverId: driverIds[2],
        startLocation: 'Depot',
        endLocation: 'Distribution Center',
        distance: 120.5,
        duration: 3.5,
        fuelUsed: 5.8,
        fuelCost: 21.50,
        fuelEfficiency: 20.8,
        onTime: false,
        hasIncident: false,
      },
    ];

    trips.forEach(trip => db.addTrip(trip));
  }

  // Sample Alerts
  const alerts = [
    {
      type: 'maintenance',
      severity: 'high',
      message: 'Vehicle due for oil change',
      vehicleId: vehicleIds[0],
    },
    {
      type: 'compliance',
      severity: 'medium',
      message: 'Driver license expiring in 30 days',
      driverId: driverIds[1],
    },
  ];

  alerts.forEach(alert => db.addAlert(alert));

  console.log('Sample fleet data initialized successfully!');
  console.log(`- ${vehicles.length} vehicles added`);
  console.log(`- ${drivers.length} drivers added`);
  console.log(`- Maintenance records and trips created`);
  console.log(`- ${alerts.length} alerts generated`);

  return {
    vehicleCount: vehicles.length,
    driverCount: drivers.length,
    alertCount: alerts.length,
  };
}

export default initializeSampleData;
