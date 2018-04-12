import ConditionalTask from '../base/ConditionalTask'

class ElseTask extends ConditionalTask {
  onChangeSkipStatus (key, queueData) {
    queueData.setSkip(!queueData.isSkip())
  }
}

export default ElseTask
