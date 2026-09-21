import { useLocation, useRouter } from '@tanstack/react-router'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { allLessons, lessonCategories } from '../data'
import { PAGE_TURN_MS } from '../styles/book-motion.js'

export function usePageTransition() {
  const navigation = useRouter()
  const pathname = useLocation({ select: (location) => location.pathname })
  const [turning, setTurning] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const previousPath = useRef(pathname)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const pending = useRef(false)
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    const chapterPosition = (path: string) => {
      if (path === '/') return -1
      const lessonIndex = allLessons.findIndex((lesson) =>
        path.endsWith('/' + lesson.id),
      )
      if (lessonIndex >= 0) return lessonCategories.length + lessonIndex
      return lessonCategories.findIndex(
        (category) => path === `/categoria/${encodeURIComponent(category)}`,
      )
    }
    setDirection(
      chapterPosition(pathname) < chapterPosition(previousPath.current)
        ? 'backward'
        : 'forward',
    )
    previousPath.current = pathname
    clearTimeout(timer.current)
    pending.current = false
    setTurning(false)
    document.getElementById('main-content')?.focus({ preventScroll: true })
    document.title =
      pathname === '/'
        ? 'Entre palavras e descobertas | Nossa Escola'
        : 'Seu capítulo | Nossa Escola'
  }, [pathname])
  function turnPage(event: MouseEvent<HTMLDivElement>) {
    const anchor = (event.target as HTMLElement).closest('a')
    if (
      !anchor ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      anchor.target ||
      anchor.hasAttribute('download')
    )
      return
    const url = new URL(anchor.href)
    if (
      url.origin !== window.location.origin ||
      url.pathname === pathname ||
      url.hash
    )
      return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    event.preventDefault()
    event.stopPropagation()
    if (pending.current) return
    pending.current = true
    const pathPosition = (path: string) => {
      if (path === '/') return -1
      const lessonIndex = allLessons.findIndex((lesson) =>
        path.endsWith('/' + lesson.id),
      )
      if (lessonIndex >= 0) return lessonCategories.length + lessonIndex
      return lessonCategories.findIndex(
        (category) => path === `/categoria/${encodeURIComponent(category)}`,
      )
    }
    const currentIndex = pathPosition(pathname)
    const nextIndex = pathPosition(url.pathname)
    setDirection(
      url.pathname === '/' || (pathname !== '/' && nextIndex < currentIndex)
        ? 'backward'
        : 'forward',
    )
    setTurning(true)
    timer.current = setTimeout(() => {
      void navigation
        .navigate({ href: url.pathname + url.search })
        .finally(() => {
          pending.current = false
          setTurning(false)
        })
    }, PAGE_TURN_MS)
  }
  return { pathname, turning, direction, turnPage }
}
