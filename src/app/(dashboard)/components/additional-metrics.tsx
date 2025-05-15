import { Client } from '@/types'
import { Status } from '@/enums'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export const AdditionalMetrics = ({ clients }: { clients: Client[] }) => {
  const activeClients = clients.filter((c) => c.status === Status.ACTIVE).length
  const totalClients = clients.length
  const retentionRate =
    totalClients > 0 ? Math.round((activeClients / totalClients) * 100) : 0

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Retention Rate</CardTitle>
          <CardDescription>
            Percentage of clients that remain active
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-6">
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold text-primary">
              {retentionRate}%
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Average retention rate
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clients Status</CardTitle>
          <CardDescription>
            Current distribution of client status
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-start justify-around py-6">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-green-500">
              {clients.filter((c) => c.status === Status.ACTIVE).length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Active</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-yellow-500">
              {clients.filter((c) => c.status === Status.PENDING).length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Pending</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-red-500">
              {
                clients.filter(
                  (c) =>
                    c.status === Status.INACTIVE ||
                    c.status === Status.CANCELLED
                ).length
              }
            </div>
            <p className="text-sm text-muted-foreground mt-1">Inactive</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
