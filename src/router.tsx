import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { AppShell } from './components/AppShell'
import { HomePage } from './pages/HomePage'
import { LessonPage } from './pages/LessonPage'
import { CategoryPage } from './pages/CategoryPage'

const rootRoute = createRootRoute({
  component: AppShell,
  notFoundComponent: HomePage,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/categoria/$category',
  component: CategoryPage,
})

const lessonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/categoria/$category/aula/$lessonId',
  component: LessonPage,
})

export const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute, categoryRoute, lessonRoute]),
})

// Makes Link, navigation and route parameters aware of this route tree.
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
