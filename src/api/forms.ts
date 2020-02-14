import { Form } from '../index'

/**
 * Mocking client-server processing
 */
const _forms = [
 { id: 1, name: 'daily' },
 { id: 2, name: 'time' },
]

export function getForms(cb: (forms: Form[]) => void) {
  setTimeout(() => cb(_forms), 100)
}
