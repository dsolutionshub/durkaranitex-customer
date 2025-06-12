'use client'
import { useState } from 'react';
import OrderHistory from './components/OrderHistory'; // create this component
import AccountDetails from './components/AccountDetails';
import AddressForm from './components/Addresses';
// import Addresses from '@/components/Addresses'; // create this component

export default function AccountPage() {
  const [selectedTab, setSelectedTab] = useState('account');

  const renderContent = () => {
    switch (selectedTab) {
      case 'account':
        return <AccountDetails />;
      case 'orders':
        return <OrderHistory />;
      case 'addresses':
        return <AddressForm />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <div className="w-full md:w-1/4 space-y-4">
          <p
            className={`cursor-pointer ${selectedTab === 'account' ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'}`}
            onClick={() => setSelectedTab('account')}
          >
            Account
          </p>
          <p
            className={`cursor-pointer ${selectedTab === 'orders' ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'}`}
            onClick={() => setSelectedTab('orders')}
          >
            Order Details
          </p>
          <p
            className={`cursor-pointer ${selectedTab === 'addresses' ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'}`}
            onClick={() => setSelectedTab('addresses')}
          >
            Addresses
          </p>
          <a href="/logout" className="text-gray-600 hover:text-black">
            Log Out
          </a>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 space-y-6">
          <h1 className="text-4xl font-bold text-black text-center mb-4">My Account</h1>
          <p className="text-gray-700">
            Hello <span className="font-semibold">Karthi N</span> (not Karthi N?{' '}
            <a href="/logout" className="text-blue-600 hover:underline">Log Out</a>)
          </p>

          {renderContent()}
        </div>
      </div>
    </div>
  );
}
