import { Badge } from "@/components/ui/badge";
import { Plan, Status } from "@/types";

export function renderPlanBadge(plan: Plan) {
  switch (plan) {
    case Plan.FREE:
      return <Badge variant="outline">Gratuito</Badge>;
    case Plan.BASIC:
      return <Badge variant="secondary">Básico</Badge>;
    case Plan.PREMIUM:
      return <Badge variant="default">Premium</Badge>;
    case Plan.ENTERPRISE:
      return <Badge className="bg-violet-800">Enterprise</Badge>;
    default:
      return <Badge variant="outline">{plan}</Badge>;
  }
}

export function renderStatusBadge(status: Status) {
  switch (status) {
    case Status.ACTIVE:
      return <Badge className="bg-green-500">Ativo</Badge>;
    case Status.INACTIVE:
      return <Badge variant="secondary">Inativo</Badge>;
    case Status.PENDING:
      return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pendente</Badge>;
    case Status.CANCELLED:
      return <Badge variant="destructive">Cancelado</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}