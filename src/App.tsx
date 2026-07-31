import React, { useState } from 'react';
import { BankProvider, useBank } from './context/BankContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LoginModal } from './components/LoginModal';
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
import { TestAutomationDocsView } from './views/TestAutomationDocsView';

const MainAppContent: React.FC = () => {
  const { currentView, isAuthenticated, featureFlags } = useBank();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return <DashboardView />;
      case 'ACCOUNTS':
        return <AccountsView />;
      case 'TRANSACTIONS':
        return <TransactionsView />;
      case 'TRANSFERS':
        return <TransfersView />;
      case 'BILLPAY':
        return <BillPayView />;
      case 'LOANS':
        return <LoansView />;
      case 'CARDS':
        return <CardsView />;
      case 'INVESTMENTS':
        return <InvestmentsView />;
      case 'PROFILE':
        return <CustomerProfileView />;
      case 'SUPPORT':
        return <SupportView />;
      case 'ADMIN':
        return <AdminPortalView />;
      case 'SWAGGER':
        return <ApiSwaggerView />;
      case 'SELENIUM_DOCS':
        return <TestAutomationDocsView />;
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
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

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
