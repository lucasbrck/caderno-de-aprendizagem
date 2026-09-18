import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { AppShell } from './components/AppShell'
import { HomePage } from './pages/HomePage'
import { LessonPage } from './pages/LessonPage'

const rootRoute = createRootRoute({
  component: AppShell,
  notFoundComponent: HomePage,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const lessonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/aula/$lessonId',
  component: LessonPage,
})

export const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute, lessonRoute]),
})

// Makes Link, navigation and route parameters aware of this route tree.
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
