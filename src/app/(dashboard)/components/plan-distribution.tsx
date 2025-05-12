import { Client, Plan } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";

export const PlanDistribution = ({ clients }: { clients: Client[] }) => {
  const planCounts = clients.reduce((acc, client) => {
    acc[client.plan] = (acc[client.plan] || 0) + 1;
    return acc;
  }, {} as Record<Plan, number>);

  const planData = Object.entries(planCounts).map(([plan, count]) => ({
    plan: formatPlanName(plan as Plan),
    clients: count,
  }));

  function formatPlanName(plan: Plan): string {
    switch (plan) {
      case Plan.FREE: return "Free";
      case Plan.BASIC: return "Basic";
      case Plan.PREMIUM: return "Premium";
      case Plan.ENTERPRISE: return "Enterprise";
      default: return plan;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan Distribution</CardTitle>
        <CardDescription>
          Quantity of clients in each subscription plan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="w-full h-[160px]"
          config={{
            clients: { label: "Clientes" },
          }}
        >
          <BarChart
            accessibilityLayer
            data={planData}
            width={undefined}
            height={undefined}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="plan"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="clients"
              fill="var(--primary)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
