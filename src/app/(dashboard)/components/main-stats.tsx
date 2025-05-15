import { Client } from '@/types.js'
import { Plan, Status } from '@/enums'
import { CalendarDays, Users, TrendingUp, CircleDollarSign } from 'lucide-react'
import { format } from 'date-fns'
import StatCard from './stat-card/index.jsx'

export const MainStats = ({
  clients,
  plans
}: {
  clients: Client[]
  plans: { plan: Plan; price: number }[]
}) => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const newClientsThisMonth = clients.filter((client) => {
    const clientDate = new Date(client.created_at)
    return (
      clientDate.getMonth() === currentMonth &&
      clientDate.getFullYear() === currentYear
    )
  }).length

  const planValues = plans.reduce(
    (acc, { plan, price }) => {
      acc[plan] = price
      return acc
    },
    {} as Record<Plan, number>
  )

  const companyBalance = clients
    .filter((client) => client.status === Status.ACTIVE)
    .reduce((total, client) => total + planValues[client.plan], 0)

  const premiumClients = clients.filter(
    (client) => client.plan === Plan.PREMIUM || client.plan === Plan.ENTERPRISE
  ).length
  const basicClients = clients.filter(
    (client) => client.plan === Plan.FREE || client.plan === Plan.BASIC
  ).length
  const upgradePotential = basicClients
    ? Math.round((premiumClients / (premiumClients + basicClients)) * 100)
    : 0

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatCard
        title="New Clients"
        value={newClientsThisMonth}
        description={`in ${format(currentDate, 'MMMM')}`}
        icon={CalendarDays}
      />

      <StatCard
        title="Total Clients"
        value={clients.length}
        description="across all plans"
        icon={Users}
      />

      <StatCard
        title="Premium Adoption"
        value={`${upgradePotential}%`}
        description="clients on premium plans"
        icon={TrendingUp}
      />

      <StatCard
        title="Monthly Revenue"
        value={`$ ${companyBalance.toFixed(2)}`}
        description="from active clients"
        icon={CircleDollarSign}
      />
    </div>
  )
}
