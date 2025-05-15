'use client'

import { MainStats } from '@/app/(dashboard)/components/main-stats'
import { PlanDistribution } from '@/app/(dashboard)/components/plan-distribution'
import { AdditionalMetrics } from '@/app/(dashboard)/components/additional-metrics'
import LoadingOverview from './components/loading-overview'
import { useData } from './store'
import { PlanProducts } from '@/app/(dashboard)/components/plan-products'
export default function Home() {
  const { clients, plans, loading } = useData()

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
          <PlanProducts plans={plans} />
        </>
      )}
    </div>
  )
}
