import { Outlet } from '@tanstack/react-router'
import { usePageTransition } from '../hooks/usePageTransition'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

export function AppShell() {
  const { pathname, turning, direction, turnPage } = usePageTransition()

  return (
    <div
      className="desk-texture flex min-h-screen flex-col"
      onClickCapture={turnPage}
    >
      <a
        className="fixed left-3 -top-[100px] z-10 bg-[#f3d78c] p-3 focus:top-3"
        href="#main-content"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="book-stage flex-1 overflow-x-clip focus:outline-none"
        aria-busy={turning}
      >
        <div
          key={pathname}
          data-direction={direction}
          data-state={turning ? 'turning' : 'arriving'}
          data-transition={`${turning ? 'out' : 'in'}-${direction}`}
          className="page-surface group/book data-[state=turning]:pointer-events-none"
        >
          <Outlet />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
