/**
 * Fleet Management API - Analytics Endpoint
 * GET /api/fleet/analytics - Get fleet analytics
 */

import { getFleetDB } from '../../../lib/fleet/database';
import { FleetAnalytics } from '../../../lib/fleet/analytics';

export default async function handler(req, res) {
  const db = getFleetDB();
  const analytics = new FleetAnalytics(db);

  if (req.method === 'GET') {
    try {
      const { vehicleId, driverId, type } = req.query;

      let result;

      switch (type) {
        case 'fuel-efficiency':
          if (!vehicleId) {
            return res.status(400).json({
              success: false,
              error: 'vehicleId is required for fuel efficiency analysis',
            });
          }
          result = analytics.calculateFuelEfficiency(vehicleId);
          break;

        case 'maintenance-costs':
          if (!vehicleId) {
            return res.status(400).json({
              success: false,
              error: 'vehicleId is required for maintenance costs analysis',
            });
          }
          result = analytics.calculateMaintenanceCosts(vehicleId);
          break;

        case 'driver-score':
          if (!driverId) {
            return res.status(400).json({
              success: false,
              error: 'driverId is required for driver score analysis',
            });
          }
          result = analytics.calculateDriverScore(driverId);
          break;

        case 'vehicle-utilization':
          if (!vehicleId) {
            return res.status(400).json({
              success: false,
              error: 'vehicleId is required for vehicle utilization analysis',
            });
          }
          result = analytics.calculateVehicleUtilization(vehicleId);
          break;

        case 'cost-per-mile':
          if (!vehicleId) {
            return res.status(400).json({
              success: false,
              error: 'vehicleId is required for cost per mile analysis',
            });
          }
          result = analytics.calculateCostPerMile(vehicleId);
          break;

        case 'predictive-maintenance':
          if (!vehicleId) {
            return res.status(400).json({
              success: false,
              error: 'vehicleId is required for predictive maintenance',
            });
          }
          result = analytics.predictMaintenanceNeeds(vehicleId);
          break;

        case 'fleet-performance':
          result = analytics.getFleetPerformanceMetrics();
          break;

        case 'compliance':
          result = analytics.generateComplianceReport();
          break;

        default:
          // Return all fleet analytics
          result = {
            fleetPerformance: analytics.getFleetPerformanceMetrics(),
            compliance: analytics.generateComplianceReport(),
          };
      }

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  } else {
    res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }
}
