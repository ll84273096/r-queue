import Queue from '../src/Queue'
import QueueTask from '../src/task/base/QueueTask'
import QueueData from '../src/QueueData'

import assert from 'assert'
describe('测试QueueTask类', () => {
  it(`通过QueueTask的start方法传入req='0'和defaultRes='1'，并传递req='01'给childQueue`, (done) => {
    const childQueue = new Queue()
    childQueue.push((req, res, next) => {
      assert.equal(req, 2)
      next(3)
    })
    const queueTask = new QueueTask(childQueue, (req, res, next) => {
      assert.equal(req, 0)
      assert.equal(res, 1)
      next(2)
    })
    queueTask.start(new QueueData(0, 1)).then((res) => {
      assert.equal(res, 3)
      done()
    })
  })
  it(`通过QueueTask的start方法传入req='0'和defaultRes='1'，并传递req='01'和res='2'给childQueue`, (done) => {
    const childQueue = new Queue()
    childQueue.push((req, res, next) => {
      assert.equal(req, 2)
      assert.equal(res, 3)
      next(4)
    })
    const queueTask = new QueueTask(childQueue, (req, res, next) => {
      assert.equal(req, 0)
      assert.equal(res, 1)
      next(2, 3)
    })
    queueTask.start(new QueueData(0, 1)).then((res) => {
      assert.equal(res, 4)
      done()
    })
  })
})
