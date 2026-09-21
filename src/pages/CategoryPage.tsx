import { useParams } from '@tanstack/react-router'
import { BookOpen } from 'lucide-react'
import { isLessonCategory, lessons } from '../data'
import { BookHint, Eyebrow } from '../components/BookTypography'
import { CoverLink } from '../components/BookTextLink'
import { BookPage } from '../components/BookPage'
import { ChapterLink } from '../components/ChapterLink'
import { LessonIndex } from '../components/LessonIndex'

export function CategoryPage() {
  const { category: categoryParam } = useParams({
    from: '/categoria/$category',
  })
  const category = isLessonCategory(categoryParam) ? categoryParam : undefined

  if (!category) {
    return (
      <section className="flex min-h-[65vh] flex-col items-center justify-center gap-[25px] p-[25px] text-center">
        <BookOpen size={40} />
        <h1 className="font-[Georgia,serif] font-normal">
          Esta seção não foi encontrada.
        </h1>
        <CoverLink>Voltar à capa</CoverLink>
      </section>
    )
  }

  const categoryLessons = lessons[category]

  return (
    <section
      className="m-auto max-w-[1200px] px-[35px] pb-[25px] pt-[34px] wide:pt-[55px] tablet:px-5 tablet:py-[25px] mobile:px-3 mobile:py-6"
      aria-labelledby="category-title"
    >
      <div className="mb-[22px] flex items-center justify-between text-[#777d74]">
        <CoverLink>Fechar livro</CoverLink>
        <Eyebrow className="tablet:hidden">SEU LIVRO DE DESCOBERTAS</Eyebrow>
        <span className="text-[8px] tracking-[1px]">CONTEÚDOS</span>
      </div>
      <div className="open-book grid grid-cols-[.8fr_1.65fr] rounded-[5px_9px_9px_5px] tablet:grid-cols-1">
        <LessonIndex category={category} />
        <BookPage>
          <Eyebrow className="text-[#8a8b74]">SEÇÃO</Eyebrow>
          <h1
            id="category-title"
            tabIndex={-1}
            className="my-[15px] font-display text-[43px] font-normal leading-[1.1] tracking-[-.8px] tablet:text-[38px] mobile:text-[34px]"
          >
            {category}
          </h1>
          <p className="mb-8 text-[11px] leading-[1.9] text-[#86897c]">
            Escolha um conteúdo para abrir os slides.
          </p>
          {categoryLessons.length ? (
            <nav
              className="border-y border-[#e4ddce]"
              aria-label={`Conteúdos de ${category}`}
            >
              {categoryLessons.map((lesson, index) => (
                <ChapterLink
                  key={lesson.id}
                  lesson={lesson}
                  category={category}
                  index={index}
                  variant="index"
                />
              ))}
            </nav>
          ) : (
            <p className="border-y border-[#e4ddce] py-8 text-[11px] leading-[1.9] text-[#86897c]">
              Os conteúdos desta seção serão adicionados em breve.
            </p>
          )}
        </BookPage>
      </div>
      <BookHint className="text-center">
        Cada página, uma nova possibilidade.
      </BookHint>
    </section>
  )
}
