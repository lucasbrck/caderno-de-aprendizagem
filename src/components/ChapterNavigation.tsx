import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Lesson } from '../data'
import { formatChapterNumber } from '../lib/chapters'

interface ChapterNavigationProps {
  index: number
  previous?: Lesson
  next?: Lesson
}

const linkClassName = 'flex items-center gap-2 hover:text-[#a0783c]'

export function ChapterNavigation({
  index,
  previous,
  next,
}: ChapterNavigationProps) {
  return (
    <nav
      className="mt-10 flex items-center justify-between border-t border-[#dfd9c9] pt-5 text-[9px] mobile:text-[8px]"
      aria-label="Navegar pelo livro"
    >
      {previous ? (
        <Link
          to="/aula/$lessonId"
          params={{ lessonId: previous.id }}
          className={linkClassName}
        >
          <ArrowLeft size={16} /> Anterior
        </Link>
      ) : (
        <Link to="/" className={linkClassName}>
          <ArrowLeft size={16} /> Capa
        </Link>
      )}
      <span className="font-[Georgia,serif] text-[#a09a86]">
        {formatChapterNumber(index + 1)}
      </span>
      {next ? (
        <Link
          to="/aula/$lessonId"
          params={{ lessonId: next.id }}
          className={linkClassName}
        >
          Próximo capítulo <ArrowRight size={16} />
        </Link>
      ) : (
        <Link to="/" className={linkClassName}>
          Voltar à capa <ArrowRight size={16} />
        </Link>
      )}
    </nav>
  )
}
