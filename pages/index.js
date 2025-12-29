import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Index() {
  const [activeVehicle, setActiveVehicle] = useState(0);
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeTrips: 0,
    fuelSaved: 0,
    co2Reduced: 0
  });

  useEffect(() => {
    // Animate stats on load
    const timer = setTimeout(() => {
      setStats({
        totalVehicles: 247,
        activeTrips: 83,
        fuelSaved: 12450,
        co2Reduced: 34.2
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const vehicles = [
    { id: 1, type: 'Delivery Van', status: 'Active', location: 'Downtown', fuel: 78, driver: 'John Smith' },
    { id: 2, type: 'Cargo Truck', status: 'Active', location: 'Highway 101', fuel: 62, driver: 'Sarah Johnson' },
    { id: 3, type: 'Service Vehicle', status: 'Idle', location: 'Warehouse A', fuel: 95, driver: 'Mike Wilson' },
  ];

  const features = [
    { icon: '🚗', title: 'Real-Time Tracking', description: 'Monitor your entire fleet in real-time with GPS precision' },
    { icon: '📊', title: 'Analytics Dashboard', description: 'Comprehensive insights on fuel efficiency and performance' },
    { icon: '🔧', title: 'Maintenance Alerts', description: 'Proactive maintenance scheduling to minimize downtime' },
    { icon: '💰', title: 'Cost Optimization', description: 'Reduce operational costs with smart route planning' },
    { icon: '🛡️', title: 'Safety First', description: 'Driver behavior monitoring and safety compliance tracking' },
    { icon: '📱', title: 'Mobile Access', description: 'Manage your fleet from anywhere with our mobile app' },
  ];

  return (
    <>
      <Head>
        <title>FleetManager Pro - Smart Fleet Management Solution</title>
        <meta name="description" content="Modern fleet management system for businesses" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
        {/* Navigation */}
        <nav className="backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="text-3xl">🚛</div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  FleetManager Pro
                </span>
              </div>
              <div className="hidden md:flex space-x-8">
                <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
                <a href="#hero" className="hover:text-blue-400 transition-colors">Fleet</a>
                <a href="#analytics" className="hover:text-blue-400 transition-colors">Analytics</a>
                <a href="#cta" className="hover:text-blue-400 transition-colors">Contact</a>
              </div>
              <div className="flex space-x-4">
                <button 
                  className="px-4 py-2 rounded-lg border border-blue-400 hover:bg-blue-400/10 transition-all"
                  onClick={() => window.location.href = '/login'}
                  aria-label="Sign in to your account"
                >
                  Sign In
                </button>
                <button 
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/50"
                  onClick={() => window.location.href = '/signup'}
                  aria-label="Start your free trial"
                >
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Manage Your Fleet
                  <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                    With Intelligence
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Transform your fleet operations with cutting-edge technology. 
                  Real-time tracking, predictive maintenance, and powerful analytics 
                  all in one platform.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all shadow-2xl shadow-blue-500/50 text-lg font-semibold transform hover:scale-105"
                    onClick={() => window.location.href = '/signup'}
                    aria-label="Get started with free trial"
                  >
                    Get Started Free
                  </button>
                  <button 
                    className="px-8 py-4 rounded-xl border-2 border-white/20 hover:bg-white/10 transition-all text-lg font-semibold"
                    onClick={() => window.location.href = '/demo'}
                    aria-label="Watch product demo"
                  >
                    Watch Demo
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Live Fleet Status</h3>
                    <span className="flex items-center space-x-2 text-green-400">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      <span className="text-sm">Live</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-4 border border-blue-400/30">
                      <div className="text-3xl font-bold text-blue-400">{stats.totalVehicles}</div>
                      <div className="text-sm text-gray-300 mt-1">Total Vehicles</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-4 border border-green-400/30">
                      <div className="text-3xl font-bold text-green-400">{stats.activeTrips}</div>
                      <div className="text-sm text-gray-300 mt-1">Active Trips</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-4 border border-purple-400/30">
                      <div className="text-3xl font-bold text-purple-400">{stats.fuelSaved.toLocaleString()}L</div>
                      <div className="text-sm text-gray-300 mt-1">Fuel Saved</div>
                    </div>
                    <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl p-4 border border-cyan-400/30">
                      <div className="text-3xl font-bold text-cyan-400">{stats.co2Reduced}T</div>
                      <div className="text-sm text-gray-300 mt-1">CO₂ Reduced</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {vehicles.map((vehicle, idx) => (
                      <div 
                        key={vehicle.id}
                        className={`p-3 rounded-lg transition-all cursor-pointer ${
                          activeVehicle === idx 
                            ? 'bg-blue-500/30 border border-blue-400/50' 
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                        onClick={() => setActiveVehicle(idx)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold">{vehicle.type}</div>
                            <div className="text-xs text-gray-400">{vehicle.driver}</div>
                          </div>
                          <div className="text-right">
                            <div className={`text-xs font-semibold ${
                              vehicle.status === 'Active' ? 'text-green-400' : 'text-yellow-400'
                            }`}>
                              {vehicle.status}
                            </div>
                            <div className="text-xs text-gray-400">Fuel: {vehicle.fuel}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Animated background elements */}
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 lg:py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Everything You Need to 
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Optimize Your Fleet
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Powerful features designed to streamline operations and boost efficiency
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div 
                  key={idx}
                  className="group backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition-all hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-2"
                >
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="analytics" className="py-20 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  10,000+
                </div>
                <div className="text-gray-300">Vehicles Managed</div>
              </div>
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  98.9%
                </div>
                <div className="text-gray-300">Uptime</div>
              </div>
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  2.5M+
                </div>
                <div className="text-gray-300">Miles Tracked</div>
              </div>
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                  40%
                </div>
                <div className="text-gray-300">Cost Reduction</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Ready to Transform Your Fleet?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of companies already optimizing their fleet operations
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                className="px-10 py-5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all shadow-2xl shadow-blue-500/50 text-xl font-semibold transform hover:scale-105"
                onClick={() => window.location.href = '/signup'}
                aria-label="Start your free trial"
              >
                Start Your Free Trial
              </button>
              <button 
                className="px-10 py-5 rounded-xl border-2 border-white/20 hover:bg-white/10 transition-all text-xl font-semibold"
                onClick={() => window.location.href = '/demo'}
                aria-label="Schedule a demo with our team"
              >
                Schedule a Demo
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="text-2xl">🚛</div>
                  <span className="text-xl font-bold">FleetManager Pro</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Smart fleet management for modern businesses
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#features" className="hover:text-blue-400 transition-colors">Features</a></li>
                  <li><a href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                  <li><a href="/api" className="hover:text-blue-400 transition-colors">API</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="/about" className="hover:text-blue-400 transition-colors">About</a></li>
                  <li><a href="/careers" className="hover:text-blue-400 transition-colors">Careers</a></li>
                  <li><a href="#cta" className="hover:text-blue-400 transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy</a></li>
                  <li><a href="/terms" className="hover:text-blue-400 transition-colors">Terms</a></li>
                  <li><a href="/security" className="hover:text-blue-400 transition-colors">Security</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
              <p>© 2024 FleetManager Pro. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
