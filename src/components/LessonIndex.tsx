import { BookOpen } from 'lucide-react'
import { lessons } from '../data'
import { ChapterLink } from './ChapterLink'
import { Eyebrow } from './BookTypography'

export function LessonIndex({ lessonId }: { lessonId: string }) {
  return (
    <aside className="lesson-index relative flex flex-col border-r border-[#b8b09e] px-7 pb-[25px] pt-10 tablet:border-b tablet:border-r-0 tablet:border-b-[#d8d0bd] tablet:p-[22px] mobile:px-[9px] mobile:py-[14px]">
      <div className="tablet:hidden">
        <Eyebrow className="text-[7px] tracking-[1.5px] text-[#8c8c79]">
          LÍNGUA PORTUGUESA
        </Eyebrow>
        <h2 className="mb-[14px] mt-[18px] font-display text-[39px] font-normal leading-[1.05]">
          Um mundo
          <br />
          entre <em className="font-normal">palavras.</em>
        </h2>
        <p className="text-[10px] leading-[1.9] text-[#939082]">
          Pequenas descobertas.
          <br />
          Grandes aprendizados.
        </p>
      </div>
      <nav
        className="mt-[35px] tablet:m-0 tablet:flex tablet:gap-[6px]"
        aria-label="Capítulos"
      >
        {lessons.map((lesson, index) => (
          <ChapterLink
            key={lesson.id}
            lesson={lesson}
            index={index}
            variant="index"
            active={lesson.id === lessonId}
          />
        ))}
      </nav>
      <div className="mt-auto flex items-center gap-3 pt-10 text-[#8c917c] tablet:hidden">
        <BookOpen size={24} strokeWidth={1.3} />
        <span className="text-[9px] leading-[1.7]">
          Todo aprendizado começa
          <br />
          com uma boa pergunta.
        </span>
      </div>
      <span className="mt-8 text-center text-[7px] tracking-[1.5px] text-[#959181] tablet:hidden">
        ÍNDICE
      </span>
    </aside>
  )
}
