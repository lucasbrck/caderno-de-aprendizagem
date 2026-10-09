export type QuizQuestion = {
  id: string
  prompt: string
  options: { id: string; text: string }[]
  correctOptionId: string
  explanation?: string
}

// Substitua esta lista pelas suas questões. Use IDs únicos em cada lista.
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'substantivo',
    prompt: 'Qual das palavras abaixo é um substantivo?',
    options: [
      { id: 'a', text: 'Correr' },
      { id: 'b', text: 'Alegria' },
      { id: 'c', text: 'Bonito' },
      { id: 'd', text: 'Rapidamente' },
    ],
    correctOptionId: 'b',
    explanation: 'Alegria é um substantivo abstrato: dá nome a um sentimento.',
  },
  {
    id: 'pontuacao',
    prompt: 'Qual sinal de pontuação usamos ao fazer uma pergunta direta?',
    options: [
      { id: 'a', text: 'Ponto-final (.)' },
      { id: 'b', text: 'Vírgula (,)' },
      { id: 'c', text: 'Ponto de interrogação (?)' },
      { id: 'd', text: 'Ponto de exclamação (!)' },
    ],
    correctOptionId: 'c',
    explanation:
      'O ponto de interrogação encerra perguntas diretas, como “Qual é o seu nome?”.',
  },
  {
    id: 'verbo',
    prompt: 'Na frase “Os alunos leram um livro”, qual palavra é o verbo?',
    options: [
      { id: 'a', text: 'Alunos' },
      { id: 'b', text: 'Livro' },
      { id: 'c', text: 'Os' },
      { id: 'd', text: 'Leram' },
    ],
    correctOptionId: 'd',
    explanation:
      '“Leram” é uma forma do verbo ler e indica a ação realizada pelos alunos.',
  },
]
