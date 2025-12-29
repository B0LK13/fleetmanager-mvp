/**
 * Fleet Management API - Drivers Endpoint
 * GET /api/fleet/drivers - Get all drivers
 * POST /api/fleet/drivers - Add new driver
 */

import { getFleetDB } from '../../../lib/fleet/database';

export default async function handler(req, res) {
  const db = getFleetDB();

  if (req.method === 'GET') {
    try {
      const drivers = db.getAllDrivers();
      
      res.status(200).json({
        success: true,
        data: drivers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { driver } = req.body;
      
      if (!driver || !driver.name) {
        return res.status(400).json({
          success: false,
          error: 'Driver name is required',
        });
      }

      const id = db.addDriver(driver);
      const newDriver = db.getDriver(id);

      res.status(201).json({
        success: true,
        data: newDriver,
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
