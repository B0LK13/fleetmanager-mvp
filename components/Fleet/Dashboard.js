/**
 * Fleet Dashboard Component
 * Main dashboard showing fleet overview and statistics
 */

import { useState, useEffect } from 'react';

export default function FleetDashboard() {
  const [stats, setStats] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFleetData();
  }, []);

  const fetchFleetData = async () => {
    try {
      setLoading(true);
      
      // Fetch vehicles and stats
      const vehiclesRes = await fetch('/api/fleet/vehicles');
      const vehiclesData = await vehiclesRes.json();
      
      if (vehiclesData.success) {
        setVehicles(vehiclesData.data.vehicles);
        setStats(vehiclesData.data.stats);
      }

      // Fetch alerts
      const alertsRes = await fetch('/api/fleet/alerts');
      const alertsData = await alertsRes.json();
      
      if (alertsData.success) {
        setAlerts(alertsData.data);
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading fleet data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Fleet Management Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive fleet monitoring and analytics
          </p>
        </div>

        {/* Alert Banner */}
        {alerts.length > 0 && (
          <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  {alerts.length} Active Alert{alerts.length !== 1 ? 's' : ''}
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Vehicles"
            value={stats?.totalVehicles || 0}
            subtitle={`${stats?.activeVehicles || 0} active`}
            icon="🚗"
            color="blue"
          />
          <StatCard
            title="Total Drivers"
            value={stats?.totalDrivers || 0}
            subtitle={`${stats?.activeDrivers || 0} active`}
            icon="👨‍✈️"
            color="green"
          />
          <StatCard
            title="Pending Maintenance"
            value={stats?.pendingMaintenance || 0}
            subtitle="items scheduled"
            icon="🔧"
            color="yellow"
          />
          <StatCard
            title="Active Alerts"
            value={stats?.activeAlerts || 0}
            subtitle="require attention"
            icon="⚠️"
            color="red"
          />
        </div>

        {/* Vehicle Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Vehicles by Status
            </h2>
            <div className="space-y-3">
              {stats?.vehiclesByStatus && Object.entries(stats.vehiclesByStatus).map(([status, count]) => (
                <div key={status} className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300 capitalize">
                    {status}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Vehicles by Type
            </h2>
            <div className="space-y-3">
              {stats?.vehiclesByType && Object.entries(stats.vehiclesByType).map(([type, count]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300 capitalize">
                    {type}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Vehicles */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Fleet Vehicles
          </h2>
          {vehicles.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No vehicles in the fleet yet. Add your first vehicle to get started.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Mileage
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {vehicles.slice(0, 10).map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {vehicle.make} {vehicle.model}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {vehicle.year}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {vehicle.type || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          vehicle.status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}>
                          {vehicle.status || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {vehicle.mileage ? `${vehicle.mileage.toLocaleString()} mi` : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  };

  return (
    <div className={`${colorClasses[color]} border rounded-lg p-6`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
        {value}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}
