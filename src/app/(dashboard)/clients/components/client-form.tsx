import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Client } from '@/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { toast } from 'sonner'
import { addClient, updateClient } from '@/lib/supabase/clients'
import { ClientFormProps } from '../types'
import { Plan, Status } from '@/enums'

export function ClientForm({
  open,
  onOpenChange,
  mode,
  client: initialClient
}: ClientFormProps) {
  const [formData, setFormData] = useState<Partial<Client>>(
    initialClient || {
      name: '',
      email: '',
      plan: Plan.FREE,
      status: Status.PENDING
    }
  )

  const handleChange = (field: keyof Client, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (mode === 'add') {
        const newClient: Client = {
          id: crypto.randomUUID(),
          name: formData.name || '',
          email: formData.email || '',
          plan: formData.plan || Plan.FREE,
          status: formData.status || Status.PENDING,
          created_at: new Date().getTime()
        }

        await addClient(newClient)
        toast.success('Client added successfully!')
      } else if (initialClient) {
        await updateClient({
          ...initialClient,
          ...formData
        })
        toast.success('Client updated successfully!')
      }

      onOpenChange(false)

      if (mode === 'add') {
        setFormData({
          name: '',
          email: '',
          plan: Plan.FREE,
          status: Status.PENDING
        })
      }
    } catch (error) {
      console.error('Error processing client:', error)
      toast.error('An error occurred while processing the client.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add Client' : 'Edit Client'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="plan">Plan</Label>
            <Select
              value={formData.plan}
              onValueChange={(value) => handleChange('plan', value as Plan)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Plan.FREE}>Free</SelectItem>
                <SelectItem value={Plan.BASIC}>Basic</SelectItem>
                <SelectItem value={Plan.PREMIUM}>Premium</SelectItem>
                <SelectItem value={Plan.ENTERPRISE}>Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange('status', value as Status)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Status.ACTIVE}>Active</SelectItem>
                <SelectItem value={Status.PENDING}>Pending</SelectItem>
                <SelectItem value={Status.INACTIVE}>Inactive</SelectItem>
                <SelectItem value={Status.CANCELLED}>Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">{mode === 'add' ? 'Add' : 'Save'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
