import { Link } from '@tanstack/react-router'
import { MoveRight } from 'lucide-react'
import { useRef, type PointerEvent } from 'react'
import { lessonCategories } from '../data'
import { CategoryLink } from './CategoryLink'

export function BookCover() {
  const book = useRef<HTMLDivElement>(null)
  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (
      !window.matchMedia(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      ).matches
    )
      return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = Math.max(
      0,
      Math.min(1, (event.clientX - bounds.left) / bounds.width),
    )
    const y = Math.max(
      0,
      Math.min(1, (event.clientY - bounds.top) / bounds.height),
    )
    book.current?.style.setProperty('--tilt-y', `${-9 + (x - 0.5) * 9}deg`)
    book.current?.style.setProperty('--tilt-x', `${3 - (y - 0.5) * 6}deg`)
    book.current?.style.setProperty('--light-x', `${x * 100}%`)
  }
  function resetTilt() {
    book.current?.style.removeProperty('--tilt-y')
    book.current?.style.removeProperty('--tilt-x')
    book.current?.style.removeProperty('--light-x')
  }

  return (
    <div
      className="book-display relative w-[410px] max-w-[calc(100%-32px)] short-desktop:w-[350px] compact:w-[380px] bookmarks:w-[360px] bookmarks:max-w-[calc(100%-26px)]"
      onPointerMove={tilt}
      onPointerLeave={resetTilt}
    >
      <div className="book-ground-shadow" aria-hidden="true" />
      <div className="closed-book" ref={book}>
        <div className="hardcover-back" aria-hidden="true" />
        <div className="book-page-block" aria-hidden="true" />
        <div className="book-page-edge" aria-hidden="true" />
        <div className="book-bottom-edge" aria-hidden="true" />
        <div className="book-binding" aria-hidden="true">
          <span></span>
        </div>
        <div className="book-endpaper" aria-hidden="true">
          <span>
            Uma nova página.
            <br />
            <em>Um novo mundo.</em>
          </span>
        </div>
        <div className="cover-front motion-safe:group-data-[state=turning]/book:animate-hardcover-open motion-safe:group-data-[state=arriving]/book:animate-hardcover-close motion-reduce:animate-none">
          <Link
            to="/categoria/$category"
            params={{ category: lessonCategories[0] }}
            className="cover-face"
            aria-label="Abrir livro na seção 2º Ano"
          >
            <img
              className="block size-full rounded-[inherit] object-cover"
              src="/images/cover-discoveries-v2.png"
              alt=""
              width="1024"
              height="1536"
              fetchPriority="high"
            />
            <div className="absolute inset-0 pb-6 pl-[30px] pr-6 pt-[30px] text-center text-[#eddbac] short-desktop:pt-[25px] bookmarks:pt-[26px] tiny:pt-[22px]">
              <span className="text-[7px] tracking-[2px] text-[#e0c996] short-desktop:text-[6px] bookmarks:text-[6px] tiny:text-[5px] tiny:tracking-[1.5px]">
                LÍNGUA PORTUGUESA
              </span>
              <h1
                id="book-title"
                className="cover-title mt-3 font-display text-[44px] font-normal leading-[.98] tracking-[-.6px] short-desktop:text-[37px] compact:text-[40px] bookmarks:text-[37px] tiny:mt-[10px] tiny:text-[32px]"
              >
                {/* Entre palavras
                <br />e <em className="font-normal">descobertas.</em> */}
              </h1>
              <div className="absolute bottom-[29px] left-[35px] right-[30px] flex flex-col justify-between gap-[10px] text-[6px] tracking-[1.6px] text-[#d4bd86] short-desktop:bottom-6 bookmarks:bottom-6 tiny:bottom-[21px] tiny:gap-[7px] tiny:text-[5px]">
                <span>CADERNO DE APRENDIZAGEM</span>
                <span className="flex items-center justify-center gap-[10px] text-[8px] tiny:text-[7px]">
                  ABRIR LIVRO <MoveRight size={15} />
                </span>
              </div>
            </div>
          </Link>
          <div className="cover-inside" aria-hidden="true" />
        </div>
        <span className="book-ribbon" aria-hidden="true" />
      </div>
      <nav
        className="chapter-bookmarks absolute left-[calc(100%-9px)] top-[33%] flex w-[188px] flex-col gap-3 short-desktop:top-[30%] compact:w-40 bookmarks:relative bookmarks:left-auto bookmarks:top-auto bookmarks:mt-[38px] bookmarks:grid bookmarks:w-full bookmarks:grid-cols-2 bookmarks:gap-[9px]"
        aria-label="Escolha uma aula"
      >
        <span className="mb-[3px] pl-[25px] text-[7px] tracking-[1.5px] text-[#7e8070] bookmarks:col-span-full bookmarks:mb-[7px] bookmarks:mt-1 bookmarks:p-0 bookmarks:text-center">
          ESCOLHA UMA SEÇÃO
        </span>
        {lessonCategories.map((category) => (
          <CategoryLink key={category} category={category} variant="bookmark" />
        ))}
      </nav>
    </div>
  )
}
