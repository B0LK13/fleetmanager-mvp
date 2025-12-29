/**
 * Analytics Page
 * Comprehensive fleet analytics and insights
 */

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import AnalyticsChart from '../components/Fleet/AnalyticsChart';

export default function AnalyticsPage() {
  const [fleetPerformance, setFleetPerformance] = useState(null);
  const [compliance, setCompliance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Fetch fleet performance
      const perfRes = await fetch('/api/fleet/analytics?type=fleet-performance');
      const perfData = await perfRes.json();
      if (perfData.success) {
        setFleetPerformance(perfData.data);
      }

      // Fetch compliance
      const compRes = await fetch('/api/fleet/analytics?type=compliance');
      const compData = await compRes.json();
      if (compData.success) {
        setCompliance(compData.data);
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading analytics...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-red-600">Error: {error}</div>
        </div>
      </Layout>
    );
  }

  // Prepare chart data
  const performanceData = fleetPerformance
    ? [
        { label: 'Total Vehicles', value: fleetPerformance.totalVehicles },
        { label: 'Active Vehicles', value: fleetPerformance.activeVehicles },
        { label: 'Total Drivers', value: fleetPerformance.totalDrivers },
        { label: 'Trips Completed', value: fleetPerformance.tripsCompleted },
      ]
    : [];

  const costData = fleetPerformance
    ? [
        {
          label: 'Total Distance',
          value: Math.round(fleetPerformance.totalDistance),
          unit: 'mi',
        },
        {
          label: 'Total Fuel Cost',
          value: Math.round(fleetPerformance.totalFuelCost),
          unit: '$',
        },
        {
          label: 'Avg Cost Per Mile',
          value: Math.round(fleetPerformance.avgCostPerMile * 100) / 100,
          unit: '$/mi',
        },
      ]
    : [];

  const complianceData = compliance
    ? [
        {
          label: 'Compliant Vehicles',
          value: compliance.vehicles.compliant,
        },
        {
          label: 'Non-Compliant Vehicles',
          value: compliance.vehicles.nonCompliant,
        },
        {
          label: 'Compliant Drivers',
          value: compliance.drivers.compliant,
        },
        {
          label: 'Non-Compliant Drivers',
          value: compliance.drivers.nonCompliant,
        },
      ]
    : [];

  return (
    <Layout>
      <Head>
        <title>Analytics - Fleet Management</title>
        <meta name="description" content="Fleet analytics and insights" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Fleet Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive insights and performance metrics
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Distance"
              value={fleetPerformance?.totalDistance || 0}
              unit="miles"
              icon="🛣️"
              color="blue"
            />
            <MetricCard
              title="Total Fuel Cost"
              value={`$${Math.round(fleetPerformance?.totalFuelCost || 0)}`}
              icon="⛽"
              color="green"
            />
            <MetricCard
              title="Avg Driver Score"
              value={Math.round(fleetPerformance?.avgDriverScore || 0)}
              unit="/100"
              icon="⭐"
              color="yellow"
            />
            <MetricCard
              title="Trips Completed"
              value={fleetPerformance?.tripsCompleted || 0}
              icon="📍"
              color="purple"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <AnalyticsChart title="Fleet Overview" data={performanceData} />
            <AnalyticsChart title="Cost Analysis" data={costData} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <AnalyticsChart title="Compliance Status" data={complianceData} />
            
            {/* Compliance Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Compliance Issues
              </h3>
              
              {compliance && (
                <div className="space-y-4">
                  {/* Vehicle Issues */}
                  {compliance.vehicles.issues.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Vehicle Issues
                      </h4>
                      <div className="space-y-2">
                        {compliance.vehicles.issues.map((issue, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm"
                          >
                            <p className="text-red-800 dark:text-red-200 font-medium">
                              Vehicle {issue.vehicleId}
                            </p>
                            <ul className="list-disc list-inside text-red-700 dark:text-red-300">
                              {issue.issues.map((i, iIdx) => (
                                <li key={iIdx}>{i}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Driver Issues */}
                  {compliance.drivers.issues.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Driver Issues
                      </h4>
                      <div className="space-y-2">
                        {compliance.drivers.issues.map((issue, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm"
                          >
                            <p className="text-red-800 dark:text-red-200 font-medium">
                              Driver {issue.driverId}
                            </p>
                            <ul className="list-disc list-inside text-red-700 dark:text-red-300">
                              {issue.issues.map((i, iIdx) => (
                                <li key={iIdx}>{i}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {compliance.vehicles.issues.length === 0 &&
                    compliance.drivers.issues.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-green-600 dark:text-green-400 font-medium">
                          ✓ All compliance checks passed
                        </p>
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              Performance Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {Math.round((fleetPerformance?.avgCostPerMile || 0) * 100) / 100}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cost Per Mile ($)
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {Math.round(
                    ((fleetPerformance?.activeVehicles || 0) /
                      (fleetPerformance?.totalVehicles || 1)) *
                      100
                  )}
                  %
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Vehicle Utilization
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {Math.round(fleetPerformance?.avgDriverScore || 0)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Average Driver Score
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function MetricCard({ title, value, unit, icon, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    yellow:
      'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    purple:
      'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
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
        {unit && <span className="text-lg text-gray-500 ml-1">{unit}</span>}
      </div>
    </div>
  );
}
