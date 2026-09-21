import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Lesson, LessonCategory } from '../data'
import { formatChapterNumber } from '../lib/chapters'

interface ChapterNavigationProps {
  index: number
  category: LessonCategory
  previous?: Lesson
  next?: Lesson
}

const linkClassName = 'flex items-center gap-2 hover:text-[#a0783c]'

export function ChapterNavigation({
  index,
  category,
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
          to="/categoria/$category/aula/$lessonId"
          params={{ category, lessonId: previous.id }}
          className={linkClassName}
        >
          <ArrowLeft size={16} /> Anterior
        </Link>
      ) : (
        <Link
          to="/categoria/$category"
          params={{ category }}
          className={linkClassName}
        >
          <ArrowLeft size={16} /> Conteúdos
        </Link>
      )}
      <span className="font-[Georgia,serif] text-[#a09a86]">
        {formatChapterNumber(index + 1)}
      </span>
      {next ? (
        <Link
          to="/categoria/$category/aula/$lessonId"
          params={{ category, lessonId: next.id }}
          className={linkClassName}
        >
          Próximo capítulo <ArrowRight size={16} />
        </Link>
      ) : (
        <Link
          to="/categoria/$category"
          params={{ category }}
          className={linkClassName}
        >
          Voltar aos conteúdos <ArrowRight size={16} />
        </Link>
      )}
    </nav>
  )
}
