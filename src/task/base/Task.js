import _ from 'underscore'
class Task {
  constructor (fn) {
    this.compiler = this.createCompiler(fn)
  }
  start (queueData) {
    return new Promise((resolve, reject) => {
      this.compiler(queueData, resolve, reject)
    })
  }
  createCompiler (fn) {
    return (queueData, resolve, reject) => {
      if (!_.isFunction(fn)) {
        const _res = fn
        fn = (req, res, resovle) => {
          resovle(_res)
        }
      }
      if (!queueData.isSkip()) {
        fn(queueData.getReq(), queueData.getRes(), (...params) => {
          if (params.length >= 2) {
            queueData.setReq(params[0])
            resolve(params[1])
          } else {
            resolve(params[0])
          }
        }, reject)
      } else {
        resolve(queueData.getRes())
      }
    }
  }
}

export default Task
