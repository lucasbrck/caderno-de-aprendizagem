import { school } from '../data'

export function SiteFooter() {
  return (
    <footer className="mx-[5%] flex justify-between gap-[15px] border-t border-[#223c461b] py-5 text-[9px] text-[#8c8c80] tablet:text-[8px] mobile:justify-center">
      <span>Um capítulo de cada vez. Um mundo de descobertas.</span>
      <span className="tablet:hidden">
        {school.name} <span className="mx-[7px]">·</span> Aprender nos
        transforma.
      </span>
    </footer>
  )
}
