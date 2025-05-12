import { useAuth } from "@/hooks/use-auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { ClientForm } from "./client-form";
import { renderPlanBadge, renderStatusBadge } from "../templates/badge-templates";
import { ViewClientDialogProps } from "../types";
import { formatDate } from "@/lib/utils";
import useDialogStore from "../store";

export function ViewClientDialog({
  open,
  onOpenChange,
  client,
}: ViewClientDialogProps) {
  const { user } = useAuth();
  const { editDialogOpen, setEditDialogOpen } = useDialogStore();

  if (!client) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Client Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{client.name}</CardTitle>
                  <CardDescription>{client.email}</CardDescription>
                </div>
                {user && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditDialogOpen(client.id);
                      onOpenChange(false);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">ID:</dt>
                    <dd>{client.id}</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="font-medium text-muted-foreground">Plan:</dt>
                    <dd>{renderPlanBadge(client.plan)}</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="font-medium text-muted-foreground">Status:</dt>
                    <dd>{renderStatusBadge(client.status)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Created:</dt>
                    <dd>{formatDate(client.created_at)}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {editDialogOpen && (
        <ClientForm
          open={editDialogOpen !== null}
          onOpenChange={(open) => {
            setEditDialogOpen(open ? client.id : null);
            if (!open) {
              onOpenChange(true);
            }
          }}
          mode="edit"
          client={client}
        />
      )}
    </>
  );
}
