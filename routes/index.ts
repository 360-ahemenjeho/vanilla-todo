import { addProjectView, contactPage, homePage, notFoundPage } from '@/views'

export default function router() {
  const pathname = window.location.pathname

  switch (pathname) {
    case '/':
      return homePage
    case '/contact':
      return contactPage
    case '/add-project':
      return addProjectView
    default:
      return notFoundPage
  }
}
