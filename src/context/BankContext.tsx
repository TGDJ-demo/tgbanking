import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  BankAccount,
  Transaction,
  Beneficiary,
  BillPayment,
  LoanApplication,
  CreditCardDetails,
  InvestmentAsset,
  SupportTicket,
  NotificationItem,
  ChaosFeatureFlags,
  MoneyTransferRequest,
  MoneyTransferResult,
  ApiAuditLog,
} from '../types';
import {
  DEMO_PERSONAS,
  DEFAULT_ACCOUNTS,
  DEFAULT_BENEFICIARIES,
  DEFAULT_BILLS,
  DEFAULT_LOANS,
  DEFAULT_CREDIT_CARDS,
  DEFAULT_INVESTMENTS,
  DEFAULT_NOTIFICATIONS,
  DEFAULT_CHAOS_FLAGS,
  generateSeedTransactions,
  generateSeedAuditLogs,
} from '../mockData';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface BankContextType {
  currentUser: UserProfile;
  accounts: BankAccount[];
  transactions: Transaction[];
  beneficiaries: Beneficiary[];
  bills: BillPayment[];
  loans: LoanApplication[];
  creditCards: CreditCardDetails[];
  investments: InvestmentAsset[];
  notifications: NotificationItem[];
  supportTickets: SupportTicket[];
  featureFlags: ChaosFeatureFlags;
  auditLogs: ApiAuditLog[];
  toasts: Toast[];
  currentPersonaKey: string;
  activeView: string;

  // Actions
  setActiveView: (view: string) => void;
  switchPersona: (personaKey: string) => void;
  updateFeatureFlags: (flags: Partial<ChaosFeatureFlags>) => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  executeTransfer: (req: MoneyTransferRequest) => Promise<MoneyTransferResult>;
  payBill: (billId: string, accountId: string, amount: number) => Promise<boolean>;
  submitLoanApplication: (loan: Partial<LoanApplication>) => Promise<LoanApplication>;
  toggleFreezeCreditCard: (cardId: string) => void;
  addBeneficiary: (ben: Omit<Beneficiary, 'id'>) => void;
  createSupportTicket: (ticket: Partial<SupportTicket>) => void;
  updateLoanStatus: (loanId: string, status: LoanApplication['status'], notes?: string) => void;
  markAllNotificationsRead: () => void;
  exportTransactions: (format: 'CSV' | 'JSON') => void;
}

const BankContext = createContext<BankContextType | undefined>(undefined);

export const BankProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPersonaKey, setCurrentPersonaKey] = useState<string>('customer');
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_PERSONAS.customer);
  const [accounts, setAccounts] = useState<BankAccount[]>(DEFAULT_ACCOUNTS);
  const [transactions, setTransactions] = useState<Transaction[]>(generateSeedTransactions(120));
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(DEFAULT_BENEFICIARIES);
  const [bills, setBills] = useState<BillPayment[]>(DEFAULT_BILLS);
  const [loans, setLoans] = useState<LoanApplication[]>(DEFAULT_LOANS);
  const [creditCards, setCreditCards] = useState<CreditCardDetails[]>(DEFAULT_CREDIT_CARDS);
  const [investments, setInvestments] = useState<InvestmentAsset[]>(DEFAULT_INVESTMENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(DEFAULT_NOTIFICATIONS);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      id: 'tkt_801',
      subject: 'Inquiry regarding Wire Transfer limits for Escrow',
      category: 'TRANSFER',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      createdAt: '2026-07-29T14:20:00Z',
      updatedAt: '2026-07-30T09:15:00Z',
      messages: [
        {
          sender: 'John Doe',
          timestamp: '2026-07-29T14:20:00Z',
          message: 'Hello, I will need to wire $120,000 next Tuesday for home closing escrow. What documents are needed?',
          isAgent: false,
        },
        {
          sender: 'David Miller (Support Agent)',
          timestamp: '2026-07-30T09:15:00Z',
          message: 'Hello Mr. Doe, for transfers over $100k, please upload your purchase agreement under KYC Documents or present your photo ID at any branch.',
          isAgent: true,
        },
      ],
    },
  ]);
  const [featureFlags, setFeatureFlags] = useState<ChaosFeatureFlags>(DEFAULT_CHAOS_FLAGS);
  const [auditLogs, setAuditLogs] = useState<ApiAuditLog[]>(generateSeedAuditLogs(25));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [activeView, setActiveView] = useState<string>('dashboard');

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const switchPersona = (personaKey: string) => {
    if (DEMO_PERSONAS[personaKey]) {
      setCurrentPersonaKey(personaKey);
      setCurrentUser(DEMO_PERSONAS[personaKey]);
      addToast({
        type: 'info',
        title: 'Persona Switch',
        message: `Active User switched to ${DEMO_PERSONAS[personaKey].name} (${DEMO_PERSONAS[personaKey].role})`,
      });
    }
  };

  const updateFeatureFlags = (flags: Partial<ChaosFeatureFlags>) => {
    setFeatureFlags((prev) => {
      const updated = { ...prev, ...flags };
      addToast({
        type: 'warning',
        title: 'Chaos Test Suite Configured',
        message: 'Updated system feature flags & defect parameters.',
      });
      return updated;
    });
  };

  const simulateDelay = async () => {
    if (featureFlags.apiLatencyMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, featureFlags.apiLatencyMs));
    }
  };

  const executeTransfer = async (req: MoneyTransferRequest): Promise<MoneyTransferResult> => {
    await simulateDelay();

    if (featureFlags.randomApiFailures && Math.random() * 100 < featureFlags.failureRatePercent) {
      addToast({
        type: 'error',
        title: `Transfer Failed (Chaos Injected HTTP ${featureFlags.injectedErrorCode})`,
        message: 'Automated defect testing simulated transfer failure.',
      });
      throw new Error(`Injected Chaos API Error: HTTP ${featureFlags.injectedErrorCode}`);
    }

    const sourceAcc = accounts.find((a) => a.id === req.fromAccountId);
    if (!sourceAcc || sourceAcc.availableBalance < req.amount) {
      addToast({
        type: 'error',
        title: 'Insufficient Funds',
        message: `Account ${sourceAcc?.name || ''} has insufficient available balance for $${req.amount}.`,
      });
      throw new Error('Insufficient Funds');
    }

    // Deduct balance
    const updatedAccounts = accounts.map((acc) => {
      if (acc.id === req.fromAccountId) {
        return {
          ...acc,
          balance: acc.balance - req.amount,
          availableBalance: acc.availableBalance - req.amount,
        };
      }
      if (req.toAccountId && acc.id === req.toAccountId) {
        return {
          ...acc,
          balance: acc.balance + req.amount,
          availableBalance: acc.availableBalance + req.amount,
        };
      }
      return acc;
    });
    setAccounts(updatedAccounts);

    const refNum = `WTB-TRF-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const corrId = `corr-wtb-${Math.random().toString(36).substring(2, 9)}`;

    // Add transaction record
    const targetName = req.toAccountId
      ? accounts.find((a) => a.id === req.toAccountId)?.name || 'Internal Account'
      : req.externalBankName || 'External Beneficiary';

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      accountId: req.fromAccountId,
      accountName: sourceAcc.name,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      merchant: `Transfer to ${targetName}`,
      category: 'Transfer',
      amount: -req.amount,
      status: 'COMPLETED',
      description: `Transfer ref ${refNum}. Memo: ${req.memo || 'None'}`,
      merchantLogo: '💸',
      referenceNumber: refNum,
      channel: req.transferType as any,
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Add Audit Log
    setAuditLogs((prev) => [
      {
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString(),
        method: 'POST',
        endpoint: '/api/transfers',
        statusCode: 201,
        latencyMs: featureFlags.apiLatencyMs || 85,
        correlationId: corrId,
        clientIp: '192.168.1.102',
        requestBodyPreview: JSON.stringify({ amount: req.amount, refNum }),
      },
      ...prev,
    ]);

    const result: MoneyTransferResult = {
      id: `trf_${Date.now()}`,
      referenceNumber: refNum,
      timestamp: new Date().toISOString(),
      status: 'SUCCESS',
      fromAccountName: sourceAcc.name,
      toAccountName: targetName,
      amount: req.amount,
      fee: req.transferType === 'WIRE' ? 25.0 : req.transferType === 'INTERNATIONAL' ? 45.0 : 0.0,
      estimatedSettlement: req.transferType === 'INTERNAL' ? 'Immediate' : '1 Business Day',
      correlationId: corrId,
    };

    addToast({
      type: 'success',
      title: 'Transfer Completed',
      message: `Successfully transferred $${req.amount.toFixed(2)} (Ref: ${refNum})`,
    });

    return result;
  };

  const payBill = async (billId: string, accountId: string, amount: number): Promise<boolean> => {
    await simulateDelay();
    const sourceAcc = accounts.find((a) => a.id === accountId);
    if (!sourceAcc || sourceAcc.availableBalance < amount) {
      addToast({
        type: 'error',
        title: 'Payment Failed',
        message: 'Insufficient balance for bill payment.',
      });
      return false;
    }

    setAccounts((prev) =>
      prev.map((a) => (a.id === accountId ? { ...a, balance: a.balance - amount, availableBalance: a.availableBalance - amount } : a))
    );

    setBills((prev) =>
      prev.map((b) =>
        b.id === billId
          ? {
              ...b,
              status: 'PAID',
              lastPaymentDate: new Date().toISOString().split('T')[0],
              lastPaymentAmount: amount,
            }
          : b
      )
    );

    const billObj = bills.find((b) => b.id === billId);

    const refNum = `WTB-PAY-${Math.floor(10000000 + Math.random() * 90000000)}`;
    setTransactions((prev) => [
      {
        id: `tx_${Date.now()}`,
        accountId,
        accountName: sourceAcc.name,
        date: new Date().toISOString().replace('T', ' ').substring(0, 19),
        merchant: billObj?.billerName || 'Bill Payment',
        category: 'Utilities',
        amount: -amount,
        status: 'COMPLETED',
        description: `Bill Payment for ${billObj?.accountNumber || 'Utility'}`,
        merchantLogo: '📄',
        referenceNumber: refNum,
        channel: 'ACH',
      },
      ...prev,
    ]);

    addToast({
      type: 'success',
      title: 'Bill Paid',
      message: `Paid $${amount.toFixed(2)} to ${billObj?.billerName}`,
    });

    return true;
  };

  const submitLoanApplication = async (loanData: Partial<LoanApplication>): Promise<LoanApplication> => {
    await simulateDelay();
    const newLoan: LoanApplication = {
      id: `loan_app_${Date.now()}`,
      userId: currentUser.id,
      applicantName: currentUser.name,
      loanType: loanData.loanType || 'PERSONAL',
      requestedAmount: loanData.requestedAmount || 10000,
      termMonths: loanData.termMonths || 36,
      estimatedInterestRate: loanData.estimatedInterestRate || 6.5,
      monthlyPayment: loanData.monthlyPayment || 320,
      purpose: loanData.purpose || 'General Financing',
      annualIncome: loanData.annualIncome || 120000,
      status: 'SUBMITTED',
      appliedDate: new Date().toISOString().split('T')[0],
      documents: loanData.documents || [
        { name: 'Income_Proof_W2.pdf', size: '1.1 MB', type: 'application/pdf', uploadedAt: new Date().toISOString().split('T')[0] },
      ],
    };

    setLoans((prev) => [newLoan, ...prev]);

    addToast({
      type: 'success',
      title: 'Loan Application Submitted',
      message: `Loan App ID ${newLoan.id} submitted for underwriting review.`,
    });

    return newLoan;
  };

  const updateLoanStatus = (loanId: string, status: LoanApplication['status'], notes?: string) => {
    setLoans((prev) =>
      prev.map((l) => (l.id === loanId ? { ...l, status, reviewerNotes: notes || l.reviewerNotes } : l))
    );
    addToast({
      type: 'info',
      title: 'Loan Application Updated',
      message: `Loan ${loanId} status set to ${status}`,
    });
  };

  const toggleFreezeCreditCard = (cardId: string) => {
    setCreditCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          const isNowFrozen = !c.isFrozen;
          addToast({
            type: isNowFrozen ? 'warning' : 'success',
            title: isNowFrozen ? 'Card Frozen' : 'Card Unfrozen',
            message: `Card ending in ${c.cardNumberMasked.slice(-4)} is now ${isNowFrozen ? 'frozen' : 'active'}.`,
          });
          return { ...c, isFrozen: isNowFrozen };
        }
        return c;
      })
    );
  };

  const addBeneficiary = (ben: Omit<Beneficiary, 'id'>) => {
    const newBen = { ...ben, id: `ben_${Date.now()}` };
    setBeneficiaries((prev) => [...prev, newBen]);
    addToast({
      type: 'success',
      title: 'Beneficiary Added',
      message: `${ben.name} added to saved transfer beneficiaries.`,
    });
  };

  const createSupportTicket = (ticket: Partial<SupportTicket>) => {
    const newTkt: SupportTicket = {
      id: `tkt_${Date.now()}`,
      subject: ticket.subject || 'Support Inquiry',
      category: ticket.category || 'ACCOUNT',
      priority: ticket.priority || 'MEDIUM',
      status: 'OPEN',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          sender: currentUser.name,
          timestamp: new Date().toISOString(),
          message: ticket.messages?.[0]?.message || 'Please assist with my request.',
          isAgent: false,
        },
      ],
    };

    setSupportTickets((prev) => [newTkt, ...prev]);
    addToast({
      type: 'success',
      title: 'Ticket Created',
      message: `Support ticket #${newTkt.id} submitted successfully.`,
    });
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const exportTransactions = (format: 'CSV' | 'JSON') => {
    if (format === 'CSV') {
      const headers = ['ID', 'Date', 'Account', 'Merchant', 'Category', 'Amount', 'Status', 'RefNumber'];
      const rows = transactions.map((t) => [
        t.id,
        t.date,
        `"${t.accountName}"`,
        `"${t.merchant}"`,
        t.category,
        t.amount,
        t.status,
        t.referenceNumber,
      ]);
      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Western_Trust_Transactions_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } else {
      const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Western_Trust_Transactions_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    }
  };

  return (
    <BankContext.Provider
      value={{
        currentUser,
        accounts,
        transactions,
        beneficiaries,
        bills,
        loans,
        creditCards,
        investments,
        notifications,
        supportTickets,
        featureFlags,
        auditLogs,
        toasts,
        currentPersonaKey,
        activeView,
        setActiveView,
        switchPersona,
        updateFeatureFlags,
        addToast,
        removeToast,
        executeTransfer,
        payBill,
        submitLoanApplication,
        toggleFreezeCreditCard,
        addBeneficiary,
        createSupportTicket,
        updateLoanStatus,
        markAllNotificationsRead,
        exportTransactions,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error('useBank must be used within a BankProvider');
  }
  return context;
};
