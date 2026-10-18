import { Link, useParams } from '@tanstack/react-router'
import { quizContents } from '../data/quiz'
import { Quiz } from '../components/Quiz'
import { BookPage } from '../components/BookPage'
import { CoverLink } from '../components/BookTextLink'
import { Eyebrow } from '../components/BookTypography'

export function QuizPage() {
  return (
    <section className="mx-auto max-w-[900px] px-6 py-9 mobile:px-3">
      <div className="mb-6">
        <CoverLink>Voltar à capa</CoverLink>
      </div>
      <div className="open-book-single grid grid-cols-[1fr] overflow-hidden rounded-lg">
        <BookPage>
          <Eyebrow>QUIZ • LÍNGUA PORTUGUESA</Eyebrow>
          <h1 className="mb-3 mt-4 font-display text-5xl mobile:text-4xl">
            Conteúdos
          </h1>
          <p className="mb-8 text-sm text-[#58645b]">
            Escolha um conteúdo para praticar suas questões.
          </p>
          <nav
            aria-label="Conteúdos de questões"
            className="divide-y divide-[#e4ddce] border-y border-[#e4ddce]"
          >
            {quizContents.map((content) => (
              <Link
                key={content.id}
                to="/quiz/$contentId"
                params={{ contentId: content.id }}
                className="flex items-center justify-between gap-4 px-3 py-6 hover:bg-book-selected"
              >
                <span className="font-display text-2xl">{content.title}</span>
                <span className="text-sm text-[#58645b]">
                  {content.questions.length}{' '}
                  {content.questions.length === 1 ? 'questão' : 'questões'}
                </span>
              </Link>
            ))}
          </nav>
          {!quizContents.length && (
            <p role="status" className="py-8">
              Nenhum conteúdo disponível. Volte em breve!
            </p>
          )}
        </BookPage>
      </div>
    </section>
  )
}

export function QuizContentPage() {
  const { contentId } = useParams({ from: '/quiz/$contentId' })
  const content = quizContents.find((item) => item.id === contentId)

  if (!content) {
    return (
      <section className="mx-auto max-w-[900px] px-6 py-9">
        <h1 className="mb-6 font-display text-3xl">
          Este conteúdo não foi encontrado.
        </h1>
        <Link to="/quiz" className="underline">
          Voltar aos conteúdos
        </Link>
      </section>
    )
  }

  return (
    <Quiz
      key={content.id}
      title={content.title}
      questions={content.questions}
    />
  )
}
