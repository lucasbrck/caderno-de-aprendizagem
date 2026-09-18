import {
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../lib/utils'

export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'soft' | 'outline'
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold',
        variant === 'primary' &&
          'bg-ink text-white hover:-translate-y-0.5 hover:bg-[#22476b]',
        variant === 'ghost' && 'text-ink/60 hover:bg-lilac hover:text-ink',
        variant === 'soft' && 'bg-lilac text-ink hover:bg-[#dde7f1]',
        variant === 'outline' &&
          'border border-[#dfe5ed] bg-white text-ink hover:border-ink/30',
        className,
      )}
      {...props}
    />
  )
}
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-3xl border border-[#dfe5ed] bg-white', className)}
      {...props}
    />
  )
}
export function Badge({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-3 py-1 text-xs font-extrabold',
        className,
      )}
    >
      {children}
    </span>
  )
}
export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-xl border border-[#dfe5ed] bg-white px-4 py-3 text-sm outline-none placeholder:text-ink/35 focus:border-coral focus:ring-4 focus:ring-coral/10',
        className,
      )}
      {...props}
    />
  )
}
