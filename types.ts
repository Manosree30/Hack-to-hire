export enum ScamCategory {
  UPI_FRAUD = "UPI fraud",
  OTP_SCAM = "OTP scam",
  FAKE_JOB_OFFER = "Fake job offer",
  ONLINE_SHOPPING_SCAM = "Online shopping scam",
  KYC_UPDATE_SCAM = "KYC update scam",
  PHISHING_LINK = "Phishing link / Fake website",
  LOAN_SCAM = "Loan scam",
  ROMANCE_SCAM = "Romance scam",
  GOVERNMENT_IMPERSONATION = "Government impersonation",
  INVESTMENT_SCAM = "Investment scam",
  TECH_SUPPORT_SCAM = "Tech support scam",
  LOTTERY_PRIZE_SCAM = "Lottery / Prize scam",
  SUBSCRIPTION_FRAUD = "Subscription fraud",
  OTHER = "Other",
  SAFE = "Safe"
}

export enum ConfidenceLevel {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High"
}

export interface AnalysisResult {
  riskScore: number;
  category: ScamCategory | string;
  reason: string;
  actions: string[];
  confidence: ConfidenceLevel;
}

export interface HistoryItem extends AnalysisResult {
  id: string;
  timestamp: number;
  snippet: string;
}