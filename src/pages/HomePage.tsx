import { BookCover } from '../components/BookCover'
import { BookHint, Eyebrow } from '../components/BookTypography'

export function HomePage() {
  return (
    <section
      className="flex flex-col items-center px-6 py-[30px] short-desktop:pt-[22px] mobile:px-[18px]"
      aria-labelledby="book-title"
    >
      <div className="mb-9 text-center short-desktop:mb-6">
        <Eyebrow className="text-[#8d897e]">SEU LIVRO DE DESCOBERTAS</Eyebrow>
        <p className="mt-[7px] font-display text-[25px] tracking-[.1px] mobile:text-[22px]">
          O próximo capítulo começa com você.
        </p>
      </div>
      <BookCover />
      <BookHint className="mt-[47px] bookmarks:mt-6">
        <span
          aria-hidden="true"
          className="mr-2 inline-block rotate-[-20deg] text-[20px]"
        >
          ↳
        </span>{' '}
        Abra a capa ou escolha uma seção.
      </BookHint>
    </section>
  )
}
