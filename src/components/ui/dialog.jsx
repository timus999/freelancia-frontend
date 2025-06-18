"use client"

import React, { useState, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Dialog = ({ children, open, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(open || false)

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen)
    if (onOpenChange) {
      onOpenChange(newOpen)
    }
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isOpen,
            onOpenChange: handleOpenChange,
          })
        }
        return child
      })}
    </div>
  )
}

const DialogTrigger = ({ children, isOpen, onOpenChange }) => {
  const handleClick = () => {
    if (onOpenChange) {
      onOpenChange(true)
    }
  }

  return React.cloneElement(children, {
    onClick: handleClick,
  })
}

const DialogContent = ({ children, className, isOpen, onOpenChange }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onOpenChange) {
      onOpenChange(false)
    }
  }

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handleBackdropClick}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" />

      {/* Dialog */}
      <div
        className={cn(
          "relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto",
          className,
        )}
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  )
}

const DialogHeader = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left p-6 pb-0", className)}>{children}</div>
}

const DialogTitle = ({ children, className }) => {
  return <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>{children}</h2>
}

const DialogDescription = ({ children, className }) => {
  return <p className={cn("text-sm text-slate-500", className)}>{children}</p>
}

const DialogFooter = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-0", className)}>
      {children}
    </div>
  )
}

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter }
