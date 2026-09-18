import type { HTMLAttributes } from 'react'
import { cn } from '../lib/utils'

export function BookPage({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <article
      className={cn(
        'lesson-paper min-w-0 px-[38px] pb-[22px] pt-10 tablet:p-[30px] mobile:px-5 mobile:pb-5 mobile:pt-[25px]',
        'motion-safe:group-data-[transition=out-forward]/book:animate-leaf-out',
        'motion-safe:group-data-[transition=out-backward]/book:animate-leaf-out-back',
        'motion-safe:group-data-[transition=in-forward]/book:animate-leaf-in',
        'motion-safe:group-data-[transition=in-backward]/book:animate-leaf-in-back',
        'motion-safe:group-data-[state=turning]/book:after:animate-leaf-shading-out',
        'motion-safe:group-data-[state=arriving]/book:after:animate-leaf-shading-in',
        'motion-reduce:animate-none motion-reduce:after:animate-none',
        className,
      )}
      {...props}
    />
  )
}
