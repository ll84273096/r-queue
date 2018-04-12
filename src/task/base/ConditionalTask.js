import Task from './Task'
import _ from 'underscore'

class ConditionalTask extends Task {
  createCompiler (fn) {
    return (queueData, resolve, reject) => {
      if (_.isFunction(fn)) {
        fn(queueData.getReq(), queueData.getRes(), (res) => {
          this.onChangeSkipStatus(!res, queueData)
          resolve(queueData.getRes())
        }, reject)
      } else {
        this.onChangeSkipStatus(!fn, queueData)
        resolve(queueData.getRes())
      }
    }
  }
  onChangeSkipStatus (isSkip, queueData) {
    queueData.setSkip(isSkip)
  }
}

export default ConditionalTask
