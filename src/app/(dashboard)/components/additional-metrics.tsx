import { Client, Status } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const AdditionalMetrics = ({ clients }: { clients: Client[] }) => {
  const activeClients = clients.filter(c => c.status === Status.ACTIVE).length;
  const totalClients = clients.length;
  const retentionRate = totalClients > 0 ? Math.round((activeClients / totalClients) * 100) : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Taxa de Retenção</CardTitle>
          <CardDescription>
            Percentual de clientes que permanecem ativos
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-6">
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold text-primary">{retentionRate}%</div>
            <p className="text-sm text-muted-foreground mt-2">Média geral</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status dos Clientes</CardTitle>
          <CardDescription>
            Distribuição atual do status dos clientes
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-start justify-around py-6">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-green-500">
              {clients.filter(c => c.status === Status.ACTIVE).length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Ativos</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-yellow-500">
              {clients.filter(c => c.status === Status.PENDING).length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Pendentes</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-red-500">
              {clients.filter(c => c.status === Status.INACTIVE || c.status === Status.CANCELLED).length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Inativos</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};