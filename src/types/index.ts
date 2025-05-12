export interface Client {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  status: Status;
  created_at: number;
}

export enum Plan {
  FREE = 'free',
  BASIC = 'basic',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise',
}

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
}
