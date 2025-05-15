'use client'

import { Plan } from '@/enums'
import { MainStats } from '@/app/(dashboard)/components/main-stats'
import { PlanDistribution } from '@/app/(dashboard)/components/plan-distribution'
import { AdditionalMetrics } from '@/app/(dashboard)/components/additional-metrics'
import LoadingOverview from './components/loading-overview'
import { useData } from './store'
import { PlanProducts } from '@/app/(dashboard)/components/plan-products'
import { PlanPrice } from '@/types'

export default function Home() {
  const { clients, plans, loading } = useData()

  const planOrder = [Plan.BASIC, Plan.PREMIUM, Plan.ENTERPRISE]
  const paidPlans = planOrder
    .map((planType) => plans.find((p) => p.plan === planType))
    .filter((plan): plan is PlanPrice => plan !== undefined)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">Welcome to the CRM System</p>
      </div>
      {loading ? (
        <LoadingOverview />
      ) : (
        <>
          <MainStats clients={clients} plans={plans} />
          <PlanDistribution clients={clients} />
          <AdditionalMetrics clients={clients} />
          <PlanProducts plans={paidPlans} />
        </>
      )}
    </div>
  )
}
