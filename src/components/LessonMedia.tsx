import { ExternalLink, Play, Presentation } from 'lucide-react'
import type { Lesson } from '../data/lessons'
import { getGoogleSlidesSrc } from '../lib/google-slides'
import { Eyebrow } from './BookTypography'

export function LessonMedia({ lesson }: { lesson: Lesson }) {
  const youtubeId = lesson.youtubeId?.trim()
  const slidesSrc = youtubeId
    ? null
    : getGoogleSlidesSrc(lesson.googleSlidesIframe)
  const MediaIcon = slidesSrc ? Presentation : Play
  const externalUrl = youtubeId
    ? `https://www.youtube.com/watch?v=${youtubeId}`
    : slidesSrc
  return (
    <>
      <div className="mt-7 aspect-video w-full border-[5px] border-[#fffdf6] bg-book-cover shadow-[0_2px_10px_#38382b17]">
        {youtubeId ? (
          <iframe
            key={youtubeId}
            className="size-full border-0"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
            title={`Videoaula: ${lesson.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : slidesSrc ? (
          <iframe
            key={slidesSrc}
            className="size-full border-0"
            src={slidesSrc}
            title={`Apresentação: ${lesson.title}`}
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <div
            className="video-placeholder flex h-full flex-col items-center justify-center text-center text-book-gold"
            role="img"
            aria-label={`Prévia da videoaula: ${lesson.title}`}
          >
            <span className="mb-4 grid size-[49px] place-items-center rounded-full border border-[#cfc89f66] pl-[3px] mobile:mb-[9px] mobile:size-[35px]">
              <Play size={25} strokeWidth={1.4} />
            </span>
            <Eyebrow className="text-[7px] text-[#aabaaf] mobile:hidden">
              VIDEOAULA
            </Eyebrow>
            <h2 className="mx-[10px] my-2 font-display text-[24px] font-normal mobile:text-[20px]">
              {lesson.title}
            </h2>
            <p className="mx-3 text-[9px] text-[#b1c2b9] mobile:text-[8px]">
              {lesson.category} · {lesson.duration}
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-between gap-2 px-[3px] py-3 text-[6px] tracking-[1px] text-[#9a9786] mobile:text-[5px] mobile:tracking-[.6px]">
        <span className="flex items-center gap-[6px]">
          <MediaIcon size={12} />
          {slidesSrc
            ? 'EXPLORE OS SLIDES E DESCUBRA'
            : 'ASSISTA, PAUSE E DESCUBRA'}
        </span>
        {externalUrl && (
          <a
            className="flex items-center gap-[6px]"
            href={externalUrl}
            target="_blank"
            rel="noreferrer"
          >
            {slidesSrc ? 'Abrir apresentação' : 'Ver no YouTube'}{' '}
            <ExternalLink size={12} />
          </a>
        )}
      </div>
    </>
  )
}
