/**
 * Fleet Management API - Initialize Sample Data
 * POST /api/fleet/init - Initialize sample fleet data
 */

import initializeSampleData from '../../../lib/fleet/sampleData';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const result = initializeSampleData();
      
      res.status(200).json({
        success: true,
        message: 'Sample fleet data initialized successfully',
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
