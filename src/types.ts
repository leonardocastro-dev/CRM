import { Plan, Status } from '@/enums'

export interface Client {
  id: string
  name: string
  email: string
  plan: Plan
  status: Status
  created_at: number
}

export interface PlanPrice {
  plan: Plan
  price: number
}
