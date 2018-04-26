import { registerType, registerError, error as getError } from 'rock-error'

registerType('queueError', '1000', 'queue unknown error')

registerError(1001, 'queueError', '{title} timeout error')

export default function error (code, data) {
  return getError(code, data)
}
