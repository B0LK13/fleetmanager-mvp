/**
 * Fleet Management API - Vehicles Endpoint
 * GET /api/fleet/vehicles - Get all vehicles
 * POST /api/fleet/vehicles - Add new vehicle
 */

import { getFleetDB } from '../../../lib/fleet/database';

export default async function handler(req, res) {
  const db = getFleetDB();

  if (req.method === 'GET') {
    try {
      const vehicles = db.getAllVehicles();
      const stats = db.getFleetStats();
      
      res.status(200).json({
        success: true,
        data: {
          vehicles,
          stats,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { vehicle } = req.body;
      
      if (!vehicle || !vehicle.make || !vehicle.model) {
        return res.status(400).json({
          success: false,
          error: 'Vehicle make and model are required',
        });
      }

      const id = db.addVehicle(vehicle);
      const newVehicle = db.getVehicle(id);

      res.status(201).json({
        success: true,
        data: newVehicle,
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
