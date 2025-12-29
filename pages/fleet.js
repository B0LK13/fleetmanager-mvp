/**
 * Fleet Management Page
 * Main entry point for fleet management system
 */

import Head from 'next/head';
import FleetDashboard from '../components/Fleet/Dashboard';
import Layout from '../components/Layout';

export default function FleetPage() {
  return (
    <Layout>
      <Head>
        <title>Fleet Management System</title>
        <meta name="description" content="Comprehensive fleet management and analytics" />
      </Head>
      <FleetDashboard />
    </Layout>
  );
}
