import { Link } from '@tanstack/react-router'
import { QuestionBaseContent } from './QuestionBaseContent'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react'
import type { QuizQuestion } from '../data/quiz'
import { BookPage } from './BookPage'
import { Eyebrow } from './BookTypography'
import { cn } from '../lib/utils'

type QuizProps = { title?: string; questions: QuizQuestion[] }
const actionClass =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-book-cover px-5 py-3 text-sm font-semibold text-white hover:bg-book-ink disabled:cursor-not-allowed disabled:opacity-40'

export function Quiz({ title = 'Hora de praticar', questions }: QuizProps) {
  // A new question list starts a fresh attempt, including when supplied by an API.
  return (
    <QuizAttempt
      key={JSON.stringify(questions)}
      title={title}
      questions={questions}
    />
  )
}

function QuizAttempt({ title, questions }: QuizProps) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Map<string, string>>(() => new Map())
  const [finished, setFinished] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const question = questions[index]
  const answered = questions.filter(
    (item) => answers.get(item.id) !== undefined,
  ).length
  const score = questions.filter(
    (item) => answers.get(item.id) === item.correctOptionId,
  ).length
  const invalid =
    new Set(questions.map((item) => item.id)).size !== questions.length ||
    questions.some(
      (item) =>
        !item.id.trim() ||
        !item.prompt.trim() ||
        item.options.length < 2 ||
        new Set(item.options.map((option) => option.id)).size !==
        item.options.length ||
        item.options.some(
          (option) => !option.id.trim() || !option.text.trim(),
        ) ||
        !item.options.some((option) => option.id === item.correctOptionId),
    )

  useEffect(() => {
    heading.current?.focus({ preventScroll: true })
  }, [index, finished])

  function restart() {
    setAnswers(new Map())
    setIndex(0)
    setFinished(false)
  }

  return (
    <section
      className="mx-auto max-w-[900px] px-6 py-9 mobile:px-3"
      aria-labelledby="quiz-title"
    >
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/quiz"
          className="inline-flex items-center gap-2 text-sm hover:underline"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Todos os conteúdos
        </Link>
        <Eyebrow>PRATIQUE E DESCUBRA</Eyebrow>
      </div>
      <div className="open-book-single overflow-hidden rounded-lg">
        <BookPage>
          <Eyebrow className="text-book-hint">QUIZ • LÍNGUA PORTUGUESA</Eyebrow>
          <h1
            id="quiz-title"
            className="mb-3 mt-4 font-display text-5xl mobile:text-4xl"
          >
            {title}
          </h1>
          {!questions.length || invalid ? (
            <p className="py-8 text-sm" role="status">
              {invalid
                ? 'Não foi possível iniciar o quiz. Verifique os IDs, as alternativas e o gabarito das questões.'
                : 'Nenhuma questão disponível. Volte em breve para praticar!'}
            </p>
          ) : finished ? (
            <>
              <div className="my-8 rounded-xl border border-[#cbd4c5] bg-book-selected p-6">
                <h2
                  ref={heading}
                  tabIndex={-1}
                  className="font-display text-3xl focus:outline-none"
                >
                  Quiz concluído!
                </h2>
                <p className="mt-3 text-lg">
                  Você acertou{' '}
                  <strong>
                    {score} de {questions.length}
                  </strong>{' '}
                  questões ({Math.round((score / questions.length) * 100)}%).
                </p>
                <p className="mt-2 text-sm">
                  Cada tentativa é uma oportunidade de aprender. Confira suas
                  respostas abaixo.
                </p>
              </div>
              <ol className="space-y-6" aria-label="Revisão das respostas">
                {questions.map((item, position) => {
                  const correct = answers.get(item.id) === item.correctOptionId
                  return (
                    <li
                      key={item.id}
                      className="border-b border-[#e4ddce] pb-6"
                    >
                      <p
                        className={cn(
                          'mb-2 text-xs font-semibold',
                          correct ? 'text-[#356044]' : 'text-[#9b472f]',
                        )}
                      >
                        {correct ? 'Resposta correta' : 'Vamos revisar'}
                      </p>
                      <QuestionBaseContent base={item.base} />
                      <h3 className="text-justify font-semibold">
                        {position + 1}. {item.prompt}
                      </h3>
                      <p className="mt-3 text-sm">
                        Sua resposta:{' '}
                        {
                          item.options.find(
                            (option) => option.id === answers.get(item.id),
                          )?.text
                        }
                      </p>
                      {!correct && (
                        <p className="mt-2 text-sm font-semibold">
                          Resposta correta:{' '}
                          {
                            item.options.find(
                              (option) => option.id === item.correctOptionId,
                            )?.text
                          }
                        </p>
                      )}
                      {item.explanation && (
                        <p className="mt-3 text-sm leading-relaxed text-[#58645b]">
                          {item.explanation}
                        </p>
                      )}
                    </li>
                  )
                })}
              </ol>
              <button
                type="button"
                className={cn(actionClass, 'my-6')}
                onClick={restart}
              >
                <RotateCcw size={16} aria-hidden="true" /> Tentar novamente
              </button>
            </>
          ) : (
            <>
              <p className="text-sm leading-relaxed text-[#58645b]">
                Escolha uma alternativa por questão. Você pode revisar suas
                escolhas antes de finalizar.
              </p>
              <div className="mb-6 mt-8">
                <div
                  className="mb-2 flex justify-between gap-3 text-xs"
                  aria-live="polite"
                >
                  <span>
                    Questão {index + 1} de {questions.length}
                  </span>
                  <span>
                    {answered} de {questions.length} respondidas
                  </span>
                </div>
                <progress
                  className="h-2 w-full accent-book-cover"
                  value={answered}
                  max={questions.length}
                  aria-label="Questões respondidas"
                />
              </div>
              <nav
                className="mb-8 flex flex-wrap gap-2"
                aria-label="Navegar pelas questões"
              >
                {questions.map((item, position) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setIndex(position)}
                    aria-current={position === index ? 'step' : undefined}
                    aria-label={`Questão ${position + 1}${answers.get(item.id) !== undefined ? ', respondida' : ', não respondida'}`}
                    className={cn(
                      'flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-lg border px-2 text-sm',
                      position === index
                        ? 'border-book-cover bg-book-cover text-white'
                        : 'border-[#d5d0c1] hover:bg-book-selected',
                    )}
                  >
                    {position + 1}
                    {answers.get(item.id) !== undefined && (
                      <Check size={12} aria-hidden="true" />
                    )}
                  </button>
                ))}
              </nav>
              <QuestionBaseContent base={question.base} />
              <h2
                id="question-title"
                ref={heading}
                tabIndex={-1}
                className="mb-6 text-justify font-display text-3xl leading-tight focus:outline-none"
              >
                {question.prompt}
              </h2>
              <fieldset
                key={question.id}
                aria-labelledby="question-title"
                className="space-y-3"
              >
                <legend className="sr-only">Selecione uma resposta</legend>
                {question.options.map((option, position) => (
                  <label
                    key={option.id}
                    className={cn(
                      'flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors focus-within:ring-2 focus-within:ring-book-focus',
                      answers.get(question.id) === option.id
                        ? 'border-book-cover bg-book-selected'
                        : 'border-[#d5d0c1] hover:bg-[#eeeade]',
                    )}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option.id}
                      checked={answers.get(question.id) === option.id}
                      onChange={() =>
                        setAnswers((previous) =>
                          new Map(previous).set(question.id, option.id),
                        )
                      }
                      className="size-4 shrink-0 accent-book-cover"
                    />
                    <span
                      className="text-xs font-semibold text-[#58645b]"
                      aria-hidden="true"
                    >
                      {String.fromCharCode(65 + position)}.
                    </span>
                    <span className="break-words text-sm leading-relaxed">
                      {option.text}
                    </span>
                  </label>
                ))}
              </fieldset>
              <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-[#e4ddce] pt-6">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => setIndex(index - 1)}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft size={16} aria-hidden="true" /> Anterior
                </button>
                {index < questions.length - 1 ? (
                  <button
                    type="button"
                    className={actionClass}
                    onClick={() => setIndex(index + 1)}
                  >
                    Próxima <ArrowRight size={16} aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className={actionClass}
                    disabled={answered !== questions.length}
                    onClick={() => setFinished(true)}
                  >
                    Finalizar quiz <Check size={16} aria-hidden="true" />
                  </button>
                )}
              </div>
              {index === questions.length - 1 &&
                answered < questions.length && (
                  <p className="mt-4 text-sm text-[#58645b]" role="status">
                    Responda todas as questões para finalizar. Use os números
                    acima para voltar às que faltam.
                  </p>
                )}
            </>
          )}
        </BookPage>
      </div>
    </section>
  )
}
