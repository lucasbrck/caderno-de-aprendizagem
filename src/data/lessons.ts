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
      googleSlidesIframe:
        'https://docs.google.com/presentation/d/e/2PACX-1vTR7VX26NzF0xhnRP7oTQ0BS2Z63YW81NT_8T16ujjVxaNIAyqjyec1taEq9Q4cDT7t9xUJTBHM0LP6/pubembed?start=false&loop=false&delayms=60000',
      thumbnail: '',
      accent: 'bg-ink',
      files: [],
    },
  ],
  Morfologia: [],
  Sintaxe: [],
  Semântica: [],
}

export const allLessons = lessonCategories.flatMap(
  (category) => lessons[category],
)

export function isLessonCategory(value: string): value is LessonCategory {
  return lessonCategories.includes(value as LessonCategory)
}
