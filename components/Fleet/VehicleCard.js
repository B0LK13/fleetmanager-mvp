/**
 * Vehicle Card Component
 * Displays detailed information about a single vehicle
 */

export default function VehicleCard({ vehicle, onClick }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
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

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {vehicle.year} • {vehicle.licensePlate}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            vehicle.status
          )}`}
        >
          {vehicle.status}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">VIN:</span>
          <span className="text-gray-900 dark:text-white font-mono text-xs">
            {vehicle.vin}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Mileage:</span>
          <span className="text-gray-900 dark:text-white">
            {vehicle.mileage ? `${vehicle.mileage.toLocaleString()} mi` : 'N/A'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Type:</span>
          <span className="text-gray-900 dark:text-white capitalize">
            {vehicle.type || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Fuel:</span>
          <span className="text-gray-900 dark:text-white capitalize">
            {vehicle.fuelType || 'N/A'}
          </span>
        </div>
      </div>

      {/* Expiry Warnings */}
      <div className="space-y-2">
        {vehicle.registrationExpiry && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400">Registration:</span>
            <span
              className={`${
                isExpired(vehicle.registrationExpiry)
                  ? 'text-red-600 dark:text-red-400 font-semibold'
                  : isExpiringSoon(vehicle.registrationExpiry)
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {new Date(vehicle.registrationExpiry).toLocaleDateString()}
            </span>
          </div>
        )}
        {vehicle.insuranceExpiry && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400">Insurance:</span>
            <span
              className={`${
                isExpired(vehicle.insuranceExpiry)
                  ? 'text-red-600 dark:text-red-400 font-semibold'
                  : isExpiringSoon(vehicle.insuranceExpiry)
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {new Date(vehicle.insuranceExpiry).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Warnings */}
      {(isExpired(vehicle.registrationExpiry) || isExpired(vehicle.insuranceExpiry)) && (
        <div className="mt-4 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-xs text-red-800 dark:text-red-200">
          ⚠️ Expired documents require attention
        </div>
      )}
      {(isExpiringSoon(vehicle.registrationExpiry) ||
        isExpiringSoon(vehicle.insuranceExpiry)) &&
        !isExpired(vehicle.registrationExpiry) &&
        !isExpired(vehicle.insuranceExpiry) && (
          <div className="mt-4 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-xs text-yellow-800 dark:text-yellow-200">
            ⏰ Documents expiring soon
          </div>
        )}
    </div>
  );
}
