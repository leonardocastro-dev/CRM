'use client'

import { useIsMobile } from '@/hooks/use-mobile'
import { SidebarNav } from '@/components/layout/sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ReactNode, useEffect } from 'react'
import { useData } from './store'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile()
  const { fetchData, initClientsRealtime, initPlansRealtime } = useData()

  useEffect(() => {
    fetchData()
    initClientsRealtime()
    initPlansRealtime()
  }, [fetchData, initClientsRealtime, initPlansRealtime])

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SidebarNav />
        <main className="flex-1 overflow-y-auto">
          <div className="flex items-center h-16 px-4 border-b">
            {isMobile && <SidebarTrigger />}
            <h1 className="text-xl font-bold ml-4">CRM System</h1>
          </div>
          <div className="container py-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
