'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

// Root
function Drawer({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="drawer" {...props} />
}

// Trigger
function DrawerTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

// Portal
function DrawerPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="drawer-portal" {...props} />
}

// Overlay
function DrawerOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
        className
      )}
      {...props}
    />
  )
}

// Content
function DrawerContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          'fixed bottom-0 z-50 flex w-full flex-col rounded-t-lg border-t bg-background p-4 shadow-lg transition-transform data-[state=open]:animate-slideInUp data-[state=closed]:animate-slideOutDown sm:max-w-sm',
          className
        )}
        {...props}
      >
        <div className="mx-auto mb-2 h-1.5 w-[80px] rounded-full bg-muted" />
        {children}
      </DialogPrimitive.Content>
    </DrawerPortal>
  )
}

// Header
function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('mb-2 flex flex-col gap-1 text-center sm:text-left', className)}
      {...props}
    />
  )
}

// Footer
function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mt-auto flex flex-col gap-2', className)} {...props} />
}

// Title
function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  )
}

// Description
function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

// Close
function DrawerClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="drawer-close" {...props} />
}

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose
}
