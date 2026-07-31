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
  ApiAuditLog,
} from './types';

export const DEMO_PERSONAS: Record<string, UserProfile> = {
  customer: {
    id: 'usr_cust_101',
    username: 'john.doe',
    name: 'John Doe',
    email: 'john.doe@westerntrust.com',
    phone: '+1 (555) 234-5678',
    role: 'CUSTOMER',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    kycStatus: 'VERIFIED',
    address: {
      street: '742 Evergreen Terrace',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'United States',
    },
    mfaEnabled: true,
    creditScore: 785,
    memberSince: '2019-04-15',
  },
  premiumCustomer: {
    id: 'usr_prem_202',
    username: 'victoria.sterling',
    name: 'Victoria Sterling',
    email: 'v.sterling@sterlingholdings.com',
    phone: '+1 (555) 987-6543',
    role: 'PREMIUM_CUSTOMER',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    kycStatus: 'VERIFIED',
    address: {
      street: '100 Wall Street, Penthouse 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10005',
      country: 'United States',
    },
    mfaEnabled: true,
    creditScore: 820,
    memberSince: '2015-11-02',
  },
  businessCustomer: {
    id: 'usr_biz_303',
    username: 'acme.corp',
    name: 'Acme Technologies Inc.',
    email: 'treasury@acmetechnologies.io',
    phone: '+1 (800) 555-2263',
    role: 'BUSINESS',
    avatarUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=250',
    kycStatus: 'VERIFIED',
    address: {
      street: '500 Market Street, Suite 1200',
      city: 'San Jose',
      state: 'CA',
      zipCode: '95113',
      country: 'United States',
    },
    mfaEnabled: true,
    creditScore: 795,
    memberSince: '2018-08-20',
  },
  loanOfficer: {
    id: 'usr_off_404',
    username: 'officer.smith',
    name: 'Robert Smith (Senior Underwriter)',
    email: 'robert.smith@westerntrust.com',
    phone: '+1 (555) 333-4444',
    role: 'LOAN_OFFICER',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    kycStatus: 'VERIFIED',
    address: {
      street: '1 Western Trust Plaza',
      city: 'Charlotte',
      state: 'NC',
      zipCode: '28202',
      country: 'United States',
    },
    mfaEnabled: true,
    creditScore: 800,
    memberSince: '2012-01-10',
  },
  bankAdmin: {
    id: 'usr_adm_505',
    username: 'admin.wtb',
    name: 'Sarah Jenkins (System Admin)',
    email: 'admin.ops@westerntrust.com',
    phone: '+1 (555) 777-8888',
    role: 'ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    kycStatus: 'VERIFIED',
    address: {
      street: '1 Western Trust HQ',
      city: 'Charlotte',
      state: 'NC',
      zipCode: '28202',
      country: 'United States',
    },
    mfaEnabled: true,
    creditScore: 810,
    memberSince: '2010-06-01',
  },
  supportExec: {
    id: 'usr_sup_606',
    username: 'support.agent',
    name: 'David Miller (Customer Care lead)',
    email: 'support.lead@westerntrust.com',
    phone: '+1 (555) 444-9999',
    role: 'SUPPORT',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    kycStatus: 'VERIFIED',
    address: {
      street: '200 Customer Way',
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201',
      country: 'United States',
    },
    mfaEnabled: true,
    creditScore: 760,
    memberSince: '2021-02-14',
  },
};

export const DEFAULT_ACCOUNTS: BankAccount[] = [
  {
    id: 'acc_chk_101',
    accountNumber: '4892019381',
    routingNumber: '121000358',
    accountType: 'CHECKING',
    name: 'Preferred Premier Checking',
    balance: 24580.45,
    availableBalance: 24080.45,
    currency: 'USD',
    iban: 'US891210003584892019381',
    interestRate: 0.05,
    status: 'ACTIVE',
    lastUpdated: '2026-07-31T11:30:00Z',
  },
  {
    id: 'acc_sav_102',
    accountNumber: '8839102948',
    routingNumber: '121000358',
    accountType: 'SAVINGS',
    name: 'High-Yield Direct Savings',
    balance: 85400.00,
    availableBalance: 85400.00,
    currency: 'USD',
    iban: 'US891210003588839102948',
    interestRate: 4.35,
    status: 'ACTIVE',
    lastUpdated: '2026-07-31T11:30:00Z',
  },
  {
    id: 'acc_cc_103',
    accountNumber: '4111222233334444',
    routingNumber: '121000358',
    accountType: 'CREDIT_CARD',
    name: 'Western Trust Rewards Visa Signature',
    balance: -1840.50,
    availableBalance: 18159.50,
    creditLimit: 20000.00,
    currency: 'USD',
    iban: 'US891210003584111222233334444',
    interestRate: 19.99,
    status: 'ACTIVE',
    lastUpdated: '2026-07-31T11:30:00Z',
  },
  {
    id: 'acc_mtg_104',
    accountNumber: '9002817263',
    routingNumber: '121000358',
    accountType: 'MORTGAGE',
    name: '30-Year Fixed Home Mortgage',
    balance: -342500.00,
    availableBalance: 0.00,
    currency: 'USD',
    iban: 'US891210003589002817263',
    interestRate: 5.875,
    status: 'ACTIVE',
    lastUpdated: '2026-07-31T11:30:00Z',
  },
  {
    id: 'acc_inv_105',
    accountNumber: '7729103847',
    routingNumber: '121000358',
    accountType: 'INVESTMENT',
    name: 'Managed Growth Portfolio (Self-Directed)',
    balance: 142850.75,
    availableBalance: 12500.00,
    currency: 'USD',
    iban: 'US891210003587729103847',
    interestRate: 0.0,
    status: 'ACTIVE',
    lastUpdated: '2026-07-31T11:30:00Z',
  },
];

export const DEFAULT_BENEFICIARIES: Beneficiary[] = [
  {
    id: 'ben_001',
    name: 'Alice Cooper',
    bankName: 'Chase Bank N.A.',
    accountNumber: '3349102938',
    routingNumber: '021000021',
    nickname: 'Alice (Sister)',
    email: 'alice.cooper@email.com',
    type: 'DOMESTIC_ACH',
  },
  {
    id: 'ben_002',
    name: 'Apex Property Management LLC',
    bankName: 'Bank of America',
    accountNumber: '7748192039',
    routingNumber: '111000012',
    nickname: 'Apartment Rent',
    email: 'billing@apexproperties.com',
    type: 'DOMESTIC_ACH',
  },
  {
    id: 'ben_003',
    name: 'Barclays International UK',
    bankName: 'Barclays PLC London',
    accountNumber: 'UK90BARC20000012345678',
    routingNumber: 'BARCGB22XXX',
    nickname: 'London Consulting Partner',
    email: 'finance@barclays-uk.co.uk',
    type: 'INTERNATIONAL',
  },
];

export const DEFAULT_BILLS: BillPayment[] = [
  {
    id: 'bill_001',
    billerName: 'Pacific Gas & Electric (PG&E)',
    billerCategory: 'Electricity',
    accountNumber: 'PGE-908122-3',
    amountDue: 142.80,
    dueDate: '2026-08-10',
    status: 'UNPAID',
    lastPaymentDate: '2026-07-10',
    lastPaymentAmount: 138.50,
  },
  {
    id: 'bill_002',
    billerName: 'Xfinity Broadband Fiber',
    billerCategory: 'Internet',
    accountNumber: 'XF-8827361',
    amountDue: 89.99,
    dueDate: '2026-08-15',
    status: 'AUTOPAY_SCHEDULED',
    lastPaymentDate: '2026-07-15',
    lastPaymentAmount: 89.99,
  },
  {
    id: 'bill_003',
    billerName: 'State Farm Auto Insurance',
    billerCategory: 'Insurance',
    accountNumber: 'SF-POL-9921',
    amountDue: 210.50,
    dueDate: '2026-08-05',
    status: 'UNPAID',
    lastPaymentDate: '2026-07-05',
    lastPaymentAmount: 210.50,
  },
  {
    id: 'bill_004',
    billerName: 'City Water Department',
    billerCategory: 'Water',
    accountNumber: 'CWD-44102',
    amountDue: 54.20,
    dueDate: '2026-08-20',
    status: 'PAID',
    lastPaymentDate: '2026-07-28',
    lastPaymentAmount: 54.20,
  },
];

export const DEFAULT_LOANS: LoanApplication[] = [
  {
    id: 'loan_app_901',
    userId: 'usr_cust_101',
    applicantName: 'John Doe',
    loanType: 'HOME',
    requestedAmount: 350000,
    termMonths: 360,
    estimatedInterestRate: 5.875,
    monthlyPayment: 2070.15,
    purpose: 'Primary Residence Purchase in San Francisco',
    annualIncome: 145000,
    status: 'APPROVED',
    appliedDate: '2026-06-12',
    documents: [
      { name: 'W2_Tax_Form_2025.pdf', size: '1.2 MB', type: 'application/pdf', uploadedAt: '2026-06-12' },
      { name: 'Paystub_June_2026.pdf', size: '450 KB', type: 'application/pdf', uploadedAt: '2026-06-12' },
    ],
    reviewerNotes: 'Verified credit score 785 and debt-to-income ratio 22%. Pre-approved.',
  },
  {
    id: 'loan_app_902',
    userId: 'usr_cust_101',
    applicantName: 'John Doe',
    loanType: 'PERSONAL',
    requestedAmount: 15000,
    termMonths: 36,
    estimatedInterestRate: 7.25,
    monthlyPayment: 464.92,
    purpose: 'Home Improvement & Solar Installation',
    annualIncome: 145000,
    status: 'UNDER_REVIEW',
    appliedDate: '2026-07-28',
    documents: [
      { name: 'Contractor_Quote_Solar.pdf', size: '890 KB', type: 'application/pdf', uploadedAt: '2026-07-28' },
    ],
    reviewerNotes: 'Underwriter review pending income verification.',
  },
];

export const DEFAULT_CREDIT_CARDS: CreditCardDetails[] = [
  {
    id: 'card_sig_001',
    cardNumberMasked: '•••• •••• •••• 4444',
    cardHolderName: 'JOHN DOE',
    expiryDate: '09/29',
    cardType: 'VISA_SIGNATURE',
    creditLimit: 20000,
    currentBalance: 1840.50,
    availableCredit: 18159.50,
    rewardsPoints: 48250,
    isFrozen: false,
    isBlocked: false,
    billingCycleDay: 15,
    minPaymentDue: 45.00,
    paymentDueDate: '2026-08-15',
    virtualCardNumber: '4111 •••• •••• 9921',
  },
];

export const DEFAULT_INVESTMENTS: InvestmentAsset[] = [
  {
    id: 'inv_001',
    symbol: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    type: 'ETF',
    shares: 240,
    avgCost: 210.50,
    currentPrice: 268.40,
    totalValue: 64416.00,
    unrealizedGainLoss: 13896.00,
    percentageChange24h: 1.25,
  },
  {
    id: 'inv_002',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'STOCK',
    shares: 120,
    avgCost: 175.20,
    currentPrice: 224.50,
    totalValue: 26940.00,
    unrealizedGainLoss: 5916.00,
    percentageChange24h: -0.45,
  },
  {
    id: 'inv_003',
    symbol: 'FXAIX',
    name: 'Fidelity 500 Index Fund',
    type: 'MUTUAL_FUND',
    shares: 310,
    avgCost: 142.00,
    currentPrice: 166.10,
    totalValue: 51491.00,
    unrealizedGainLoss: 7471.00,
    percentageChange24h: 0.82,
  },
];

export const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_101',
    title: 'Security Alert: New Sign-in Recognized',
    message: 'Your Western Trust Bank account was accessed from San Francisco, CA (Chrome Browser).',
    timestamp: '10 minutes ago',
    type: 'ALERT',
    read: false,
  },
  {
    id: 'notif_102',
    title: 'Direct Deposit Confirmed',
    message: 'ACME CORP PAYROLL direct deposit of $5,420.00 was credited to Checking ****9381.',
    timestamp: '2 hours ago',
    type: 'INFO',
    read: false,
  },
  {
    id: 'notif_103',
    title: 'Upcoming Bill Due: PG&E Electricity',
    message: 'Bill payment of $142.80 is due on August 10, 2026.',
    timestamp: '1 day ago',
    type: 'WARNING',
    read: true,
  },
];

export const DEFAULT_CHAOS_FLAGS: ChaosFeatureFlags = {
  accessibilityDefects: false,
  apiLatencyMs: 0,
  randomApiFailures: false,
  failureRatePercent: 20,
  injectedErrorCode: 500,
  visualBugs: false,
  weakSecurityMode: false,
  heavyDomMode: false,
  brokenWorkflows: false,
};

// Deterministic seed transactions generator
export function generateSeedTransactions(count = 150): Transaction[] {
  const merchants = [
    { name: 'Whole Foods Market', category: 'Groceries', logo: '🛒', avg: 120 },
    { name: 'Starbucks Coffee', category: 'Dining', logo: '☕', avg: 14 },
    { name: 'Target Retail', category: 'Shopping', logo: '🎯', avg: 85 },
    { name: 'Chevron Gas Station', category: 'Services', logo: '⛽', avg: 45 },
    { name: 'Uber Ride Technologies', category: 'Travel', logo: '🚗', avg: 28 },
    { name: 'Netflix Subscription', category: 'Entertainment', logo: '🎬', avg: 19.99 },
    { name: 'Kaiser Permanente Medical', category: 'Healthcare', logo: '🏥', avg: 250 },
    { name: 'ACME Corp Salary Deposit', category: 'Salary', logo: '💼', avg: 5420, credit: true },
    { name: 'Apple Store Online', category: 'Shopping', logo: '🍎', avg: 299 },
    { name: 'PG&E Utility Power', category: 'Utilities', logo: '⚡', avg: 142 },
  ];

  const transactions: Transaction[] = [];
  const baseDate = new Date('2026-07-31T10:00:00Z');

  for (let i = 0; i < count; i++) {
    const merchantObj = merchants[i % merchants.length];
    const daysAgo = Math.floor(i / 3);
    const txDate = new Date(baseDate.getTime() - daysAgo * 24 * 60 * 60 * 1000 - (i % 12) * 3600 * 1000);
    const isCredit = !!merchantObj.credit;
    const amountVal = isCredit ? merchantObj.avg : -(merchantObj.avg + (i % 17) * 2.5);

    transactions.push({
      id: `tx_${1000 + i}`,
      accountId: i % 2 === 0 ? 'acc_chk_101' : 'acc_sav_102',
      accountName: i % 2 === 0 ? 'Preferred Premier Checking' : 'High-Yield Direct Savings',
      date: txDate.toISOString().split('T')[0] + ' ' + txDate.toTimeString().split(' ')[0],
      merchant: merchantObj.name,
      category: merchantObj.category as any,
      amount: Math.round(amountVal * 100) / 100,
      status: i === 0 ? 'PENDING' : i === 7 ? 'REVERSED' : 'COMPLETED',
      description: `${merchantObj.name} POS Auth Terminal #${1000 + (i % 88)}`,
      merchantLogo: merchantObj.logo,
      referenceNumber: `WTB-REF-${882000 + i}`,
      channel: i % 4 === 0 ? 'ACH' : i % 3 === 0 ? 'ONLINE' : 'POS',
    });
  }

  return transactions;
}

export function generateSeedAuditLogs(count = 30): ApiAuditLog[] {
  const endpoints = [
    { method: 'GET', url: '/api/accounts', status: 200 },
    { method: 'POST', url: '/api/transfers', status: 201 },
    { method: 'GET', url: '/api/cards', status: 200 },
    { method: 'POST', url: '/api/login', status: 200 },
    { method: 'GET', url: '/api/loans', status: 200 },
    { method: 'POST', url: '/api/payments', status: 200 },
  ];

  const logs: ApiAuditLog[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const ep = endpoints[i % endpoints.length];
    const logTime = new Date(now.getTime() - i * 4 * 60 * 1000);
    logs.push({
      id: `log_${100 + i}`,
      timestamp: logTime.toISOString(),
      method: ep.method,
      endpoint: ep.url,
      statusCode: ep.status,
      latencyMs: Math.floor(45 + Math.random() * 120),
      correlationId: `corr-wtb-${Math.random().toString(36).substring(2, 9)}`,
      clientIp: '192.168.1.102',
      requestBodyPreview: ep.method === 'POST' ? '{"account": "4892019381", "amount": 100.00}' : undefined,
    });
  }

  return logs;
}
