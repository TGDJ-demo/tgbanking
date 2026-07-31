import React, { useState } from 'react';
import { BankProvider, useBank } from './context/BankContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LoginModal } from './components/LoginModal';
import { CustomTestDataModal } from './components/CustomTestDataModal';
import { ToastContainer } from './components/ToastContainer';

import { DashboardView } from './views/DashboardView';
import { AccountsView } from './views/AccountsView';
import { TransactionsView } from './views/TransactionsView';
import { TransfersView } from './views/TransfersView';
import { BillPayView } from './views/BillPayView';
import { LoansView } from './views/LoansView';
import { CardsView } from './views/CardsView';
import { InvestmentsView } from './views/InvestmentsView';
import { CustomerProfileView } from './views/CustomerProfileView';
import { SupportView } from './views/SupportView';
import { AdminPortalView } from './views/AdminPortalView';
import { ApiSwaggerView } from './views/ApiSwaggerView';

const MainAppContent: React.FC = () => {
  const { activeView, isAuthenticated, featureFlags, login } = useBank();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [testDataModalOpen, setTestDataModalOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeView?.toLowerCase()) {
      case 'dashboard':
        return <DashboardView />;
      case 'accounts':
        return <AccountsView />;
      case 'transactions':
        return <TransactionsView />;
      case 'transfers':
        return <TransfersView />;
      case 'billpay':
        return <BillPayView />;
      case 'loans':
        return <LoansView />;
      case 'cards':
        return <CardsView />;
      case 'investments':
        return <InvestmentsView />;
      case 'profile':
        return <CustomerProfileView />;
      case 'support':
        return <SupportView />;
      case 'admin':
        return <AdminPortalView />;
      case 'swagger':
        return <ApiSwaggerView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div
      id="app-root-layout"
      data-testid="app-root-layout"
      className={`min-h-screen bg-[#F3F4F6] text-slate-900 font-sans antialiased selection:bg-[#002D72] selection:text-white flex flex-col ${
        featureFlags.visualBugs ? 'visual-bug-displacement' : ''
      }`}
    >
      {/* Top Header Navigation */}
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onOpenTestDataModal={() => setTestDataModalOpen(true)}
      />

      {/* Main Container Layout */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Left Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Primary Page Content Canvas */}
        <main
          id="main-content-canvas"
          data-testid="main-content-canvas"
          className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto"
        >
          {renderActiveView()}
        </main>
      </div>

      {/* Login & OTP Auth Modal */}
      {!isAuthenticated && <LoginModal />}

      {/* Custom Test Data Injector Modal */}
      <CustomTestDataModal isOpen={testDataModalOpen} onClose={() => setTestDataModalOpen(false)} />

      {/* Global Toast Notifications Engine */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <BankProvider>
      <MainAppContent />
    </BankProvider>
  );
}
