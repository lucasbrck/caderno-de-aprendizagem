import { Link } from '@tanstack/react-router'
import { BookOpen } from 'lucide-react'
import { school } from '../data'

export function SiteHeader() {
  return (
    <header className="mx-[5%] flex h-[92px] items-center justify-between border-b border-[#223c461b] mobile:h-[76px]">
      <Link
        to="/"
        className="flex items-center gap-3"
        aria-label="Voltar à capa"
      >
        <span className="grid size-10 place-items-center rounded-full border border-[#223c4640] mobile:size-[34px]">
          <BookOpen size={23} strokeWidth={1.5} />
        </span>
        <span>
          <strong className="text-[15px] tracking-[-.4px] mobile:text-[13px]">
            {school.name}
          </strong>
          <small className="mt-1 block text-[7px] tracking-[1.8px] text-[#77807d] mobile:text-[6px] mobile:tracking-[1px]">
            ESPAÇO DE APRENDIZAGEM
          </small>
        </span>
      </Link>
      <div className="flex items-center gap-5 mobile:gap-3">
        <Link
          to="/quiz"
          className="rounded-lg border border-[#b8bcb1] px-4 py-3 text-xs font-semibold hover:bg-book-selected"
          activeProps={{ className: 'bg-book-selected' }}
        >
          Quiz
        </Link>
        <span className="flex items-center gap-[22px] text-[11px] text-[#777d76] mobile:hidden">
          Língua Portuguesa
          <span className="rounded-[3px] border border-[#b8bcb1] px-[9px] py-[6px] text-[8px] tracking-[1px] mobile:hidden">
            5º ANO
          </span>
        </span>
      </div>
    </header>
  )
}
