import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
  className={cn(
  `
    flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base
    file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground
    placeholder:text-gray-600

    focus:outline-none focus:ring-4 focus:!ring-violet-900 focus:!border-violet-900 focus:ring-offset-2 focus:ring-offset-white
    disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
  `,
  className
)}



        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
