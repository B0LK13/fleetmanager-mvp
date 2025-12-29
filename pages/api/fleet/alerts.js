/**
 * Fleet Management API - Alerts Endpoint
 * GET /api/fleet/alerts - Get all active alerts
 * POST /api/fleet/alerts - Add new alert
 */

import { getFleetDB } from '../../../lib/fleet/database';

export default async function handler(req, res) {
  const db = getFleetDB();

  if (req.method === 'GET') {
    try {
      const alerts = db.getActiveAlerts();
      
      res.status(200).json({
        success: true,
        data: alerts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { alert } = req.body;
      
      if (!alert || !alert.type || !alert.message) {
        return res.status(400).json({
          success: false,
          error: 'Alert type and message are required',
        });
      }

      const id = db.addAlert(alert);
      const newAlert = db.alerts.get(id);

      res.status(201).json({
        success: true,
        data: newAlert,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  } else if (req.method === 'PATCH') {
    try {
      const { alertId } = req.body;
      
      if (!alertId) {
        return res.status(400).json({
          success: false,
          error: 'Alert ID is required',
        });
      }

      const resolvedAlert = db.resolveAlert(alertId);
      
      if (!resolvedAlert) {
        return res.status(404).json({
          success: false,
          error: 'Alert not found',
        });
      }

      res.status(200).json({
        success: true,
        data: resolvedAlert,
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
