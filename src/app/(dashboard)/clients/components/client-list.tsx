import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Client } from '@/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Eye, Edit, Trash2, MoreVertical } from 'lucide-react'
import { ClientForm } from './client-form'
import { DeleteClientDialog } from './delete-client-dialog'
import { ViewClientDialog } from './view-client-dialog'
import {
  renderPlanBadge,
  renderStatusBadge
} from '../templates/badge-templates'
import { formatDate } from '@/lib/utils'
import useDialogStore from '../store'

export function ClientList({ clients }: { clients: Client[] }) {
  const { user } = useAuth()
  const { editDialogOpen, setEditDialogOpen } = useDialogStore()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<string | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clients</CardTitle>
        <CardDescription>Manage your company&apos;s clients</CardDescription>
      </CardHeader>
      <CardContent>
        {clients.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No clients found</p>
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{renderPlanBadge(client.plan)}</TableCell>
                    <TableCell>{renderStatusBadge(client.status)}</TableCell>
                    <TableCell>{formatDate(client.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setViewDialogOpen(client.id)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          {user && (
                            <>
                              <DropdownMenuItem
                                onClick={() => setEditDialogOpen(client.id)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => setDeleteDialogOpen(client.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      {/* Edit client dialog */}
      {editDialogOpen && (
        <ClientForm
          open={!!editDialogOpen}
          onOpenChange={() => setEditDialogOpen(null)}
          mode="edit"
          client={clients.find((c) => c.id === editDialogOpen)}
        />
      )}

      {/* Delete client dialog */}
      {deleteDialogOpen && (
        <DeleteClientDialog
          open={!!deleteDialogOpen}
          onOpenChange={() => setDeleteDialogOpen(null)}
          clientId={deleteDialogOpen}
        />
      )}

      {/* View client dialog */}
      {viewDialogOpen && (
        <ViewClientDialog
          open={!!viewDialogOpen}
          onOpenChange={() => setViewDialogOpen(null)}
          client={clients.find((c) => c.id === viewDialogOpen)}
        />
      )}
    </Card>
  )
}
