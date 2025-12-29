/**
 * Driver Card Component
 * Displays detailed information about a single driver
 */

export default function DriverCard({ driver, onClick }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'suspended':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  const isExpiringSoon = (dateString) => {
    if (!dateString) return false;
    const expiryDate = new Date(dateString);
    const today = new Date();
    const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
  };

  const isExpired = (dateString) => {
    if (!dateString) return false;
    const expiryDate = new Date(dateString);
    const today = new Date();
    return expiryDate < today;
  };

  const getYearsOfService = (hireDate) => {
    if (!hireDate) return 0;
    const today = new Date();
    const hired = new Date(hireDate);
    return Math.floor((today - hired) / (1000 * 60 * 60 * 24 * 365));
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
            {driver.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {driver.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {driver.email}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            driver.status
          )}`}
        >
          {driver.status}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Phone:</span>
          <span className="text-gray-900 dark:text-white">
            {driver.phone || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">License:</span>
          <span className="text-gray-900 dark:text-white font-mono text-xs">
            {driver.licenseNumber || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Experience:</span>
          <span className="text-gray-900 dark:text-white">
            {getYearsOfService(driver.hireDate)} years
          </span>
        </div>
      </div>

      {/* License Expiry */}
      {driver.licenseExpiry && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400">License Expiry:</span>
            <span
              className={`${
                isExpired(driver.licenseExpiry)
                  ? 'text-red-600 dark:text-red-400 font-semibold'
                  : isExpiringSoon(driver.licenseExpiry)
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {new Date(driver.licenseExpiry).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}

      {/* Warnings */}
      {isExpired(driver.licenseExpiry) && (
        <div className="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-xs text-red-800 dark:text-red-200">
          ⚠️ License expired - driver cannot operate
        </div>
      )}
      {isExpiringSoon(driver.licenseExpiry) && !isExpired(driver.licenseExpiry) && (
        <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-xs text-yellow-800 dark:text-yellow-200">
          ⏰ License expiring soon
        </div>
      )}
    </div>
  );
}
