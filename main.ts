import { setupRouter } from '@/bootstrap/app'
import router from '@/routes'
import { injectEvents } from './bootstrap/events'

const rootEl: any = document.querySelector<HTMLElement>('#root')
setupRouter(rootEl, router)
injectEvents()
