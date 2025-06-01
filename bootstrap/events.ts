import { addProjectEvent } from '@/events/project'

export function injectEvents() {
  const pathname = window.location.pathname

  switch (pathname) {
    case '/add-project':
      addProjectEvent()
    default:
      return
  }
}
