import { useState } from 'react'
import { Plan } from '@/enums'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Edit2 } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/use-auth'
import { updatePlanPrice } from '@/lib/supabase/plans'
import { PlanProduct } from './types'

export const PlanProducts = ({
  plans
}: {
  plans: { plan: Plan; price: number }[]
}) => {
  const { user } = useAuth()
  const products: PlanProduct[] = [
    {
      plan: Plan.BASIC,
      price: plans.find((p) => p.plan === Plan.BASIC)?.price || 9.99,
      name: 'Basic'
    },
    {
      plan: Plan.PREMIUM,
      price: plans.find((p) => p.plan === Plan.PREMIUM)?.price || 29.99,
      name: 'Premium'
    },
    {
      plan: Plan.ENTERPRISE,
      price: plans.find((p) => p.plan === Plan.ENTERPRISE)?.price || 99.99,
      name: 'Enterprise'
    }
  ]

  const [editingId, setEditingId] = useState<Plan | null>(null)
  const [editPrice, setEditPrice] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleEdit = (product: PlanProduct) => {
    setEditingId(product.plan)
    setEditPrice(product.price)
  }

  const handleSave = async () => {
    try {
      setIsLoading(true)

      await updatePlanPrice({
        plan: editingId!,
        price: editPrice
      })

      toast.success('Plan price updated successfully!')
    } catch (error) {
      console.error('Error updating plan price:', error)
      toast.error('Failed to update plan price')
    } finally {
      setIsLoading(false)
      setEditingId(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Plans</CardTitle>
        <CardDescription>
          Manage the prices of plans offered to clients
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.map((product) => (
          <Card key={product.plan} className="border border-muted">
            <CardContent>
              {editingId === product.plan ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <div className="flex-1">
                      <Input
                        type="number"
                        value={editPrice}
                        onChange={(e) =>
                          setEditPrice(parseFloat(e.target.value))
                        }
                        className="w-32"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave} disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <div className="text-xl font-bold">
                      ${product.price.toFixed(2)}/month
                    </div>
                  </div>

                  {user && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit2 className="h-4 w-4" />
                      <span>Edit</span>
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
