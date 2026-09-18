import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'

export function CoverLink({ children }: { children: ReactNode }) {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-[11px] hover:text-[#a17738]"
    >
      <ArrowLeft size={16} /> {children}
    </Link>
  )
}
