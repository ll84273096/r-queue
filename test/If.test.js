import assert from 'assert'
import If from '../src/task/common/If'
import QueueData from '../src/QueueData'

describe('测试If类的功能', () => {
  it(`If的构造函数参数为true时，queueData中isSkip方法的返回值为false`, (done) => {
    const _if = new If(true)
    const queueData = new QueueData()
    queueData.setSkip(true)
    _if.start(queueData).then(() => {
      assert.ok(!queueData.isSkip())
      done()
    })
  })
  it(`If的构造函数参数为false时，queueData中isSkip方法的返回值为true`, (done) => {
    const _if = new If(false)
    const queueData = new QueueData()
    queueData.setSkip(false)
    _if.start(queueData).then(() => {
      assert.ok(queueData.isSkip())
      done()
    })
  })
  it(`If的构造函数参数为function时，没有调用回调函数的next方法，queueData的isSkip方法返回false`, (done) => {
    const _if = new If(() => {})
    const queueData = new QueueData()
    queueData.setSkip(true)
    _if.start(queueData).then(() => {
      assert.ok(!queueData.isSkip())
      done()
    })
  })
})
