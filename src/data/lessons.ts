export type Lesson = {
  id: string
  title: string
  subject: string
  category:
  'Leitura' | 'Gramática' | 'Escrita' | 'Literatura' | 'Produção de Texto'
  className?: string
  duration?: string
  description: string
  thumbnail: string
  youtubeId?: string
  /** Cole o iframe de incorporação do Google Slides ou apenas seu src. */
  googleSlidesIframe?: string
  accent: string
  watched?: number
  files: { name: string; type: string; size: string }[]
}

export const lessonCategories = [
  '2º Ano',
  'Morfologia',
  'Sintaxe',
  'Semântica',
] as const

export type LessonCategory = (typeof lessonCategories)[number]

export const lessons: Record<LessonCategory, Lesson[]> = {
  '2º Ano': [
    {
      id: 'producao-de-texto',
      title: 'Texto Dissertativo-Argumentativo',
      subject: 'Língua Portuguesa',
      category: 'Produção de Texto',
      description:
        'Aprenda a escrever textos dissertativos-argumentativos, desenvolvendo habilidades de argumentação e estruturação de ideias.',
      youtubeId: '',
      googleSlidesIframe: 'https://docs.google.com/presentation/d/e/2PACX-1vTR7VX26NzF0xhnRP7oTQ0BS2Z63YW81NT_8T16ujjVxaNIAyqjyec1taEq9Q4cDT7t9xUJTBHM0LP6/pubembed?start=false&loop=false&delayms=60000',
      thumbnail: '',
      accent: 'bg-ink',
      files: [],
    },
    {
      id: 'pdt-desenvolvimento',
      title: 'Texto Dissertativo-Argumentativo - Desenvolvimento',
      subject: 'Língua Portuguesa',
      category: 'Produção de Texto',
      description:
        'Aprenda a construir parágrafos de desenvolvimento em textos dissertativos-argumentativos, organizando argumentos, explicando ideias e utilizando informações que fortaleçam a sua argumentação.',
      youtubeId: '',
      googleSlidesIframe: 'https://docs.google.com/presentation/d/e/2PACX-1vSWZDYijZltuirLAG4RSu_uWQ1czHEhAqCVDE2fNKSc7o27dK-SlQYFug991RwbQMWz7yVdiQajN3m-/pubembed?start=false&loop=false&delayms=3000',
      thumbnail: '',
      accent: 'bg-rose-200',
      files: [],
    },
    {
      id: 'escolas-literarias',
      title: 'Escolas Literárias - Era colonial',
      subject: 'Língua Portuguesa',
      category: 'Produção de Texto',
      description:
        '',
      youtubeId: '',
      googleSlidesIframe: 'https://docs.google.com/presentation/d/e/2PACX-1vTP-zna4rPa-o4TtYmA-D4HjTL8TiiRKamqq-2upQSt9AxcyiRH8pN7b9L1_P0MULklhP_swhknZPKm/pubembed?start=false&loop=false&delayms=3000',
      thumbnail: '',
      accent: 'bg-rose-200',
      files: [],
    }
  ],
  Morfologia: [],
  Sintaxe: [{
    id: 'sujeito-predicado',
    title: 'Sujeito e predicado',
    subject: 'Língua Portuguesa',
    category: 'Gramática',
    description:
      'Aprenda a identificar e compreender o sujeito e o predicado, reconhecendo suas funções e relações na construção das frases.',
    youtubeId: '',
    googleSlidesIframe: 'https://docs.google.com/presentation/d/e/2PACX-1vTGxkwjKHvDNlPUHRsx4ikSmvZavbiKUWXixi3-6wDFkCeVbZJ8NcOsSlGOGoonJNePjd2S--unE9Xu/pubembed?start=false&loop=false&delayms=3000',
    thumbnail: '',
    accent: 'bg-cyan-200',
    files: [],
  },],
  Semântica: [],
}

export const allLessons = lessonCategories.flatMap(
  (category) => lessons[category],
)

export function isLessonCategory(value: string): value is LessonCategory {
  return lessonCategories.includes(value as LessonCategory)
}
