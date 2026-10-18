import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from '@tanstack/react-router'
import { AppShell } from './components/AppShell'
import { HomePage } from './pages/HomePage'

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
  component: lazyRouteComponent(
    () => import('./pages/CategoryPage'),
    'CategoryPage',
  ),
})

const lessonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/categoria/$category/aula/$lessonId',
  component: lazyRouteComponent(
    () => import('./pages/LessonPage'),
    'LessonPage',
  ),
})

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quiz',
  component: lazyRouteComponent(() => import('./pages/QuizPage'), 'QuizPage'),
})

const quizContentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quiz/$contentId',
  component: lazyRouteComponent(
    () => import('./pages/QuizPage'),
    'QuizContentPage',
  ),
})

export const router = createRouter({
  defaultPreload: 'intent',
  routeTree: rootRoute.addChildren([
    indexRoute,
    categoryRoute,
    lessonRoute,
    quizRoute,
    quizContentRoute,
  ]),
})

// Makes Link, navigation and route parameters aware of this route tree.
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
