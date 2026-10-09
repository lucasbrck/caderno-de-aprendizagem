import { quizQuestions } from '../data/quiz'
import { Quiz } from '../components/Quiz'

export function QuizPage() {
  return (
    <Quiz title="Entre perguntas e descobertas" questions={quizQuestions} />
  )
}
