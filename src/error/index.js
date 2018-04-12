import TypedError from 'error/typed'

const errorMap = {}
const classMap = {}

/**
 * 注册超时的异常
 */
registError(101, '{title} timeout error', null, 'BaseError')

/**
 * 注册异常类
 */
registClass('BaseError', 'unknown', 100, 'unknown error')

/**
 * 注册异常
 * @param code
 * @param message
 * @param data
 */
function registError (code, message, data, className) {
  message = `{code} | ${message}`
  errorMap[code] = {
    code,
    message,
    ...data
  }
}

/**
 * 注册异常类
 * @param name
 * @param type
 * @param code
 * @param message
 * @param data
 */
function registClass (name, type, code, message, data) {
  message = `{code} | ${message}`
  if (!classMap[name]) {
    classMap[name] = TypedError({
      type,
      code,
      message,
      ...data
    })
  }
}

export const error = (code, data) => {
  const currentError = errorMap[code]
  const message = currentError ? currentError['message'] : null
  const className = classMap[code] || 'BaseError'
  code = currentError ? code : null
  return classMap[className]({code, message, ...data})
}
