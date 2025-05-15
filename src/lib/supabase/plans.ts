import { supabase } from '@/lib/supabase/data'
import { PlanPrice } from '@/types'

export async function updatePlanPrice(planPrice: PlanPrice) {
  const { error } = await supabase
    .from('plan_prices')
    .update({ price: planPrice.price })
    .eq('plan', planPrice.plan)

  if (error) {
    throw error
  }
}

export function listenToPlanChanges(
  onChange: (payload: {
    type: string
    new: PlanPrice | null
    old: PlanPrice | null
  }) => void
) {
  const channel = supabase
    .channel('plan-prices-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'plan_prices'
      },
      (payload) => {
        onChange({
          type: payload.eventType,
          new: payload.new as PlanPrice | null,
          old: payload.old as PlanPrice | null
        })
      }
    )
    .subscribe()

  return () => supabase.removeChannel(channel)
}
