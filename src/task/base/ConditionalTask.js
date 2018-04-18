import Task from './Task'
import _ from 'underscore'

class ConditionalTask extends Task {
  createCompiler (fn) {
    return (queueData, resolve, reject) => {
      if (_.isFunction(fn)) {
        const resolveHandler = (res) => {
          this.onChangeSkipStatus(!res, queueData)
          resolve(queueData.getRes())
        }
        fn(queueData.getReq(), queueData.getRes(), resolveHandler, reject)
        setTimeout(() => {
          resolveHandler(this.getDefaultSkipStatus())
        })
      } else {
        this.onChangeSkipStatus(!fn, queueData)
        resolve(queueData.getRes())
      }
    }
  }
  onChangeSkipStatus (isSkip, queueData) {
    queueData.setSkip(isSkip)
  }
  getDefaultSkipStatus () {
    return true
  }
}

export default ConditionalTask
