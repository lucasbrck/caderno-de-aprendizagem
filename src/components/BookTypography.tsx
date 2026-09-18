import type { HTMLAttributes } from 'react'
import { cn } from '../lib/utils'

export function Eyebrow({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('text-[8px] font-semibold tracking-[2px]', className)}
      {...props}
    />
  )
}

export function BookHint({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'mt-8 text-[10px] tracking-[.3px] text-book-hint mobile:text-[9px]',
        className,
      )}
      {...props}
    />
  )
}
