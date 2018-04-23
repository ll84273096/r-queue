import Else from '../src/task/common/Else'
import QueueData from '../src/QueueData'
import assert from 'assert'

describe('测试Else类的功能', () => {
  it(`queueData中的isSkip的方法返回true的时候，经过Else类处理后，isSkip方法返回false`, (done) => {
    const _else = new Else()
    const queueData = new QueueData()
    queueData.setSkip(true)
    _else.start(queueData).then(() => {
      assert.ok(!queueData.isSkip())
      done()
    })
  })
  it(`queueData中的isSkip的方法返回false的时候，经过Else类处理后，isSkip方法返回true`, (done) => {
    const _else = new Else()
    const queueData = new QueueData()
    queueData.setSkip(false)
    _else.start(queueData).then(() => {
      assert.ok(queueData.isSkip())
      done()
    })
  })
})
