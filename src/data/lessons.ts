export type Lesson = {
  id: string
  title: string
  subject: string
  category:
  'Leitura' | 'Gramática' | 'Escrita' | 'Literatura' | 'Produção de Texto'
  className: string
  duration: string
  description: string
  thumbnail: string
  youtubeId?: string
  /** Cole o iframe de incorporação do Google Slides ou apenas seu src. */
  googleSlidesIframe?: string
  accent: string
  watched?: number
  files: { name: string; type: string; size: string }[]
}
export const lessons: Lesson[] = [
  {
    id: 'producao-de-texto',
    title: 'Texto Dissertativo-Argumentativo',
    subject: 'Língua Portuguesa',
    category: 'Produção de Texto',
    className: '2º Ano',
    duration: '--',
    description:
      'Aprenda a escrever textos dissertativos-argumentativos, desenvolvendo habilidades de argumentação e estruturação de ideias.',
    youtubeId: '',
    // Cole aqui o iframe fornecido pelo Google Slides em Publicar na Web > Incorporar.
    googleSlidesIframe: 'https://docs.google.com/presentation/d/e/2PACX-1vTR7VX26NzF0xhnRP7oTQ0BS2Z63YW81NT_8T16ujjVxaNIAyqjyec1taEq9Q4cDT7t9xUJTBHM0LP6/pubembed?start=false&loop=false&delayms=60000',
    thumbnail: '',
    accent: 'bg-ink',
    files: [],
  },
]
