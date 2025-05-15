import { Badge } from '@/components/ui/badge'
import { Plan, Status } from '@/enums'

export function renderPlanBadge(plan: Plan) {
  switch (plan) {
    case Plan.FREE:
      return <Badge variant="outline">Free</Badge>
    case Plan.BASIC:
      return <Badge variant="secondary">Basic</Badge>
    case Plan.PREMIUM:
      return <Badge variant="default">Premium</Badge>
    case Plan.ENTERPRISE:
      return <Badge className="bg-violet-800">Enterprise</Badge>
    default:
      return <Badge variant="outline">{plan}</Badge>
  }
}

export function renderStatusBadge(status: Status) {
  switch (status) {
    case Status.ACTIVE:
      return <Badge className="bg-green-500">Active</Badge>
    case Status.INACTIVE:
      return <Badge variant="secondary">Inactive</Badge>
    case Status.PENDING:
      return (
        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
          Pending
        </Badge>
      )
    case Status.CANCELLED:
      return <Badge variant="destructive">Cancelled</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
