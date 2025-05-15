'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Users, LogIn, LogOut, BarChart } from 'lucide-react'
import { routes } from '@/routes'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/data'

export function SidebarNav() {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <Sidebar>
      <SidebarHeader className="px-2 py-4">
        <div className="flex items-center px-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            C
          </div>
          <span className="ml-2 text-lg font-bold">CRM System</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.path}>
                  <SidebarMenuButton
                    onClick={() => router.push(route.path)}
                    className={cn({
                      'bg-sidebar-accent text-sidebar-accent-foreground':
                        pathname === route.path
                    })}
                  >
                    {route.path === '/' ? (
                      <BarChart className="w-4 h-4 mr-2" />
                    ) : (
                      <Users className="w-4 h-4 mr-2" />
                    )}
                    <span>{route.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2">
          {user ? (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                Logged in as: <span className="font-medium">{user.email}</span>
              </p>
              <Button
                onClick={() => supabase.auth.signOut()}
                variant="outline"
                className="w-full justify-start"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => router.push('/login')}
              variant="outline"
              className="w-full justify-start"
            >
              <LogIn className="w-4 h-4 mr-2" />
              <span>Login</span>
            </Button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
