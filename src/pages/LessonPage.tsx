import { useParams } from '@tanstack/react-router'
import { BookOpen, Clock3 } from 'lucide-react'
import { isLessonCategory, lessons } from '../data'
import { BookHint, Eyebrow } from '../components/BookTypography'
import { CoverLink } from '../components/BookTextLink'
import { BookPage } from '../components/BookPage'
import { ChapterNavigation } from '../components/ChapterNavigation'
import { LessonIndex } from '../components/LessonIndex'
import { LessonMedia } from '../components/LessonMedia'
import { formatChapterNumber } from '../lib/chapters'

export function LessonPage() {
  const { category: categoryParam, lessonId } = useParams({
    from: '/categoria/$category/aula/$lessonId',
  })
  const category = isLessonCategory(categoryParam) ? categoryParam : undefined
  const categoryLessons = category ? lessons[category] : []
  const index = categoryLessons.findIndex((item) => item.id === lessonId)
  const lesson = categoryLessons[index]

  if (!lesson) {
    return (
      <section className="flex min-h-[65vh] flex-col items-center justify-center gap-[25px] p-[25px] text-center">
        <BookOpen size={40} />
        <h1 className="font-[Georgia,serif] font-normal">
          Este capítulo não foi encontrado.
        </h1>
        <CoverLink>Voltar à capa</CoverLink>
      </section>
    )
  }

  return (
    <section
      className="m-auto max-w-[1200px] px-[35px] pb-[25px] pt-[34px] wide:pt-[55px] tablet:px-5 tablet:py-[25px] mobile:px-3 mobile:py-6"
      aria-labelledby="lesson-title"
    >
      <div className="mb-[22px] flex items-center justify-between text-[#777d74]">
        <CoverLink>Fechar livro</CoverLink>
        <Eyebrow className="tablet:hidden">SEU LIVRO DE DESCOBERTAS</Eyebrow>
        <span className="text-[8px] tracking-[1px]">
          CAPÍTULO {formatChapterNumber(index + 1)} /{' '}
          {formatChapterNumber(categoryLessons.length)}
        </span>
      </div>
      <div className="open-book grid grid-cols-[.8fr_1.65fr] rounded-[5px_9px_9px_5px] tablet:grid-cols-1">
        <LessonIndex category={category!} />
        <BookPage>
          <div>
            <Eyebrow className="text-[#8a8b74]">
              CAPÍTULO {formatChapterNumber(index + 1)}{' '}
              <span className="mx-[9px] text-[#b4b09b]">/</span>{' '}
              {lesson.category.toUpperCase()}
            </Eyebrow>
            <h1
              id="lesson-title"
              tabIndex={-1}
              className="my-[15px] font-display text-[43px] font-normal leading-[1.1] tracking-[-.8px] tablet:text-[38px] mobile:text-[34px]"
            >
              {lesson.title}
            </h1>
            <div className="flex gap-5 text-[9px] text-[#8c8d80]">
              <span className="flex items-center gap-[5px]">
                {lesson.className}
              </span>
              <span className="flex items-center gap-[5px]">
                <Clock3 size={13} /> {lesson.duration}
              </span>
            </div>
          </div>
          <LessonMedia lesson={lesson} />
          <div className="mt-[15px] flex gap-4 border-t border-[#e4ddce] pt-6">
            <span className="whitespace-nowrap pt-1 text-[9px] text-[#a78c53]">
              01 /
            </span>
            <div>
              <h2 className="text-[13px] font-medium">O que vamos explorar</h2>
              <p className="mt-[9px] text-[11px] leading-[1.9] text-[#86897c]">
                {lesson.description}
              </p>
            </div>
          </div>
          <ChapterNavigation
            index={index}
            category={category!}
            previous={categoryLessons[index - 1]}
            next={categoryLessons[index + 1]}
          />
        </BookPage>
      </div>
      <BookHint className="text-center">
        Cada página, uma nova possibilidade.
      </BookHint>
    </section>
  )
}
