import _ from 'underscore'
import Task from './Task'
import Queue from '../../Queue'

class QueueTask extends Task {
  constructor (queue, fn) {
    super()
    this.compiler = this.createCompiler(queue, fn)
  }
  createCompiler (queue, fn) {
    return (queueData, resolve, reject) => {
      if (!queueData.isSkip()) {
        if (_.isFunction(fn)) {
          fn(queueData.getReq(), queueData.getRes(), (req, defaultRes) => {
            this._runQueue(queue, queueData, req, defaultRes, resolve, reject)
          }, reject)
        } else {
          this._runQueue(queue, queueData, fn, null, resolve, reject)
        }
      } else {
        resolve(queueData.getRes())
      }
    }
  }
  _runQueue (queue, queueData, req, defaultRes, resolve, reject) {
    if (queue instanceof Queue) {
      queue.start(req, defaultRes).then((res) => {
        resolve(res)
      }).catch(error => reject(error))
    } else {
      resolve(queue.getRes())
    }
  }
}

export default QueueTask
