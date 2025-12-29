/**
 * Analytics Chart Component
 * Displays various analytics visualizations
 */

export default function AnalyticsChart({ title, data, type = 'bar' }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No data available
        </p>
      </div>
    );
  }

  // Simple bar chart visualization
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
        {title}
      </h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item.label}
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {item.value.toLocaleString()}
                {item.unit && ` ${item.unit}`}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
